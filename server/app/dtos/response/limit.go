package response

import "server/app/models"

type GetCustomerLimit struct {
	Data *models.CustomerLimit `json:"data"`
	StatusResponse
}
