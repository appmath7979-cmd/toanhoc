package response

import "server/app/models"

type GetRewardRes struct {
	Data *models.Reward `json:"data"`
	StatusResponse
}
