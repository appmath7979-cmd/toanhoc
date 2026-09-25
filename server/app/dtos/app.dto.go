package dtos

type MutateResponse struct {
	Message string `json:"message"`
	Success bool   `json:"success"`
	Status  uint16 `json:"status"`
}

type MutateErrRes struct {
	Message string `json:"message" example:"Thông tin không hợp lệ"`
	Success bool   `json:"success" example:"false"`
	Status  uint16 `json:"status" example:"400"`
}

type InfoRes struct {
	Message string `json:"message"`
	Success bool   `json:"success"`
	Status  uint16 `json:"status"`
}

type GetCustomerByIdRes struct {
	InfoRes
	Data *GetCustomerById `json:"data"`
}

type GetManyCustomerRes struct {
	InfoRes
	Data      []GetCustomer `json:"data"`
	TotalItem int64         `json:"total_item"`
	TotalPage int64         `json:"total_page"`
}

type GetManyMessageRes struct {
	InfoRes
	Data []GetMessage `json:"data"`
}
