package repositories

import (
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
	var customer models.Customer

	if err := r.db.First(&customer, "id = ?", req.CustomerID).Error; err != nil {
		return err
	}

	limits := models.CustomerLimit{
		Day:        models.DayOfWeek(req.Day),
		CustomerID: customer.ID,
		Limits:     datatypes.JSONSlice[models.Limit](req.Limits),
	}

	if err := r.db.Create(&limits).Error; err != nil {
		return err
	}

	return nil
}
