package models

import (
	"time"

	"gorm.io/datatypes"
)

type DayOfWeek int16

const (
	Sunday    DayOfWeek = 0
	Monday    DayOfWeek = 1
	Tuesday   DayOfWeek = 2
	Wednesday DayOfWeek = 3
	Thursday  DayOfWeek = 4
	Friday    DayOfWeek = 5
	Saturday  DayOfWeek = 6
)

type Limit struct {
	Region       Region  `json:"region" gorm:"type:char(2);check:region IN ('mb', 'mt', 'mn')"`
	ProvinceName string  `json:"province_name" gorm:"type:varchar(10);not null"`
	BetType      BetType `json:"bet_type" gorm:"type:varchar(5); check: bet_type IN ('b2', 'dd2', 'da', 'dax', 'b3', 'dd3', 'b4')"`
	Syntax       Syntax  `json:"syntax" gorm:"type:varchar(10); check: syntax IN ('b', 'dau', 'duoi', 'da', 'dax', 'xdau', 'xduoi', 'db' )"`
	Value        float32 `json:"value" gorm:"type:float;not null"`
}

type CustomerLimit struct {
	ID     string                     `json:"id" gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
	Day    DayOfWeek                  `json:"day" gorm:"type:smallint;check:day >= 0 AND day <= 6; not null"`
	Limits datatypes.JSONSlice[Limit] `json:"limits" gorm:"type:jsonb"`

	CustomerID string `json:"customer_id" gorm:"index;not null"`

	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP"`
}

// type UserLimit struct {
// 	ID        string                     `json:"id" gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
// 	UserID    string                     `json:"user_id" gorm:"foreignKey:UserID;constaint:OnDelete:CASCADE"`
// 	Limits    datatypes.JSONSlice[Limit] `json:"limits" gorm:"type:jsonb"`
// 	CreatedAt time.Time                  `gorm:"default:CURRENT_TIMESTAMP"`
// 	UpdatedAt time.Time                  `gorm:"default:CURRENT_TIMESTAMP"`
// }
