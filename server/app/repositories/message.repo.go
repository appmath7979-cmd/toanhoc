package repositories

import (
	"server/app/dtos/request"
	"server/app/models"

	"gorm.io/gorm"
)

type MessageRepo struct {
	db *gorm.DB
}

func MessageRepoFn(db *gorm.DB) *MessageRepo {
	return &MessageRepo{db: db}
}

func (r *MessageRepo) CreateMessage(req *request.CreateMessage) error {

	return r.db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(req).Error; err != nil {
			return err
		}

		err := tx.Model(&models.Customer{}).Where("id = ?", req.CustomerID).Update("is_send", true).Error

		if err != nil {
			return err
		}

		return nil
	})
}
