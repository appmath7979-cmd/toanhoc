package models

import "time"

type MessageDetail struct {
	ID       string   `json:"id" gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
	BetType  BetType  `json:"bet_type" gorm:"type:varchar(5); check: bet_type IN ('b2', 'dd2', 'da', 'dax', 'b3', 'dd3', 'b4')"`
	Syntax   Syntax   `json:"syntax" gorm:"type:varchar(10); check: syntax IN ('b', 'dau', 'duoi', 'da', 'dax', 'xdau', 'xduoi', 'db' )"`
	Province Province `json:"province" gorm:"type:varchar(5);check:province IN ('tp', 'dt', 'cm', 'bt', 'dn', 'ct', 'st', 'vt', 'bli', 'tn', 'bth', 'vl', 'bd', 'tv', 'la', 'hg', 'bp', 'tg', 'kg', 'dl', 'py', 'th', 'qna', 'kh', 'qb', 'qt', 'gl', 'nt', 'qn', 'dno', 'kt', 'mb', 'ag')"`

	Score  float32 `json:"score" gorm:"type:float;not null"`
	Co     float32 `json:"co" gorm:"type:float;not null"`
	Trung  float32 `json:"trung" gorm:"type:float;default:0"`
	Number string  `json:"number" gorm:"type:varchar(50);not null"`

	MessageID string `json:"message_id" gorm:"type:uuid;not null;index"`

	CreatedAt time.Time `json:"created_at" gorm:"default:CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `json:"updated_at" gorm:"default:CURRENT_TIMESTAMP"`
}

type Message struct {
	ID      string `json:"id" gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
	Send    bool   `json:"send" gorm:"type:boolean;not null"`
	At      string `json:"at" gorm:"type:varchar(255);not null"`
	Content string `json:"content" gorm:"type:varchar(255);not null"`
	Region  Region `json:"region" gorm:"type:char(2);check:region IN ('mb', 'mt', 'mn')"`

	MessageDetails []MessageDetail `json:"message_details" gorm:"foreignKey:MessageID;constraint:OnDelete:CASCADE"`
	CustomerID     string          `json:"customer_id" gorm:"type:uuid;not null;index"`

	CreatedAt time.Time `json:"created_at" gorm:"default:CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `json:"updated_at" gorm:"default:CURRENT_TIMESTAMP"`
}
