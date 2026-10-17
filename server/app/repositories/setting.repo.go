package repositories

import (
	"server/app/models"

	"gorm.io/gorm"
)

type SettingRepo struct {
	db *gorm.DB
}

func SettingRepoFn(db *gorm.DB) *SettingRepo {
	return &SettingRepo{db: db}
}

func (r *SettingRepo) FindSettingByCustomerId(id string) (*models.Setting, error) {
	var setting models.Setting

	if err := r.db.First(&setting, "customer_id = ?", id).Error; err != nil {
		return nil, err
	}

	return &setting, nil
}
