package handlers

import (
	"net/http"
	"server/app/dtos"
	"server/app/services"
	"server/app/validator"

	"github.com/gin-gonic/gin"
)

type CustomerHandler struct {
	service  *services.CustomerService
	validate *validator.AppValidator
}

func CustomerHandlerFn(service *services.CustomerService, validate *validator.AppValidator) *CustomerHandler {
	return &CustomerHandler{service: service, validate: validate}
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
func (h *CustomerHandler) GetManyCustomer(ctx *gin.Context) {
	var req dtos.CustomerQuery

	if err := ctx.ShouldBindQuery(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, dtos.GetManyCustomerRes{
			Message:   "Thông tin không hợp lệ!",
			Success:   false,
			Status:    400,
			Data:      []dtos.GetCustomer{},
			TotalItem: 0,
			TotalPage: 0,
		})

		return
	}

	customers, totalItem, totalPage, status, err := h.service.GetManyCustomer(&req)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, dtos.GetManyCustomerRes{
			Message:   err.Error(),
			Success:   false,
			Status:    status,
			Data:      customers,
			TotalItem: totalItem,
			TotalPage: totalPage,
		})
	} else {
		ctx.JSON(http.StatusOK, dtos.GetManyCustomerRes{
			Message:   "Thành công!",
			Success:   true,
			Status:    status,
			Data:      customers,
			TotalItem: totalItem,
			TotalPage: totalPage,
		})
	}
}

func (h *CustomerHandler) GetCustomerAndMessageById(ctx *gin.Context) {
	id := ctx.Param("id")
	at := ctx.Param("at")

	isUUID := h.validate.ValidateUUID(id)
	isAt := h.validate.ValidateDate(at)

	if isUUID != nil || isAt != nil {
		ctx.JSON(http.StatusBadRequest, dtos.GetCustomerByIdRes{
			Message: "Dữ liệu không hợp lệ!",
			Success: false,
			Status:  400,
			Data:    nil,
		})

		return
	}

	customer, status, err := h.service.GetCustomerAndMessageById(id, at)

	if err != nil {
		if status == 404 {
			ctx.JSON(http.StatusNotFound, dtos.GetCustomerByIdRes{
				Message: err.Error(),
				Success: false,
				Status:  status,
				Data:    customer,
			})
		} else {
			ctx.JSON(http.StatusInternalServerError, dtos.GetCustomerByIdRes{
				Message: err.Error(),
				Success: false,
				Status:  status,
				Data:    customer,
			})
		}
	} else {
		ctx.JSON(http.StatusOK, dtos.GetCustomerByIdRes{
			Message: "Thành công!",
			Success: true,
			Status:  status,
			Data:    customer,
		})
	}
}

func (h *CustomerHandler) CreateCustomer(ctx *gin.Context) {
	var req dtos.CreateCustomer

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, dtos.MutateResponse{
			Message: "Dữ liệu không hợp lệ!",
			Success: false,
			Status:  400,
		})

		return
	}

	status, err := h.service.CreateCustomer(&req)

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
