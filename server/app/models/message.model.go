package models

import "time"

type MessageDetail struct {
	ID       string   `gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
	Type     BetType  `gorm:"type:varchar(255); check: bet_type IN ('b2', 'dd2', 'da', 'dax', 'b3', 'dd3', 'b4')"`
	Syntax   Syntax   `gorm:"type:varchar(255); check: syntax IN ('b', 'dau', 'duoi', 'da', 'dax')"`
	Province Province `gorm:"type:varchar(255);check:province IN ('tp', 'dt', 'cm', 'bt', 'dn', 'ct', 'st', 'vt', 'bli', 'tn', 'bth', 'vl', 'bd', 'tv', 'la', 'hg', 'bp', 'tg', 'kg', 'dl', 'py', 'th', 'qna', 'kh', 'qb', 'qt', 'gl', 'nt', 'qn', 'dno', 'kt', 'mb')"`

	Score  float32 `gorm:"type:float;not null"`
	Co     float32 `gorm:"type:float;not null"`
	Trung  float32 `gorm:"type:float;default:0"`
	Number string  `gorm:"type:varchar(50);not null"`

	MessageID string `gorm:"type:uuid;not null;index"`

	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP"`
}

type Message struct {
	ID      string `gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
	Send    bool   `gorm:"type:boolean;not null"`
	At      string `gorm:"type:varchar(255);not null"`
	Content string `gorm:"type:varchar(255);not null"`
	Region  Region `gorm:"type:varchar(255);check:region IN ('mb', 'mt', 'mn')"`

	MessageDetails []MessageDetail `gorm:"foreignKey:MessageID;constraint:OnDelete:CASCADE"`
	CustomerID     string          `gorm:"type:uuid;not null;index"`

	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP"`
}
