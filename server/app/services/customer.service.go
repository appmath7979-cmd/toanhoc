package services

import (
	"errors"
	"math"
	"server/app/dtos/request"
	"server/app/dtos/response"
	"server/app/models"
	"server/app/repositories"
	"server/app/utils"
	"strings"

	"gorm.io/gorm"
)

type CustomerService struct {
	repo *repositories.CustomerRepo
}

func CustomerServiceFn(repo *repositories.CustomerRepo) *CustomerService {
	return &CustomerService{repo: repo}
}

func (s *CustomerService) GetManyCustomer(req *request.GetManyCustomer) ([]response.GetCustomer, int64, int64, uint16, error) {
	limit := 10
	offset := (req.Page - 1) * limit
	search := req.Search
	sort := req.Sort

	if search != "" {
		search = utils.RemoveAccent(search)
	}

	switch sort {
	case "latest":
		sort = "created_at DESC"
	case "oldest":
		sort = "created_at ASC"
	case "name_DESC":
		sort = "full_name DESC"
	case "name_ASC":
		sort = "full_name ASC"
	}

	customers, totalItem, err := s.repo.FindManyCustomer(req.Page, limit, offset, search, req.Active, req.Guest, sort)

	if err != nil {
		return []response.GetCustomer{}, 0, 0, 500, err
	}

	var results []response.GetCustomer

	for _, c := range customers {
		results = append(results, response.GetCustomer{
			ID:          c.ID,
			FullName:    c.FullName,
			IsGuest:     c.IsGuest,
			IsSend:      c.IsSend,
			Active:      c.Active,
			CreatedAt:   c.CreatedAt,
			UpdatedAt:   c.UpdatedAt,
		})
	}

	totalPage := math.Ceil(float64(totalItem) / float64(limit))

	return results, int64(totalPage), totalItem, 200, err
}

func (s *CustomerService) GetCustomerAndMessageById(id string, at string) (*response.GetCustomerMessage, uint16, error) {
	customer, err := s.repo.FindCustomerAndMessageById(id, at)

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, 404, errors.New("Không tìm thấy khách hàng này!")
		} else {
			return nil, 500, err
		}
	}

	result := response.GetCustomerMessage{
		ID:          customer.ID,
		FullName:    customer.FullName,
		Active:      customer.Active,
		IsSend:      customer.IsSend,
		IsGuest:     customer.IsGuest,
		Messages:    customer.Messages,
		CreatedAt:   customer.CreatedAt,
		UpdatedAt:   customer.UpdatedAt,
	}

	return &result, 200, nil
}

func (s *CustomerService) GetCustomerAndSettingById(id string) (*response.GetCustomerSetting, uint16, error) {
	customer, err := s.repo.FindCustomerAndSettingById(id)

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, 404, errors.New("Không tìm thấy khách hàng!")
		} else {
			return nil, 500, err
		}
	}

	result := response.GetCustomerSetting{
		ID:          customer.ID,
		FullName:    customer.FullName,
		IsGuest:     customer.IsGuest,
		Setting:     customer.Setting,
	}

	return &result, 200, nil
}

func (s *CustomerService) CreateCustomer(req *request.CreateCustomer) (uint16, error) {
	var bets []models.BetPair

	for _, b := range req.Setting.Bets {
		bets = append(bets, models.BetPair{
			BetType: b.BetType,
			C:       models.BetValue(b.C),
			T:       models.BetValue(b.T),
			Percent: b.Percent,
		})
	}

	customer := models.Customer{
		FullName:    req.FullName,
		IsGuest:     *req.IsGuest,
		Setting: &models.Setting{
			XienMb: req.Setting.XienMb,
			DaxT:   models.DaxT(req.Setting.DaxT),
			Bets:   bets,
		},
	}

	err := s.repo.CreateCustomer(&customer)

	if err != nil {
		if strings.Contains(err.Error(), "duplicate key value") {
			return 409, errors.New("Không thể tạo khách hàng với số điện thoại này!")
		}

		return 500, err
	}

	return 201, nil
}

func (s *CustomerService) UpdateCustomer(id string, req *request.UpdateCustomer) (uint16, error) {
	err := s.repo.UpdateCustomer(id, req)

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return 404, errors.New("Không tìm thấy người dùng!")
		} else {
			return 500, err
		}
	}

	return 200, nil
}

func (s *CustomerService) DeletCustomerById(id string) (uint16, error) {
	if err := s.repo.DeleteCustomerById(id); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return 404, err
		} else {
			return 500, err
		}
	} else {
		return 200, nil
	}
}

func (s *CustomerService) DeleteManyCustomer(req *request.DeleteManyCustomer) error {
	if err := s.repo.DeleteCustomer(req.Ids); err != nil {
		return err
	}

	return nil
}
