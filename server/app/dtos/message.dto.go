package dtos

import "time"

type MessageDetail = struct {
	ID        string `json:"id"`
	MessageId string `json:"message_id"`

	Type     BetType  `json:"type"`
	Syntax   Syntax   `json:"syntax"`
	Province Province `json:"province"`
	Number   string   `json:"number"`

	Score float32 `json:"score"`
	Co    float32 `json:"co"`
	Trung float32 `json:"trung"`

	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Message = struct {
	ID         string          `json:"id"`
	Content    string          `json:"content"`
	Region     Region          `json:"region"`
	CustomerId string          `json:"customer_id"`
	Release    string          `json:"release"`
	Send       bool            `json:"is_send"`
	Details    []MessageDetail `json:"details"`
	CreatedAt  time.Time       `json:"created_at"`
	UpdatedAt  time.Time       `json:"updated_at"`
}
