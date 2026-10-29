package repositories

import (
	"errors"
	"server/app/dtos/request"
	"server/app/models"

	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type RewardRepo struct {
	db *gorm.DB
}

func RewardRepoFn(db *gorm.DB) *RewardRepo {
	return &RewardRepo{db: db}
}

func (r *RewardRepo) GetReward(at string, res *models.Reward) error {
	if err := r.db.Where("at = ?", at).First(&res).Error; err != nil {
		return err
	}

	return nil
}

func (r *RewardRepo) CreateReward(req *request.CreateReward) error {
	rewardValues := datatypes.JSONSlice[models.RewardValue](req.RewardValues)

	var reward models.Reward
	err := r.db.Where("at = ?", req.At).First(&reward).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		if createErr := r.db.Create(&models.Reward{
			Region:       req.Region,
			Province:     req.Province,
			At:           req.At,
			RewardValues: rewardValues,
		}).Error; createErr != nil {
			return err
		}

		return nil
	}

	if err != nil {
		return err
	}

	if err := r.db.Model(&reward).Update("reward_values", rewardValues).Error; err != nil {
		return err
	}

	return nil
}
