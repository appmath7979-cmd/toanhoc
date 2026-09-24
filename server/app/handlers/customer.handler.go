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

// GetCustomer godoc
// @Summary      Lấy danh sách khách hàng
// @Description  Trả về danh sách khách hàng có phân trang, hỗ trợ tìm kiếm không dấu, lọc theo trạng thái active, loại khách/chủ (guest) và sắp xếp.
// @Tags         customers
// @Accept       json
// @Produce      json
// @Param        page    query     int     false  "Số trang hiện tại (mặc định là 1)"
// @Param        search  query     string  false  "Từ khóa tìm kiếm theo họ tên hoặc số điện thoại"
// @Param        active  query     boolean false  "Lọc theo trạng thái active (true/false)"
// @Param        guest   query     boolean true  "Lọc theo khách vãng lai (true/false)"
// @Param        sort    query     string  false  "Kiểu sắp xếp" Enums(latest, oldest, name_ASC, name_DESC)
// @Success      200     {object}  dtos.GetManyCustomerRes "Lấy danh sách thành công"
// @Failure      400     {object}  dtos.GetManyCustomerRes "Query parameters không hợp lệ"
// @Failure      500     {object}  dtos.GetManyCustomerRes "Lỗi server nội bộ"
// @Router			 /api/v1/customers [get]
func (h *Handler) GetManyCustomer(ctx *gin.Context) {
	var query dtos.CustomerQuery

	if err := ctx.ShouldBindQuery(&query); err != nil {
		ctx.JSON(http.StatusBadRequest, dtos.GetManyCustomerRes{
			Message:   err.Error(),
			Success:   false,
			Status:    400,
			Data:      nil,
			TotalItem: 0,
			TotalPage: 0,
		})

		return
	}

	customers, totalItem, totalPage, err := h.Service.GetManyCustomer(&query)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, dtos.GetManyCustomerRes{
			Message:   err.Error(),
			Success:   false,
			Status:    500,
			Data:      customers,
			TotalItem: totalItem,
			TotalPage: totalPage,
		})

		return
	}

	ctx.JSON(http.StatusOK, dtos.GetManyCustomerRes{
		Message:   "Thành công!",
		Success:   true,
		Status:    200,
		Data:      customers,
		TotalItem: totalItem,
		TotalPage: totalPage,
	})
}

// CreateCustomer godoc
// @Summary      Tạo khách hàng mới
// @Description  Tạo khách hàng cùng thiết lập cho khách hàng
// @Tags         customers
// @Accept       json
// @Produce      json
// @Param        request    body   dtos.CreateCustomer  false  "Thông tin khách hàng"
// @Success      201     {object}  dtos.MutateResponse "Tạo khách hàng thành công"
// @Failure      400     {object}  dtos.MutateResponse "Thông tin không hợp lệ"
// @Failure      409     {object}  dtos.MutateResponse "Số điện thoại bị trùng"
// @Failure      500     {object}  dtos.MutateResponse "Lỗi server nội bộ"
// @Router			 /api/v1/customers [post]
func (h *Handler) CreateCustomer(ctx *gin.Context) {
	var req dtos.CreateCustomer

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, dtos.MutateResponse{
			Message: err.Error(),
			Success: false,
			Status:  400,
		})

		return
	}

	status, err := h.Service.CreateCustomer(&req)

	if err != nil {
		if status == 409 {
			ctx.JSON(http.StatusConflict, dtos.MutateResponse{
				Message: err.Error(),
				Success: false,
				Status:  status,
			})
		} else {
			ctx.JSON(http.StatusInternalServerError, dtos.MutateResponse{
				Message: err.Error(),
				Success: false,
				Status:  status,
			})
		}
	} else {
		ctx.JSON(http.StatusCreated, dtos.MutateResponse{
			Message: "Tạo khách hàng thành công!",
			Success: true,
			Status:  status,
		})
	}
}

// func (h *Handler) {}
