package repositories

import (
	"errors"
	"server/app/models"

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
	var totalPage int64

	query := r.db.Model(&customers)

	if search != "" {
		searchPatten := "%" + search + "%"
		query = query.Where("unaccent(full_name) ILIKE  ? OR unaccent(phone_number) LIKE = ?", searchPatten)
	}

	if active != nil {
		query = query.Where("active = ? AND = ?", active, guest)
	} else {
		query = query.Where("is_guest = ?", guest)
	}

	err := query.Order(sort).Count(&totalPage).Offset(offset).Limit(limit).Find(&customers).Error

	if err != nil {
		return customers, 0, err
	}

	return customers, totalPage, nil
}

func (r *CustomerRepo) CreateCustomer(req *models.Customer) (*models.Customer, error) {
	var existingUser models.Customer

	err := r.db.Where("phone_number = ?", req.PhoneNumber).First(&existingUser).Error

	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}

	if err == nil {
		return nil, err
	}

	customer := req

	if err := r.db.Create(&customer).Error; err != nil {
		return nil, err
	}

	return req, nil
}
