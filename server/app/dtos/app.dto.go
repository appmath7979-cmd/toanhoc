package dtos

type MutateCustomerResponse struct {
	Message string `json:"message"`
	Success bool   `json:"success"`
	Status  uint16 `json:"status"`
}
