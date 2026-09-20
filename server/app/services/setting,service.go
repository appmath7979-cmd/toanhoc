package services

import (
	"errors"
	"server/app/dtos"
	"server/app/models"

	"gorm.io/gorm"
)

func SettingService(db *gorm.DB) *Service {
	return &Service{db: db}
}

func (s *Service) GetSettingByCustomerId(customerId string) (dtos.SettingItem, uint16, error) {
	var setting models.Setting

	err := s.db.Where("customer_id = ?", customerId).Find(&setting).Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return dtos.SettingItem{}, 404, errors.New("Không tìm thấy dữ liệu yêu cầu!")
		}

		return dtos.SettingItem{}, 500, err
	}

	var bets []dtos.BetPairResponse

	for _, b := range setting.Bets {
		bets = append(bets, dtos.BetPairResponse{
			Type: dtos.BetType(b.Type),
			C: dtos.BetValueResponse{
				MB: b.C.MB,
				MT: b.C.MT,
				MN: b.C.MN,
			},
			T: dtos.BetValueResponse{
				MB: b.T.MB,
				MT: b.T.MT,
				MN: b.T.MN,
			},
			Percent: b.Percent,
		})
	}

	results := dtos.SettingItem{
		ID:         setting.ID,
		XienMB:     setting.XienMB,
		DaXT:       dtos.DaX_T(setting.DaXT),
		CustomerId: customerId,
		Bets:       bets,
		CreatedAt:  setting.CreatedAt,
		UpdatedAt:  setting.UpdatedAt,
	}

	return results, 200, nil
}
