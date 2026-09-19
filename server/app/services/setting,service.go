package services

import "gorm.io/gorm"


func SettingService(db *gorm.DB) *Service {
	return &Service{db: db}
}