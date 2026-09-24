package services

import (
	"server/app/dtos"

	"gorm.io/gorm"
)

type Service struct {
	db *gorm.DB
}

type CustomerServices interface {
	GetManyCustomer(queries *dtos.CustomerQuery) (
		[]dtos.GetCustomer,
		int64,
		int64,
		error,
	)
	CreateCustomer(req *dtos.CreateCustomer) (uint16, error)
}

type SettingServices interface {
	GetSettingByCustomerId(customerId string) (*dtos.GetSetting, uint16, error)
}
