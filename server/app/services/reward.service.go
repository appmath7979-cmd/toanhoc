package services

import (
	"errors"
	"server/app/dtos/request"
	"server/app/models"
	"server/app/repositories"

	"gorm.io/gorm"
)

type RewardService struct {
	repo *repositories.RewardRepo
}

func RewardServiceFn(repo *repositories.RewardRepo) *RewardService {
	return &RewardService{repo: repo}
}

func (s *RewardService) GetReward(at string, res *models.Reward) (uint16, error) {
	if err := s.repo.GetReward(at, res); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return 404, errors.New("Chưa có giải ngày hôm nay!")
		}

		return 500, err
	}

	return 200, nil
}

func (s *RewardService) CreateReward(req *request.CreateReward) (uint16, error) {
	if err := s.repo.CreateReward(req); err != nil {
		return 500, err
	}

	return 201, nil
}
