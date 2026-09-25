package services

import (
	"errors"
	"server/app/dtos"
	"server/app/models"

	"gorm.io/gorm"
)

func SettingService(db *gorm.DB) SettingServices {
	return &Service{db: db}
}

func (s *Service) GetSettingByCustomerId(customerId string) (*dtos.GetSetting, uint16, error) {
	var customer models.Customer

	err := s.db.Where("id = ?", customerId).First(&customer).Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, 404, errors.New("Bạn không có quyền truy cập vào khách hàng này!")
		} else {
			return nil, 500, err
		}
	}

	var setting models.Setting

	err = s.db.Where("customer_id = ?", customerId).First(&setting).Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, 404, errors.New("Không tìm tháy khách hàng!")
		} else {
			return nil, 500, err
		}
	}

	var bets []dtos.GetBetPair

	for _, b := range setting.Bets {
		bets = append(bets, dtos.GetBetPair{
			BetType: b.BetType,
			C:       dtos.GetBetPairValue(b.C),
			T:       dtos.GetBetPairValue(b.T),
			Percent: b.Percent,
		})
	}

	result := dtos.GetSetting{
		ID:         setting.ID,
		XienMb:     setting.XienMb,
		DaxT:       dtos.DaxT(setting.DaxT),
		Bets:       bets,
		CustomerID: setting.CustomerID,
	}

	return &result, 200, nil
}
