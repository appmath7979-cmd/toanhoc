package response

import "server/app/models"

type GetManyMessageRes struct {
	Data []models.Message `json:"data"`
	StatusResponse
}

type GetMessageByIdRes struct {
	Data *models.Message `json:"data"`
	StatusResponse
}
