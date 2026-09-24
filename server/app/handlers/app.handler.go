package handlers

import (
	"server/app/services"
)

type Handler struct {
	*services.Service
}

type CustomerHandlers struct {
	service services.CustomerServices
}

type SettingHandlers struct {
	service services.SettingServices
}