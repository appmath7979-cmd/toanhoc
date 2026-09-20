package dtos

import (
	"time"
)

type BetType string
type DaX_T string

const (
	BetB2  BetType = "b2"
	BetDD2 BetType = "dd2"
	BetDa  BetType = "da"
	BetDax BetType = "dax"
	BetB3  BetType = "b3"
	BetDD3 BetType = "dd3"
	BetB4  BetType = "b4"
)

type CreateBetPairValue struct {
	MB float32 `json:"mb" validate:"required,min=0"`
	MN float32 `json:"mn" validate:"required,min=0"`
	MT float32 `json:"mt" validate:"required,min=0"`
}

type CreateBetPair struct {
	Type    BetType            `json:"type" validate:"required,oneof=b2 dd2 da dax b3 dd3 b4"`
	C       CreateBetPairValue `json:"c" validate:"required"`
	T       CreateBetPairValue `json:"t" validate:"required"`
	Percent bool               `json:"percent"`
}

type CreateSetting struct {
	XienMB bool            `json:"xien_mb" gorm:"type:boolean;default:false"`
	DaXT   DaX_T           `json:"dax_t" validate:"required,oneof=ONE HALFMANY"`
	Bets   []CreateBetPair `json:"bets" validate:"required"`
}

//==============================================================================

type BetValueResponse struct {
	MB float32 `json:"mb"`
	MN float32 `json:"mn"`
	MT float32 `json:"mt"`
}

type BetPairResponse struct {
	Type    BetType          `json:"type"`
	C       BetValueResponse `json:"c"`
	T       BetValueResponse `json:"t"`
	Percent bool             `json:"percent"`
}

type SettingItem struct {
	ID         string          `json:"id"`
	XienMB     bool            `json:"xien_mb"`
	DaXT       DaX_T           `json:"dax_t"`
	Bets       []BetPairResponse `json:"bets"`
	CustomerId string          `json:"customer_id"`
	CreatedAt  time.Time       `json:"created_at"`
	UpdatedAt  time.Time       `json:"updated_at"`
}

type SettingResponse struct {
	Message string      `json:"message"`
	Success bool        `json:"success"`
	Data    SettingItem `json:"data"`
	Status  uint16      `json:"status"`
}
