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

	UpdateCustomer(id string, req *dtos.UpdateCustomer) (uint16, error)

	DeleteManyCustomer(req *dtos.DeleteManyCustomer) (uint16, error)

	DeleteCustomerById(id string) (uint16, error)

	GetCustomerById(id string, at string) (
		*dtos.GetCustomerById,
		uint16,
		error,
	)
}

type SettingServices interface {
	GetSettingByCustomerId(customerId string) (*dtos.GetSetting, uint16, error)
}

type MessageServices interface {
	GetManyMessage(id string, at string) ([]dtos.GetMessage, uint16, error)
}
