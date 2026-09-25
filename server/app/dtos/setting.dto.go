package dtos

import (
	"server/app/models"
	"time"
)

type DaxT string

type CreateBetPairValue struct {
	MB float32 `json:"mb" binding:"required,min=0"`
	MN float32 `json:"mn" binding:"required,min=0"`
	MT float32 `json:"mt" binding:"required,min=0"`
}

type CreateBetPair struct {
	BetType models.BetType     `json:"bet_type" binding:"required,oneof=b2 dd2 da dax b3 dd3 b4"`
	C       CreateBetPairValue `json:"c" binding:"required"`
	T       CreateBetPairValue `json:"t" binding:"required"`
	Percent bool               `json:"percent"`
}

type CreateSetting struct {
	XienMb bool            `json:"xien_mb" gorm:"type:boolean"`
	DaxT   DaxT            `json:"dax_t" binding:"required,oneof=ONE HALF MANY"`
	Bets   []CreateBetPair `json:"bets" binding:"required"`
}

type UpdateBetPairValue struct {
	MB float32 `json:"mb" binding:"required,min=0"`
	MN float32 `json:"mn" binding:"required,min=0"`
	MT float32 `json:"mt" binding:"required,min=0"`
}

type UpdateBetPair struct {
	BetType models.BetType     `json:"bet_type" binding:"required,oneof=b2 dd2 da dax b3 dd3 b4"`
	C       UpdateBetPairValue `json:"c" binding:"required"`
	T       UpdateBetPairValue `json:"t" binding:"required"`
	Percent bool               `json:"percent" binding:"required"`
}

type UpdateSetting struct {
	XienMb *bool           `json:"xien_mb"`
	DaxT   *string         `json:"dax_t" binding:"omitempty,oneof=ONE HALF MANY"`
	Bets   []UpdateBetPair `json:"bets" binding:"omitempty"`
}

type GetBetPairValue struct {
	MB float32 `json:"mb"`
	MN float32 `json:"mn"`
	MT float32 `json:"mt"`
}

type GetBetPair struct {
	BetType models.BetType  `json:"bet_type"`
	C       GetBetPairValue `json:"c"`
	T       GetBetPairValue `json:"t"`
	Percent bool            `json:"percent"`
}

type GetSetting struct {
	ID         string       `json:"id"`
	XienMb     bool         `json:"xien_mb"`
	DaxT       DaxT         `json:"dax_t"`
	Bets       []GetBetPair `json:"bets"`
	CustomerID string       `json:"customer_id"`
	CreatedAt  time.Time    `json:"created_at"`
	UpdatedAt  time.Time    `json:"updated_at"`
}

type GetSettingResponse struct {
	Message string      `json:"message"`
	Success bool        `json:"success"`
	Status  uint16      `json:"status"`
	Data    *GetSetting `json:"data"`
}
