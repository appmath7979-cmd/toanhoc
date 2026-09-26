package dtos

type MutateResponse struct {
	Message string `json:"message"`
	Success bool   `json:"success"`
	Status  uint16 `json:"status"`
}

type InfoRes struct {
	Message string `json:"message"`
	Success bool   `json:"success"`
	Status  uint16 `json:"status"`
}

type GetCustomerAndMessageByIdRes struct {
	InfoRes
	Data *GetCustomerAndMessageById `json:"data"`
}

type GetManyCustomerRes struct {
	InfoRes
	Data      []GetCustomer `json:"data"`
	TotalItem int64         `json:"total_item"`
	TotalPage int64         `json:"total_page"`
}

type GetCustomerSettingByIdRes struct {
	InfoRes
	Data      *GetCustomerAndSettingById `json:"data"`
	TotalItem int64         `json:"total_item"`
	TotalPage int64         `json:"total_page"`
}

type GetManyMessageRes struct {
	InfoRes
	Data []GetMessage `json:"data"`
}
