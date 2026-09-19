package handlers

import (
	"net/http"
	"server/app/dtos"
	"server/app/services"
	"strconv"

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
	pageStr := ctx.DefaultQuery("page", "1")
	search := ctx.DefaultQuery("search", "")
	sort := ctx.DefaultQuery("sort", "latest")
	active := ctx.Query("active")
	guest := ctx.Query("guest")

	page, error := strconv.Atoi(pageStr)
	if error != nil || page < 1 {
		page = 1
	}

	customers, totalItem, totalPage, err := h.Service.GetMany(&services.Pagination{
		Page:   page,
		Search: search,
		Sort:   sort,
		Acitve: active,
		Guest:  guest,
	})

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, dtos.CustomerListResponse{
			Message:   err.Error(),
			Success:   false,
			Status:    500,
			Data:      []dtos.CustomerItem{},
			Page:      0,
			TotalItem: int(totalItem),
			TotalPage: int(totalPage),
		})
		return
	}

	ctx.JSON(http.StatusOK, dtos.CustomerListResponse{
		Message:   "Thành công!",
		Success:   true,
		Status:    200,
		Data:      customers,
		Page:      page,
		TotalItem: int(totalItem),
		TotalPage: int(totalPage),
	})
}

// CreateCustomer godoc
// @Summary      Tạo mới khách hàng
// @Description  Thêm một khách hàng mới vào cơ sở dữ liệu
// @Tags         customers
// @Accept       json
// @Produce      json
// @Param        request  body      dtos.CreateCustomer         true  "Thông tin khách hàng cần tạo"
// @Success      201      {object}  dtos.MutateCustomerResponse  "Tạo thành công"
// @Failure      400      {object}  dtos.MutateCustomerResponse  "Dữ liệu không hợp lệ"
// @Failure      409      {object}  dtos.MutateCustomerResponse  "Số điện thoại đã tồn tại"
// @Failure      500      {object}  dtos.MutateCustomerResponse  "Lỗi server"
// @Router       /api/v1/customers [post]
func (h *Handler) CreateCustomer(ctx *gin.Context) {
	var req dtos.CreateCustomer

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, dtos.MutateCustomerResponse{
			Message: "Tạo khách hàng thất bại! Dữ liệu không hợp lệ!",
			Success: false,
			Status:  400,
		})
	}

	status, err := h.Service.Create(req)

	if err != nil {
		if status == 409 {
			ctx.JSON(http.StatusConflict, dtos.MutateCustomerResponse{
				Message: err.Error(),
				Success: false,
				Status:  500,
			})

			return
		} else {
			ctx.JSON(http.StatusInternalServerError, dtos.MutateCustomerResponse{
				Message: err.Error(),
				Success: false,
				Status:  500,
			})
		}

		return
	}

	ctx.JSON(http.StatusCreated, dtos.MutateCustomerResponse{
		Message: "Tạo khách hàng thành công!",
		Success: true,
		Status:  status,
	})
}

// DeleteCustomer godoc
// @Summary      Xóa nhiều khách hàng
// @Description  Xóa nhiều khách hàng trong cơ sở dữ liệu (Xóa cả phần setting)
// @Tags         customers
// @Accept       json
// @Produce      json
// @Param        request  body      dtos.DeleteCustomerManyRequest         true  "Id khách hàng cần xóa"
// @Success      200      {object}  dtos.MutateCustomerResponse  "Xóa thành công"
// @Failure      400      {object}  dtos.MutateCustomerResponse  "Dữ liệu không hợp lệ"
// @Failure      500      {object}  dtos.MutateCustomerResponse  "Lỗi server"
// @Router       /api/v1/customers [delete]
func (h *Handler) DeleteCustomers(ctx *gin.Context) {
	var req dtos.DeleteCustomerManyRequest
	
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, dtos.MutateCustomerResponse{
			Message: "Xóa thất bại! Dữ liệu không hợp lệ!",
			Success: false,
			Status: 400,
		})

		return
	}

	if len(req.Ids) == 0 {
		ctx.JSON(http.StatusBadRequest, dtos.MutateCustomerResponse{
			Message: "Xóa thất bại! Không có khách hàng nào có thể xóa!",
			Success: false,
			Status: 400,
		})

		return
	}

	if err := h.Service.DeleteMany(req); err != nil {
		ctx.JSON(http.StatusInternalServerError, dtos.MutateCustomerResponse{
			Message: err.Error(),
			Success: false,
			Status: 500,
		})

		return
	}

	ctx.JSON(http.StatusOK, dtos.MutateCustomerResponse{
			Message: "Xóa khách hàng thành công!",
			Success: true,
			Status: 200,
		})
}