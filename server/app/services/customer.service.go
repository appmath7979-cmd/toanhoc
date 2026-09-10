package services

import (
	"errors"
	"fmt"
	"server/app/dtos"
	"server/app/models"
	"strings"

	"gorm.io/datatypes"
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

func (s *CustomerService) Create(req dtos.CreateCustomer) (uint16, error) {
	var betPair datatypes.JSONSlice[models.BetPair]

	for _, b := range req.Setting.Bets {
		betPair = append(betPair, models.BetPair{
			Type:    models.BetType(b.Type),
			C:       models.BetValue(b.C),
			T:       models.BetValue(b.T),
			Percent: b.Percent,
		})
	}

	customer := models.Customer{
		FullName:    req.FullName,
		PhoneNumber: req.PhoneNumber,
		Guest:       req.Guest,
		Setting: &models.Setting{
			XienMB: req.Setting.XienMB,
			DaXT:   models.DaX_T(req.Setting.DaXT),
			Bets:   betPair,
		},
	}

	err := s.db.Create(&customer).Error

	if err != nil {
		if strings.Contains(err.Error(), "duplicate key") || strings.Contains(err.Error(), "1062") {
			return 409, errors.New("Số điện thoại đã được đăng ký!")
		}

		return 500, err
	}

	return 201, nil
}

// func (s *CustomerService) GetMany() {}
// func (s *CustomerService) GetMany() {}
