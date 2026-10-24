package request

import (
	"server/app/models"
)

type CreateCustomerLimit struct {
	Day        int16          `json:"day" binding:"required,min=0,max=6"`
	CustomerID string         `json:"customer_id" binding:"required,uuid"`
	Limits     []models.Limit `json:"limits" binding:"required"`
}
