package response

import (
	"server/app/models"
	"time"
)

type GetBaseCustomerInfo struct {
	ID          string `json:"id"`
	FullName    string `json:"full_name"`
	IsGuest     bool   `json:"is_guest"`
}

type GetOtherCustomerInfo struct {
	IsSend    bool      `json:"is_send"`
	Active    bool      `json:"active"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type GetCustomer struct {
	GetBaseCustomerInfo
	GetOtherCustomerInfo
}

type GetCustomerMessage struct {
	GetCustomer
	Messages []models.Message `json:"messages"`
}

type GetCustomerSetting struct {
	GetBaseCustomerInfo
	Setting *models.Setting `json:"setting"`
}

type ManyCustomer struct {
	StatusResponse
	PaginationResponse
	Data []GetCustomer `json:"data"`
}

type CustomerMessage struct {
	StatusResponse
	Data *GetCustomerMessage `json:"data"`
}

type CustomerSetting struct {
	StatusResponse
	Data *GetCustomerSetting `json:"data"`
}
