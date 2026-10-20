package services

import (
	"errors"
	"server/app/dtos/request"
	"server/app/models"
	"server/app/repositories"

	"gorm.io/gorm"
)

type MessageService struct {
	repo *repositories.MessageRepo
}

func MessageServiceFn(repo *repositories.MessageRepo) *MessageService {
	return &MessageService{repo: repo}
}

func (s *MessageService) GetManyMessage(req *request.GetMessageQuery) ([]models.Message, uint16, error) {
	messages, err := s.repo.FindManyMessage(req)

	if err != nil {
		return messages, 500, err
	}

	return messages, 200, nil
}

func (s *MessageService) CreateMessage(req *request.CreateMessage) (uint16, error) {
	err := s.repo.CreateMessage(req)

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return 404, errors.New("Khách hàng không tồn tại!")
		}
		return 500, err
	}

	return 201, nil
}
