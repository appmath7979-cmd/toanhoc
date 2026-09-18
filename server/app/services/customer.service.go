package services

import (
	"errors"
	"math"
	"server/app/dtos"
	"server/app/models"
	"server/app/utils"
	"strconv"

	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type Pagination struct {
	Page   int
	Search string
	Acitve string
	Guest  string
	Sort   string
}

func CustomerService(db *gorm.DB) *Service {
	return &Service{db: db}
}

func (s *Service) GetMany(pagination *Pagination) ([]dtos.CustomerItem, int64, int64, error) {
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

	if pagination.Acitve != "" {
		if active, err := strconv.ParseBool(pagination.Acitve); err == nil {
			query = query.Where("active = ?", active)
		}
	}

	if pagination.Guest != "" {
		if guest, err := strconv.ParseBool(pagination.Guest); err == nil {
			query = query.Where("guest = ?", guest)
		}
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
