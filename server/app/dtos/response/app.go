package response

type StatusResponse struct {
	Message string `json:"message"`
	Success bool   `json:"success"`
	Status  uint16 `json:"status"`
}

type PaginationResponse struct {
	Page      uint  `json:"page"`
	TotalItem int64 `json:"total_item"`
	TotalPage int64 `json:"total_page"`
}
