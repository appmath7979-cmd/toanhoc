package services

import (
	"errors"
	"server/app/dtos/request"
	"server/app/models"
	"server/app/repositories"

	"gorm.io/gorm"
)

type LimitService struct {
	repo *repositories.LimitRepo
}

func LimitServiceFn(repo *repositories.LimitRepo) *LimitService {
	return &LimitService{repo: repo}
}

func (s *LimitService) GetCustomerLimit(id string, day int16, res *models.CustomerLimit) (uint16, error) {
	if err := s.repo.GetCustomerLimit(id, day, res); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return 404, errors.New("Không tìm thấy thông tin hoặc thông tin không tồn tại!")
		}

		return 500, err
	}

	return 200, nil
}

func (s *LimitService) CreateCustomerLimit(req *request.CreateCustomerLimit) (uint16, error) {
	if err := s.repo.CreateCustomerLimit(req); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return 404, errors.New("Không tìm thấy khách hàng hoặc khách hàng không tồn tại!")
		}

		return 500, err
	}

	return 201, nil
}
