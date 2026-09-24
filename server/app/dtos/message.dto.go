package dtos

import (
	"server/app/models"
	"time"
)

type GetMessageDetail struct {
	ID       string          `json:"id"`
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
	ID             string             `json:"id"`
	Send           bool               `json:"is_send"`
	At             string             `json:"at"`
	Content        string             `json:"content"`
	Region         models.Region      `json:"region"`
	MessageDetails []GetMessageDetail `json:"message_details"`
	CustomerID     string             `json:"customer_id"`

	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type CreateMessageDetail struct {
	Type     models.BetType  `json:"type" binding:"required,oneof=b2 dd2 da dax b3 dd3 b4"`
	Syntax   models.Syntax   `json:"syntax" binding:"required,oneof=b dau duoi da dax"`
	Province models.Province `json:"province" binding:"required,oneof=tp dt cm bt dn ct st vt bli tn bth vl bd tv la hg bp tg kg dl py th qna kh qb qt gl nt qn dno kt mb"`

	Score  float32 `json:"score"`
	Co     float32 `json:"co"`
	Trung  float32 `json:"trung"`
	Number string  `json:"number"`
}

type CreateMessage struct {
	Send           bool               `json:"is_send" binding:"required"`
	At             string             `json:"at" binding:"required"`
	Content        string             `json:"content" binding:"required"`
	Region         models.Region      `json:"region" binding:"required,oneof=,mb mt mn"`
	MessageDetails []GetMessageDetail `json:"message_details"`
}
