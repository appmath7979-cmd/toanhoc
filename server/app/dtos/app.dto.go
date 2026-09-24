package dtos

type MutateResponse struct {
	Message string `json:"message"`
	Success bool   `json:"success"`
	Status  uint16 `json:"status"`
}

type GetCustomerByIdRes struct {
	Message string           `json:"message"`
	Success bool             `json:"success"`
	Status  uint16           `json:"status"`
	Data    *GetCustomerById `json:"data"`
}

type GetManyCustomerRes struct {
	Message   string        `json:"message"`
	Success   bool          `json:"success"`
	Status    uint16        `json:"status"`
	Data      []GetCustomer `json:"data"`
	TotalItem int64         `json:"total_item"`
	TotalPage int64         `json:"total_page"`
}

type QueryErrItemRes struct {
	Message string      `json:"message" example:"Thông tin không hợp lệ"`
	Success bool        `json:"success" example:"false"`
	Status  uint16      `json:"status" example:"400"`
	Data    interface{} `json:"data"`
}

type QueryErrListRes struct {
	QueryErrItemRes
	TotalItem int64 `json:"total_item" example:"0"`
	TotalPage int64 `json:"total_page" example:"0"`
}

type MutateErrRes struct {
	Message string `json:"message" example:"Thông tin không hợp lệ"`
	Success bool   `json:"success" example:"false"`
	Status  uint16 `json:"status" example:"400"`
}
