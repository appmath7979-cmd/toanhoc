package services

import (
	"server/app/dtos"
	"server/app/models"

	"gorm.io/gorm"
)

func MessageService(db *gorm.DB) MessageServices {
	return &Service{db: db}
}

func (s *Service) GetManyMessage(id string, at string) ([]dtos.GetMessage, uint16, error) {
	var messages []models.Message

	err := s.db.Preload("MessageDetails").Where("customer_id = ? AND at = ?", id, at).Find(&messages).Error

	if err != nil {
		return []dtos.GetMessage{}, 500, err
	}

	var results []dtos.GetMessage

	for _, m := range messages {
		var details []dtos.GetMessageDetail

		for _, d := range m.MessageDetails {
			details = append(details, dtos.GetMessageDetail{
				ID:        d.ID,
				BetType:  d.BetType,
				Syntax:    d.Syntax,
				Province:  d.Province,
				Score:     d.Score,
				Co:        d.Co,
				Trung:     d.Trung,
				Number:    d.Number,
				MessageID: d.MessageID,
				CreatedAt: d.CreatedAt,
				UpdatedAt: d.UpdatedAt,
			})
		}

		results = append(results, dtos.GetMessage{
			ID:             m.ID,
			Send:           m.Send,
			At:             m.At,
			Content:        m.Content,
			Region:         m.Region,
			MessageDetails: details,
			CustomerID:     m.CustomerID,
			CreatedAt:      m.CreatedAt,
			UpdatedAt:      m.UpdatedAt,
		})
	}

	return results, 200, nil
}
