package services

import (
	"errors"
	"math"
	"server/app/dtos"
	"server/app/models"
	"server/app/utils"

	"gorm.io/gorm"
)

func CustomerService(db *gorm.DB) CustomerServices {
	return &Service{db: db}
}

func (s *Service) GetManyCustomer(queries *dtos.CustomerQuery) (
	[]dtos.GetCustomer,
	int64,
	int64,
	error,
) {
	var customers []models.Customer

	limit := 10
	offset := (queries.Page - 1) * limit
	var totalItem int64

	query := s.db.Model(&customers)

	if queries.Search != "" {
		cleanSearch := utils.RemoveAccent(queries.Search)
		searchPattern := "%" + cleanSearch + "%"
		query = query.Where("unaccent(full_name) ILIKE ? OR unaccent(phone_number) ILIKE ?", searchPattern,
			searchPattern,
		)
	}

	if queries.Active != nil {
		query = query.Where("active = ?", queries.Active)
	}

	switch queries.Sort {
	case "latest":
		query = query.Order("created_at DESC")
	case "oldest":
		query = query.Order("created_at ASC")
	case "name_ASC":
		query = query.Order("full_name ASC")
	case "name_DESC":
		query = query.Order("full_name DESC")
	default:
		query = query.Order("created_at DESC")
	}

	err := query.Count(&totalItem).Offset(offset).Limit(limit).Find(&customers).Error

	if err != nil {
		return []dtos.GetCustomer{}, 0, 0, err
	}

	var results []dtos.GetCustomer

	for _, c := range customers {
		results = append(results, dtos.GetCustomer{
			ID:        c.ID,
			FullName:  c.FullName,
			IsGuest:   c.IsGuest,
			IsSend:    c.IsSend,
			CreatedAt: c.CreatedAt,
			UpdatedAt: c.UpdatedAt,
		})
	}

	totalPage := math.Ceil(float64(totalItem) / float64(limit))

	return results, totalItem, int64(totalPage), nil
}

func (s *Service) CreateCustomer(req *dtos.CreateCustomer) (uint16, error) {
	var existing models.Customer

	err := s.db.Where("phone_number = ?", req.PhoneNumber).First(&existing).Error

	if err == nil {
		return 409, errors.New("Không thể tạo với số điện thoại này!")
	}

	if !errors.Is(err, gorm.ErrRecordNotFound) {
		return 500, err
	}

	var bets []models.BetPair

	for _, b := range req.Setting.Bets {
		bets = append(bets, models.BetPair{
			BetType: b.BetType,
			C:       models.BetValue(b.C),
			T:       models.BetValue(b.T),
			Percent: b.Percent,
		})
	}

	setting := models.Setting{
		XienMb: req.Setting.XienMb,
		DaxT:   models.DaxT(req.Setting.DaxT),
		Bets:   bets,
	}

	customer := models.Customer{
		FullName:    req.FullName,
		PhoneNumber: req.PhoneNumber,
		IsGuest:     *req.IsGuest,
		Setting:     &setting,
	}

	if err := s.db.Create(&customer).Error; err != nil {
		return 500, err
	}

	return 201, nil
}

func (s *Service) UpdateCustomer(id string, req *dtos.UpdateCustomer) (uint16, error) {
	var customer models.Customer

	if err := s.db.Preload("Setting").First(&customer, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return 404, errors.New("Không tìm thấy người dùng!")
		}
		return 500, err
	}

	err := s.db.Transaction(func(tx *gorm.DB) error {
		customerUpdates := map[string]interface{}{}
		var existingCustomer models.Customer

		if req.PhoneNumber == nil {
			err := tx.Where("phone_number = ?", *req.PhoneNumber).First(&existingCustomer).Error

			if err == nil {
				return errors.New("Không thể cập nhật với số điện thoại này!")
			}

			if !errors.Is(err, gorm.ErrRecordNotFound) {
				return err
			}

			customerUpdates["phone_number"] = *req.PhoneNumber
		}

		if req.FullName != nil {
			customerUpdates["full_name"] = *req.FullName
		}

		if req.Active != nil {
			customerUpdates["active"] = *req.Active
		}

		if req.IsGuest != nil {
			customerUpdates["is_guest"] = *req.IsGuest
		}

		if len(customerUpdates) > 0 {
			if err := tx.Model(&models.Customer{}).Where("id = ?", id).Updates(customerUpdates).Error; err != nil {
				return err
			}
		}

		if req.Setting != nil {
			settingUpdates := map[string]interface{}{}

			if req.Setting.XienMb != nil {
				settingUpdates["xien_mb"] = *req.Setting.XienMb
			}

			if req.Setting.DaxT != nil {
				settingUpdates["dax_t"] = *req.Setting.DaxT
			}

			if req.Setting.Bets != nil {
				settingUpdates["bets"] = req.Setting.Bets
			}

			if len(settingUpdates) > 0 {
				if err := tx.Model(&models.Setting{}).Where("id = ?", customer.Setting.ID).Updates(settingUpdates).Error; err != nil {
					return err
				}
			}
		}
		return nil
	})

	if err != nil {
		return 500, err
	}

	return 200, nil
}

func (s *Service) DeleteManyCustomer(req *dtos.DeleteManyCustomer) (uint16, error) {
	err := s.db.Where("id IN ?", req.Ids).Delete(&models.Customer{}).Error

	if err != nil {
		return 500, err
	}

	return 200, nil
}

func (s *Service) DeleteCustomerById(id string) (uint16, error) {
	err := s.db.Delete(&models.Customer{}, id).Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return 404, errors.New("Khách hàng không tồn tại!")
		} else {
			return 500, err
		}
	} else {
		return 200, nil
	}
}

func (s *Service) GetCustomerById(id string, at string) (
	*dtos.GetCustomerById,
	uint16,
	error,
) {
	var customer models.Customer

	err := s.db.
		Preload("Messages", func(db *gorm.DB) *gorm.DB {
			return db.Where("at = ?", at)
		}).
		Preload("Messages.MessageDetails").
		First(&customer, "id = ?", id).
		Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, 404, errors.New("Không tìm thấy khách hàng này!")
		} else {
			return nil, 500, err
		}
	}

	var messages []dtos.GetMessage

	for _, c := range customer.Messages {
		var details []dtos.GetMessageDetail
		for _, d := range c.MessageDetails {
			details = append(details, dtos.GetMessageDetail{
				ID:        d.ID,
				BetType:   d.BetType,
				Syntax:    d.Syntax,
				Province:  d.Province,
				Score:     d.Score,
				Co:        d.Co,
				Trung:     d.Trung,
				Number:    d.Number,
				MessageID: d.MessageID,
				CreatedAt: d.CreatedAt,
				UpdatedAt: d.UpdatedAt,
			})
		}
		messages = append(messages, dtos.GetMessage{
			ID:             c.ID,
			Send:           c.Send,
			At:             c.At,
			Content:        c.Content,
			Region:         c.Region,
			CustomerID:     c.CustomerID,
			CreatedAt:      c.CreatedAt,
			UpdatedAt:      c.UpdatedAt,
			MessageDetails: details,
		})
	}

	result := dtos.GetCustomerById{
		ID:          customer.ID,
		FullName:    customer.FullName,
		PhoneNumber: customer.PhoneNumber,
		IsGuest:     customer.IsGuest,
		Messages:    messages,
		CreatedAt:   customer.CreatedAt,
		UpdatedAt:   customer.UpdatedAt,
	}

	return &result, 200, nil
}
