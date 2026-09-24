package handlers

import (
	"server/app/services"
)

type CustomerHandlers struct {
	service services.CustomerServices
}

type SettingHandlers struct {
	service services.SettingServices
}