package dtos

import (
	"server/app/models"
	"time"
)

type GetMessageDetail struct {
	ID       string          `json:"id"`
	Region   models.Region   `json:"region"`
	Type     models.BetType  `json:"type"`
	Syntax   models.Syntax   `json:"syntax"`
	Province models.Province `json:"province"`

	Score     float32 `json:"score"`
	Co        float32 `json:"co"`
	Trung     float32 `json:"trung"`
	Number    string  `json:"number"`
	MessageID string  `json:"message_id"`

	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type GetMessage struct {
	ID      string `json:"id"`
	Send    bool   `json:"is_send"`
	At      string `json:"at"`
	Content string `json:"content"`

	MessageDetails []GetMessageDetail `json:"message_details"`
	CustomerID string `json:"customer_id"`

	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
