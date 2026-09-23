package services

import (
	"errors"
	"math"
	"server/app/dtos"
	"server/app/models"
	"server/app/utils"

	"gorm.io/gorm"
)

func CustomerService(db *gorm.DB) *Service {
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
		return nil, 0, 0, err
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
			Type:    models.BetType(b.Type),
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
		IsGuest:     req.IsGuest,
		Setting:     &setting,
	}

	if err := s.db.Create(&customer).Error; err != nil {
		return 500, err
	}

	return 201, nil
}
