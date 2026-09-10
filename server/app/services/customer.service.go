package services

import (
	"fmt"
	"server/app/dtos"
	"server/app/models"

	"gorm.io/gorm"
)

type CustomerService struct {
	db *gorm.DB
}

func CustomerServices(db *gorm.DB) *CustomerService {
	return &CustomerService{db: db}
}

func (s *CustomerService) GetMany(search string, page int, sort string, active *bool) ([]dtos.CustomerItem, int, int, error) {
	limit := 10
	offset := (page - 1) * limit

	query := s.db.Model(&models.Customer{})

	if search != "" {
		searchParam := fmt.Sprintf("%%%s%%", search)
		query = query.Where("full_name ILIKE ? phone_number LIKE ?", searchParam, searchParam)
	}

	if active != nil {
		query = query.Where("active = ?", *active)
	}

	var total int64
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, 0, err
	}

	var customers []models.Customer
	err := query.Order(sort).Limit(limit).Offset(offset).Find(&customers).Error

	if err != nil {
		return nil, 0, 0, err
	}

	data := make([]dtos.CustomerItem, len(customers))

	for _, c := range customers {
		data = append(data, dtos.CustomerItem{
			ID:          c.Id,
			FullName:    c.FullName,
			PhoneNumber: c.PhoneNumber,
			Guest:       c.Active,
			Active:      c.Active,
			CreatedAt:   c.CreatedAt,
			UpdatedAt:   c.UpdatedAt,
		})
	}

	totalPage := int((total + int64(limit) - 1) / int64(limit))

	return data, int(total), totalPage, nil
}

// func (s *CustomerService) GetMany() {}
// func (s *CustomerService) GetMany() {}
// func (s *CustomerService) GetMany() {}
