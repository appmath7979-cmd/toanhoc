package services

import (
	"server/app/dtos"
	"server/app/models"

	"gorm.io/datatypes"
	"gorm.io/gorm"
)

func CustomerService(db *gorm.DB) *Service {
	return &Service{db: db}
}

func (s *Service) GetMany() ([]dtos.CustomerItem, error) {
	var customers []models.Customer

	if err := s.db.Find(&customers).Error; err != nil {
		return nil, err
	}

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

	return results, nil
}

func (s *Service) Create(req dtos.CreateCustomer) (bool, error) {
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
		return false, err
	}

	return true, nil
}
