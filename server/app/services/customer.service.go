package services

import (
	"errors"
	"math"
	"server/app/dtos"
	"server/app/models"
	"server/app/repositories"
	"server/app/utils"

	"gorm.io/gorm"
)

type CustomerService struct {
	repo *repositories.CustomerRepo
}

func CustomerServiceFn(repo *repositories.CustomerRepo) *CustomerService {
	return &CustomerService{repo: repo}
}

func (s *CustomerService) GetManyCustomer(req *dtos.CustomerQuery) ([]dtos.GetCustomer, int64, int64, uint16, error) {
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

	customers, totalPage, err := s.repo.FindManyCustomer(req.Page, limit, offset, search, req.Active, req.Guest, sort)

	if err != nil {
		return []dtos.GetCustomer{}, 0, 0, 500, err
	}

	var results []dtos.GetCustomer

	for _, c := range customers {
		results = append(results, dtos.GetCustomer{
			ID:          c.ID,
			FullName:    c.FullName,
			PhoneNumber: c.PhoneNumber,
			IsGuest:     c.IsGuest,
			IsSend:      c.IsSend,
			Active:    c.Active,
			CreatedAt:   c.CreatedAt,
			UpdatedAt:   c.UpdatedAt,
		})
	}

	totalItem := math.Ceil(float64(totalPage) / float64(limit))

	return results, int64(totalItem), totalPage, 200, err
}

func (s *CustomerService) GetCustomerAndMessageById(id string, at string) (*dtos.GetCustomerById, uint16, error) {
	customer, err := s.repo.FindCustomerAndMessageById(id, at)

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, 404, errors.New("Không tìm thấy khách hàng này!")
		} else {
			return nil, 500, err
		}
	}

	var messages []dtos.GetMessage

	for _, m := range customer.Messages {
		var details []dtos.GetMessageDetail

		for _, d := range m.MessageDetails {
			details = append(details, dtos.GetMessageDetail{
				ID:        d.ID,
				BetType:   d.BetType,
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
		messages = append(messages, dtos.GetMessage{
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

	result := dtos.GetCustomerById{
		ID:          customer.ID,
		FullName:    customer.FullName,
		PhoneNumber: customer.PhoneNumber,
		IsGuest:     customer.IsGuest,
		IsSend:      customer.IsSend,
		Active:      customer.Active,
		Messages:    messages,
	}

	return &result, 200, nil
}

func (s *CustomerService) CreateCustomer(req *dtos.CreateCustomer) (uint16, error) {
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
		PhoneNumber: req.PhoneNumber,
		IsGuest:     *req.IsGuest,
		Setting: &models.Setting{
			XienMb: req.Setting.XienMb,
			DaxT:   models.DaxT(req.Setting.DaxT),
			Bets:   bets,
		},
	}

	result, err := s.repo.CreateCustomer(&customer)

	if err != nil {
		return 500, err
	}

	if result == nil {
		return 409, errors.New("Không thể tạo khách hàng với số điện thoại này!")
	}

	return 201, nil
}
