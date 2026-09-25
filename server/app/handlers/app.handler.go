package handlers

import (
	"server/app/services"
	"server/app/validator"
)

type Validator struct {
	validator validator.AppValidator
}

type CustomerHandlers struct {
	Validator
	service services.CustomerServices
}

type SettingHandlers struct {
	Validator
	service services.SettingServices
}

type MessageHandlers struct {
	Validator
	service services.MessageServices
}
