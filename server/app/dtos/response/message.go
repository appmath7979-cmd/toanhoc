package response

import "server/app/models"

type GetMessage struct {
	FullName string           `json:"full_name"`
	IsSend   bool             `json:"is_send"`
	Messages []models.Message `json:"messages"`
	StatusResponse
}
