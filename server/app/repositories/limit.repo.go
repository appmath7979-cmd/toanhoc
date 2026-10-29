package repositories

import (
	"errors"
	"server/app/dtos/request"
	"server/app/models"

	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type LimitRepo struct {
	db *gorm.DB
}

func LimitRepoFn(db *gorm.DB) *LimitRepo {
	return &LimitRepo{db: db}
}

func (r *LimitRepo) GetCustomerLimit(id string, day int16, res *models.CustomerLimit) error {
	if err := r.db.Where("customer_id = ? AND day = ?", id, day).First(res).Error; err != nil {
		return err
	}

	return nil
}

func (r *LimitRepo) CreateCustomerLimit(req *request.CreateCustomerLimit) error {
	limit := datatypes.JSONSlice[models.Limit](req.Limits)

	var customerLimit models.CustomerLimit
	err := r.db.Where("customer_id = ? AND day = ?", req.CustomerID, req.Day).First(&customerLimit).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		if createErr := r.db.Create(&models.CustomerLimit{
			Day:        models.DayOfWeek(req.Day),
			Limits:     limit,
			CustomerID: req.CustomerID,
		}).Error; createErr != nil {
			return createErr
		}

		return nil
	}

	if err != nil {
		return err
	}

	if err := r.db.Model(&customerLimit).Update("limits", limit).Error; err != nil {
		return err
	}

	return nil
}
