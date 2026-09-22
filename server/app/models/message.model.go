package models

import "time"

type Message struct {
	ID         string          `gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
	Content    string          `gorm:"type:varchar(255);not null"`
	Region     Region          `gorm:"type:varchar(255);check:region IN ('MB', 'MT', 'MN')"`
	CustomerId string          `gorm:"type:uuid;not null;index"`
	Release    string          `gorm:"type:varchar(255);not null;index"`
	Send       bool            `gorm:"type:boolean;not null"`
	Details    []MessageDetail `gorm:"foreignKey:MessageId;constraint:OnDelete:CASCADE"`
	CreatedAt  time.Time       `gorm:"default:CURRENT_TIMESTAMP"`
	UpdatedAt  time.Time       `gorm:"default:CURRENT_TIMESTAMP"`
}

type MessageDetail struct {
	ID        string `gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
	MessageId string `gorm:"type:uuid;not null;index"`

	Type     BetType  `gorm:"type:varchar(255); check: bet_type IN ('b2', 'dd2', 'da', 'dax', 'b3', 'dd3', 'b4')"`
	Syntax   Syntax   `gorm:"type:varchar(255); check: syntax IN ('b', 'dau', 'duoi', 'da', 'dax')"`
	Province Province `gorm:"type:varchar(255);check:province IN ('tp', 'dt', 'cm', 'bt', 'dn', 'ct', 'st', 'vt', 'bli', 'tn', 'bth', 'vl', 'bd', 'tv', 'la', 'hg', 'bp', 'tg', 'kg', 'dl', 'py', 'th', 'qna', 'kh', 'qb', 'qt', 'gl', 'nt', 'qn', 'dno', 'kt', 'mb')"`
	Number   string   `gorm:"type:varchar(50);not null"`

	Score float32 `gorm:"type:float;not null"`
	Co    float32 `gorm:"type:float;not null"`
	Trung float32 `gorm:"type:float;default:0"`

	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP"`
}
