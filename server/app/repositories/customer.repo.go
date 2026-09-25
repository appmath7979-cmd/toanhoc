package repositories

import (
	"server/app/models"

	"gorm.io/gorm"
)

type CustomerRepo struct {
	db *gorm.DB
}

func CustomerRepoFn(db *gorm.DB) *CustomerRepo {
	return &CustomerRepo{db: db}
}

// GetManyCustomers godoc
// @Summary Lấy danh sách khách hàng
// @Description Lấy danh sách khách hàng có phân trang và lọc
// @Tags customers
// @Accept json
// @Produce json
 // @Param page query int true "Trang cần tìm mặc định 1"
// @Param search query string false "Tìm kiếm theo tên hoặc số điện thoại"
// @Param guest query bool true "Lọc theo loại khách"
// @Param sort query string false "Sắp xếp theo tên hoặc ngày tạo"
// @Success 200 {object} dtos.GetManyCustomerRes "Lấy danh sách thành công"
// @Failure 400 {object} dtos.GetManyCustomerRes "Thông tin không hợp lệ"
// @Failure 500 {object} dtos.GetManyCustomerRes "Lỗi Server"
// @Router /api/v1/customers [get]
func (r *CustomerRepo) FindManyCustomer(page int, limit int, offset int, search string, active *bool, guest bool, sort string) ([]models.Customer, int64, error) {
	var customers []models.Customer
	var totalPage int64

	query := r.db.Model(&customers)

	if search != "" {
		searchPatten := "%" + search + "%"
		query = query.Where("unaccent(full_name) ILIKE  ? OR unaccent(phone_number) LIKE = ?", searchPatten)
	}

	if active != nil {
		query = query.Where("active = ? AND = ?", active, guest)
	} else {
		query = query.Where("is_guest = ?", guest)
	}

	err := query.Order(sort).Count(&totalPage).Offset(offset).Limit(limit).Find(&customers).Error

	if err != nil {
		return customers, 0, err
	}

	return customers, totalPage, nil
}
