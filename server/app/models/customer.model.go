package models

import "time"

type Customer struct {
	Id          string   `gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
	FullName    string   `gorm:"type:varchar(255);not null"`
	PhoneNumber string   `gorm:"type:varchar(255);unique;not null"`
	Guest       bool     `gorm:"type:boolean;default:true;not null"`
	Active      bool     `gorm:"type:boolean;default:true"`
	Setting     *Setting `gorm:"foreignKey:CustomerId;constraint:OnDelete:CASCADE;" json:"setting"`

	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP"`
}
