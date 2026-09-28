package services

import (
	"errors"

	"server/app/models"
	"server/app/repositories"

	"gorm.io/gorm"
)

type SettingService struct {
	repo *repositories.SettingRepo
}

func SettingServiceFn(repo *repositories.SettingRepo) *SettingService {
	return &SettingService{repo: repo}
}

func (s *SettingService) GetSettingById(id string) (*models.Setting, uint16, error) {
	setting, err := s.repo.FindSettingById(id)

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, 404, errors.New("Không tìm thấy thông tin!")
		} else {
			return nil, 500, err
		}
	}

	result := models.Setting{
		ID:         setting.ID,
		XienMb:     setting.XienMb,
		DaxT:       setting.DaxT,
		CustomerID: setting.ID,
		Bets:       setting.Bets,
		CreatedAt:  setting.CreatedAt,
		UpdatedAt:  setting.UpdatedAt,
	}

	return &result, 200, nil
}
