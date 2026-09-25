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
	BetType BetType  `json:"bet_type"`
	C       BetValue `json:"c"`
	T       BetValue `json:"t"`
	Percent bool     `json:"percent"`
}

type DaxT string

const (
	ONE  DaxT = "ONE"
	HALF DaxT = "HALF"
	MANY DaxT = "MANY"
)

type Setting struct {
	ID     string                       `gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
	XienMb bool                         `gorm:"type:boolean;default:false"`
	DaxT   DaxT                         `gorm:"type:varchar(20);check:dax_t IN ('ONE', 'HALF', 'MANY')"`
	Bets   datatypes.JSONSlice[BetPair] `gorm:"type:jsonb"`

	CustomerID string `gorm:"type:uuid;unique;not null;index"`

	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP"`
}
