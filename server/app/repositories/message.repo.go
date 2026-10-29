package repositories

import (
	"errors"
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

func (r *MessageRepo) FindManyMessage(req *request.GetMessageQuery) ([]models.Message, error) {
	var messages []models.Message

	if err := r.db.Preload("MessageDetails").Where("at = ? AND customer_id = ? AND region = ?", req.At, req.ID, req.Region).Find(&messages).Error; err != nil {
		return nil, err
	}

	return messages, nil
}

func (r *MessageRepo) CreateMessage(req *request.CreateMessage) error {
	message := models.Message{
		At:         req.At,
		Content:    req.Content,
		Send:       req.Send,
		Region:     req.Region,
		CustomerID: req.CustomerID,
	}

	details := make([]models.MessageDetail, 0, len(req.MessageDetails))

	for _, d := range req.MessageDetails {
		details = append(details, models.MessageDetail{
			BetType:  d.BetType,
			Syntax:   d.Syntax,
			Province: d.Province,
			Score:    d.Score,
			Co:       d.Co,
			Trung:    0,
			Number:   d.Number,
		})
	}

	message.MessageDetails = details

	if err := r.db.Create(&message).Error; err != nil {
		return err
	}

	return nil
}

func (r *MessageRepo) DeleteMessage(id string) error {
	var message models.Message

	if err := r.db.First(&message, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return errors.New("Tin không tìm thấy hoặc không tồn tại!")
		}

		return err
	}

	if err := r.db.Delete(&message).Error; err != nil {
		return err
	}

	return nil
}

func (r *MessageRepo) GetMessageById(id string, res *models.Message) error {
	if err := r.db.Preload("MessageDetails").First(res, "id = ?", id).Error; err != nil {
		return err
	}

	return nil
}

func (r *MessageRepo) UpdateMessage(id string, req request.UpdateMessage) error {
	return r.db.Transaction(func(tx *gorm.DB) error {
		err := tx.Model(&models.Message{}).Where("id = ?", id).Select("content").Updates(models.Message{
			Content: req.Content,
		}).Error

		if err != nil {
			return err
		}

		if err := tx.Where("message_id = ?", id).Delete(&models.MessageDetail{}).Error; err != nil {
			return err
		}

		var details []models.MessageDetail

		for _, d := range req.MessageDetails {
			details = append(details, models.MessageDetail{
				BetType:   d.BetType,
				Syntax:    d.Syntax,
				Province:  d.Province,
				Score:     d.Score,
				Co:        d.Co,
				Trung:     0,
				Number:    d.Number,
				MessageID: id,
			})
		}

		if len(details) > 0 {
			if err := tx.Create(&details).Error; err != nil {
				return err
			}
		}

		return nil
	})
}
