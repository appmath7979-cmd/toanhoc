package services

import (
	"errors"
	"math"
	"server/app/dtos"
	"server/app/models"
	"server/app/utils"

	"gorm.io/datatypes"
	"gorm.io/gorm"
)

func CustomerService(db *gorm.DB) *Service {
	return &Service{db: db}
}

func (s *Service) GetMany(pagination *dtos.GetCustomersQuery) ([]dtos.CustomerItem, int64, int64, error) {
	var customers []models.Customer

	limit := 10
	offset := (pagination.Page - 1) * limit

	var total int64

	query := s.db.Model(&customers)

	if pagination.Search != "" {
		cleanSearch := utils.RemoveAccent(pagination.Search)
		searchPattern := "%" + cleanSearch + "%"
		query = query.Where(
			"unaccent(full_name) ILIKE ? OR unaccent(phone_number) ILIKE ?",
			searchPattern,
			searchPattern,
		)
	}

	if pagination.Active != nil {
		query = query.Where("active = ?", *pagination.Active)
	}

	if pagination.Guest != nil {
		query = query.Where("guest = ?", *pagination.Guest)
	}

	switch pagination.Sort {
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

	query.Debug().Count(&total).Offset(offset).Limit(limit).Find(&customers)

	var results []dtos.CustomerItem
	for _, c := range customers {
		results = append(results, dtos.CustomerItem{
			ID:          c.Id,
			FullName:    c.FullName,
			PhoneNumber: c.PhoneNumber,
			Guest:       c.Guest,
			Active:      c.Active,
			CreatedAt:   c.CreatedAt,
			UpdatedAt:   c.UpdatedAt,
		})
	}

	totalPage := math.Ceil(float64(total) / float64(limit))

	return results, total, int64(totalPage), nil
}

func (s *Service) GetOne(id string) {
	
}

func (s *Service) Create(req dtos.CreateCustomer) (uint16, error) {
	var existingCustomer models.Customer

	err := s.db.Where("phone_number = ?", req.PhoneNumber).First(&existingCustomer).Error

	if err == nil {
		return 409, errors.New("Số điện thoại đã tồn tại!")
	}

	if !errors.Is(err, gorm.ErrRecordNotFound) {
		return 500, err
	}

	var bets []models.BetPair

	for _, b := range req.Setting.Bets {
		bets = append(bets, models.BetPair{
			Type:    models.BetType(b.Type),
			C:       models.BetValue(b.C),
			T:       models.BetValue(b.T),
			Percent: b.Percent,
		})
	}

	setting := models.Setting{
		XienMB: req.Setting.XienMB,
		DaXT:   models.DaX_T(req.Setting.DaXT),
		Bets:   datatypes.JSONSlice[models.BetPair](bets),
	}

	customer := models.Customer{
		FullName:    req.FullName,
		PhoneNumber: req.PhoneNumber,
		Guest:       req.Guest,
		Setting:     &setting,
	}

	if err := s.db.Create(&customer).Error; err != nil {
		return 500, err
	}

	return 201, nil
}

func (s *Service) Delete(id string) error {
	if err := s.db.Delete(&models.Customer{}, "id = ?", id).Error; err != nil {
		return err
	}

	return nil
}

func (s *Service) DeleteMany(req dtos.DeleteCustomerManyRequest) error {
	if err := s.db.Where("id IN ?", req.Ids).Delete(&models.Customer{}).Error; err != nil {
		return err
	}

	return nil
}
