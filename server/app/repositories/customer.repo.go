package repositories

import (
	"encoding/json"
	"errors"
	"server/app/dtos/request"
	"server/app/models"

	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type CustomerRepo struct {
	db *gorm.DB
}

func CustomerRepoFn(db *gorm.DB) *CustomerRepo {
	return &CustomerRepo{db: db}
}

func (r *CustomerRepo) FindManyCustomer(page int, limit int, offset int, search string, active *bool, guest bool, sort string) ([]models.Customer, int64, error) {
	var customers []models.Customer
	var totalItem int64

	query := r.db.Model(&customers)

	if search != "" {
		searchPatten := "%" + search + "%"
		query = query.Where("unaccent(full_name) ILIKE ?", searchPatten)
	}

	if active != nil {
		query = query.Where("active = ?", active)
	} else {
		query = query.Where("is_guest = ?", guest)
	}

	err := query.Order(sort).Count(&totalItem).Offset(offset).Limit(limit).Find(&customers).Error

	if err != nil {
		return customers, 0, err
	}

	return customers, totalItem, nil
}

func (r *CustomerRepo) FindCustomerById(id string) (*models.Customer, error) {
	var customer models.Customer

	if err := r.db.Preload("Setting").First(&customer, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return &customer, nil
}

func (r *CustomerRepo) CreateCustomer(req *models.Customer) error {

	if err := r.db.Create(&req).Error; err != nil {
		return err
	}

	return nil
}

func (r *CustomerRepo) UpdateCustomer(id string, req *request.UpdateCustomer) error {
	return r.db.Transaction(func(tx *gorm.DB) error {
		updates := map[string]any{}

		if req.FullName != nil {
			updates["full_name"] = *req.FullName
		}

		if req.IsGuest != nil {
			updates["is_guest"] = *req.IsGuest
		}

		if req.Active != nil {
			updates["active"] = *req.Active
		}

		if len(updates) > 0 {
			if err := tx.Model(&models.Customer{}).Where("id = ?", id).Updates(updates).Error; err != nil {
				return err
			}
		}

		if req.Setting != nil {
			settingUpdates := map[string]any{}

			if req.Setting.DaxT != nil {
				settingUpdates["dax_t"] = *req.Setting.DaxT
			}

			if req.Setting.XienMb != nil {
				settingUpdates["xien_mb"] = *req.Setting.XienMb
			}

			if req.Setting.Bets != nil {
				jsonBytes, err := json.Marshal(req.Setting.Bets)
				if err == nil {
					settingUpdates["bets"] = datatypes.JSON(jsonBytes)
				}
			}

			if len(settingUpdates) > 0 {
				if err := tx.Model(&models.Setting{}).Where("customer_id = ?", id).Updates(settingUpdates).Error; err != nil {
					return err
				}
			}
		}

		return nil
	})
}

func (r *CustomerRepo) DeleteCustomerById(id string) error {
	var customer models.Customer

	if err := r.db.First(&customer, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return errors.New("Không tìm thấy khách hàng!")
		}
		return err
	}

	if err := r.db.Delete(&customer).Error; err != nil {
		return err
	}

	return nil
}

func (r *CustomerRepo) DeleteCustomer(ids []string) error {
	var customer models.Customer

	if err := r.db.Where("id IN ?", ids).Delete(&customer).Error; err != nil {
		return err
	}

	return nil
}
