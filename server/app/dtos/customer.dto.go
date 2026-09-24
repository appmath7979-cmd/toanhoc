package dtos

import "time"

type CreateCustomer struct {
	FullName    string        `json:"full_name" binding:"required,min=2,max=100"`
	PhoneNumber string        `json:"phone_number" binding:"required,regex=^(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})$"`
	IsGuest     bool          `json:"is_guest" binding:"required"`
	Setting     CreateSetting `json:"setting" binding:"required"`
}

type UpdateCustomer struct {
	FullName    *string        `json:"full_name" binding:"omitempty,min=2,max=100"`
	PhoneNumber *string        `json:"phone_number" binding:"omitempty,regex=^(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})$"`
	IsGuest     *bool          `json:"is_guest" binding:"omitempty"`
	Active      *bool          `json:"active" binding:"omitempty"`
	Setting     *UpdateSetting `json:"setting" binding:"omitempty"`
}

type DeleteManyCustomer struct {
	Ids []string `json:"ids" binding:"required"`
}

type CustomerQuery struct {
	Page   int    `form:"page" default:"1"`
	Search string `form:"search"`
	Active *bool  `form:"active"`
	Guest  bool   `form:"guest"`
	Sort   string `form:"sort"`
}

type GetCustomer struct {
	ID        string    `json:"id"`
	FullName  string    `json:"full_name"`
	IsGuest   bool      `json:"is_guest"`
	IsSend    bool      `json:"is_send"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type GetManyCustomerRes struct {
	Message   string        `json:"message"`
	Success   bool          `json:"success"`
	Status    uint16        `json:"status"`
	Data      []GetCustomer `json:"data"`
	TotalItem int64         `json:"total_item"`
	TotalPage int64         `json:"total_page"`
}
