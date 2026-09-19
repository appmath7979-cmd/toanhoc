package handlers

import (
	"server/app/services"

	"gorm.io/gorm"
)

func SettingHandler(db *gorm.DB) *Handler {
	return &Handler{Service: services.SettingService(db)}
}
