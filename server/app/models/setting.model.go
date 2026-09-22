package models

import (
	"time"

	"gorm.io/datatypes"
)

type BetValue struct {
	MB float32 `json:"mb"`
	MN float32 `json:"mn"`
	MT float32 `json:"mt"`
}

type BetPair struct {
	Type    BetType  `json:"type"`
	C       BetValue `json:"c"`
	T       BetValue `json:"t"`
	Percent bool     `json:"percent"`
}

type DaX_T string

const (
	ONE  DaX_T = "ONE"
	HALF DaX_T = "HALF"
	MANY DaX_T = "MANY"
)

type Setting struct {
	ID     string                       `gorm:"type:uuid;primaryKey;default:gen_random_id()"`
	XienMB bool                         `gorm:"type:boolean;default:false"`
	DaXT   DaX_T                        `gorm:"type:varchar(20);check:dax_t IN ('ONE', 'HALF', 'MANY')"`
	Bets   datatypes.JSONSlice[BetPair] `gorm:"type:jsonb"`

	CustomerId string `gorm:"type:uuid;unique;not null;index"`

	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP"`
}
