package response

import (
	"server/app/models"
)

type GetSetting struct {
	StatusResponse
	Data *models.Setting `json:"data"`
}
