package handlers

import (
	"net/http"
	"server/app/dtos"
	"server/app/services"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CustomerHandler(db *gorm.DB) *Handler {
	return &Handler{Service: services.CustomerService(db)}
}

// GetCustomers godoc
// @Summary      Lấy danh sách khách hàng
// @Description  Trả về toàn bộ danh sách khách hàng có trong hệ thống
// @Tags         customers
// @Accept       json
// @Produce      json
// @Success      200  {object}  dtos.CustomerListResponse  "Thành công"
// @Failure      500  {object}  dtos.CustomerListResponse  "Lỗi server"
// @Router       /api/v1/customers [get]
func (h *Handler) GetCustomers(ctx *gin.Context) {
	customers, err := h.Service.GetMany()

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, dtos.CustomerListResponse{
			Message:   err.Error(),
			Success:   false,
			Status:    500,
			Data:      nil,
			Page:      0,
			TotalItem: 0,
			TotalPage: 0,
		})
		return
	}

	ctx.JSON(http.StatusOK, dtos.CustomerListResponse{
		Message:   "Thành công!",
		Success:   true,
		Status:    200,
		Data:      customers,
		Page:      0,
		TotalItem: 0,
		TotalPage: 0,
	})
}

// CreateCustomer godoc
// @Summary      Tạo mới khách hàng
// @Description  Thêm một khách hàng mới vào cơ sở dữ liệu
// @Tags         customers
// @Accept       json
// @Produce      json
// @Param        request  body      dtos.CreateCustomer         true  "Thông tin khách hàng cần tạo"
// @Success      201      {object}  dtos.CreateCustomerResponse  "Tạo thành công"
// @Failure      400      {object}  dtos.CreateCustomerResponse  "Dữ liệu không hợp lệ"
// @Failure      500      {object}  dtos.CreateCustomerResponse  "Lỗi server"
// @Router       /api/v1/customers [post]
func (h *Handler) CreateCustomer(ctx *gin.Context) {
	
}
