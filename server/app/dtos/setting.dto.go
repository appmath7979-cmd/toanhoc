package dtos

import "server/app/models"

type DaxT string

type CreateBetPairValue struct {
	MB float32 `json:"mb" binding:"required,min=0"`
	MN float32 `json:"mn" binding:"required,min=0"`
	MT float32 `json:"mt" binding:"required,min=0"`
}

type CreateBetPair struct {
	Type    models.BetType     `json:"type" binding:"required,oneof=b2 dd2 da dax b3 dd3 b4"`
	C       CreateBetPairValue `json:"c" binding:"required"`
	T       CreateBetPairValue `json:"t" binding:"required"`
	Percent bool               `json:"percent"`
}

type CreateSetting struct {
	XienMb bool            `json:"xien_mb" gorm:"type:boolean"`
	DaxT   DaxT            `json:"dax_t" binding:"required,oneof=ONE HALF MANY"`
	Bets   []CreateBetPair `json:"bets" binding:"required"`
}
