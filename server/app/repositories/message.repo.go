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

func (r *MessageRepo) FindMessage() {}

func (r *MessageRepo) CreateMessage(req *request.CreateMessage) error {

	return r.db.Transaction(func(tx *gorm.DB) error {
		newMessage := models.Message{
			Send:       req.Send,
			At:         req.At,
			Content:    req.Content,
			Region:     req.Region,
			CustomerID: req.CustomerID,
		}

		var messageDetails []models.MessageDetail

		for _, d := range req.MessageDetails {
			messageDetails = append(messageDetails, models.MessageDetail{
				BetType:  d.BetType,
				Syntax:   d.Syntax,
				Province: d.Province,
				Score:    d.Score,
				Co:       d.Co,
				Trung:    d.Trung,
				Number:   d.Number,
			})
		}

		newMessage.MessageDetails = messageDetails

		if err := tx.Create(&newMessage).Error; err != nil {
			return err
		}

		err := tx.Model(&models.Customer{}).Where("id = ?", req.CustomerID).Update("is_send", true).Error

		if err != nil {
			return err
		}

		return nil
	})
}
