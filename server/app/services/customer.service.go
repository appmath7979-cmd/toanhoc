package services

import (
	"math"
	"server/app/dtos"
	"server/app/repositories"
	"server/app/utils"
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
			IsActive:    c.Active,
			CreatedAt:   c.CreatedAt,
			UpdatedAt:   c.UpdatedAt,
		})
	}

	totalItem := math.Ceil(float64(totalPage) / float64(limit))

	return results, int64(totalItem), totalPage, 200, err
}
