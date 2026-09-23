package models

import "time"

type Customer struct {
	ID          string    `gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
	FullName    string    `gorm:"type:varchar(255);not null"`
	PhoneNumber string    `gorm:"type:varchar(255);not null;unique"`
	IsGuest     bool      `gorm:"type:boolean;not null"`
	Active      bool      `gorm:"type:boolean;default:true"`
	IsSend      bool      `gorm:"type:boolean;default:false"`

	Setting     *Setting  `gorm:"foreignKey:CustomerId;constraint:OnDelete:CASCADE;" json:"setting"`
	
	CreatedAt   time.Time `gorm:"default:CURRENT_TIMESTAMP"`
	UpdatedAt   time.Time `gorm:"default:CURRENT_TIMESTAMP"`
}
