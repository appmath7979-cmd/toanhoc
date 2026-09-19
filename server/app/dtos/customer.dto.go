package dtos

import "time"

type CreateCustomer struct {
	FullName    string        `json:"full_name" validate:"required,min=2,max=100"`
	PhoneNumber string        `json:"phone_number" validate:"required"`
	Guest       bool          `json:"guest" validate:"required"`
	Setting     CreateSetting `json:"setting" validate:"required"`
}

type CustomerItem struct {
	ID          string    `json:"id"`
	FullName    string    `json:"full_name"`
	PhoneNumber string    `json:"phone_number"`
	Guest       bool      `json:"guest"`
	Active      bool      `json:"active"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type CustomerListResponse struct {
	Message   string         `json:"message"`
	Success   bool           `json:"success"`
	Status    uint16         `json:"status"`
	Data      []CustomerItem `json:"data"`
	Page      int            `json:"page"`
	TotalItem int            `json:"total_items"`
	TotalPage int            `json:"total_pages"`
}


type DeleteCustomerManyRequest struct {
	Ids []string `json:"ids" binding:"required"`
}

type GetCustomersQuery struct {
	Page   int    `form:"page" default:"1"`
	Search string `form:"search"`
	Sort   string `form:"sort" default:"latest"`
	Active *bool  `form:"active"`
	Guest  *bool  `form:"guest"`
}

type MutateCustomerResponse struct {
	Message string `json:"message"`
	Success bool   `json:"success"`
	Status  uint16 `json:"status"`
}

type CustomerById struct {
	ID          string    `json:"id"`
	FullName    string    `json:"full_name"`
	PhoneNumber string    `json:"phone_number"`
	Guest       bool      `json:"guest"`
	Active      bool      `json:"active"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
