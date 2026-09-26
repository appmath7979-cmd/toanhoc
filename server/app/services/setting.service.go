package services

import (
	"errors"
	"server/app/dtos"
	"server/app/repositories"

	"gorm.io/gorm"
)

type SettingService struct {
	repo *repositories.SettingRepo
}

func SettingServiceFn(repo *repositories.SettingRepo) *SettingService {
	return &SettingService{repo: repo}
}

func (s *SettingService) GetSettingById(id string) (*dtos.GetSetting, uint16, error) {
	setting, err := s.repo.FindSettingById(id)

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, 404, errors.New("Không tìm thấy thông tin!")
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
		CustomerID: setting.ID,
		Bets:       bets,
		CreatedAt:  setting.CreatedAt,
		UpdatedAt:  setting.UpdatedAt,
	}

	return &result, 200, nil
}
