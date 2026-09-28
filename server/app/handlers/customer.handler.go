package handlers

import (
	"net/http"
	"server/app/dtos/request"
	"server/app/dtos/response"
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
// @Success 200 {object} response.ManyCustomer "Lấy danh sách thành công"
// @Failure 400 {object} response.ManyCustomer "Thông tin không hợp lệ"
// @Failure 500 {object} response.ManyCustomer "Lỗi Server"
// @Router /api/v1/customers [get]
func (h *CustomerHandler) GetManyCustomer(ctx *gin.Context) {
	var req request.GetManyCustomer

	if err := ctx.ShouldBindQuery(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, response.ManyCustomer{
			Message:   "Thông tin không hợp lệ!",
			Success:   false,
			Status:    400,
			Data:      []response.GetCustomer{},
			TotalItem: 0,
			TotalPage: 0,
		})

		return
	}

	customers, totalItem, totalPage, status, err := h.service.GetManyCustomer(&req)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, response.ManyCustomer{
			Message:   err.Error(),
			Success:   false,
			Status:    status,
			Data:      customers,
			TotalItem: totalItem,
			TotalPage: totalPage,
		})
	} else {
		ctx.JSON(http.StatusOK, response.ManyCustomer{
			Message:   "Thành công!",
			Success:   true,
			Status:    status,
			Data:      customers,
			TotalItem: totalItem,
			TotalPage: totalPage,
		})
	}
}

// GetCustomerById godoc
// @Summary Lấy khách hàng
// @Description Lấy khách hàng theo id và danh sách tin nhắn
// @Tags customers
// @Accept json
// @Produce json
// @Param id path string true "Id của khách hàng"
// @Param at path string true "Ngày tạo tin"
// @Success 200 {object} response.CustomerMessage "Tìm khách hàng và lấy danh sách tin nhắn thành công"
// @Failure 404 {object} response.CustomerMessage "Không tìm thấy khách hàng"
// @Failure 500 {object} response.CustomerMessage "Lỗi Server"
// @Router /api/v1/customers/{id}/{at} [get]
func (h *CustomerHandler) GetCustomerAndMessageById(ctx *gin.Context) {
	id := ctx.Param("id")
	at := ctx.Param("at")

	isUUID := h.validate.ValidateUUID(id)
	isAt := h.validate.ValidateDate(at)

	if isUUID != nil || isAt != nil {
		ctx.JSON(http.StatusBadRequest, response.CustomerMessage{
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
			ctx.JSON(http.StatusNotFound, response.CustomerMessage{
				Message: err.Error(),
				Success: false,
				Status:  status,
				Data:    customer,
			})
		} else {
			ctx.JSON(http.StatusInternalServerError, response.CustomerMessage{
				Message: err.Error(),
				Success: false,
				Status:  status,
				Data:    customer,
			})
		}
	} else {
		ctx.JSON(http.StatusOK, response.CustomerMessage{
			Message: "Thành công!",
			Success: true,
			Status:  status,
			Data:    customer,
		})
	}

}

// GetCustomerById godoc
// @Summary Lấy khách hàng
// @Description Lấy khách hàng theo id và thông tin của khách hàng
// @Tags customers
// @Accept json
// @Produce json
// @Param id path string true "Id của khách hàng"
// @Success 200 {object} response.CustomerSetting "Tìm khách hàng và lấy thông tin khách hàng thành công"
// @Failure 404 {object} response.CustomerSetting "Không tìm thấy khách hàng"
// @Failure 500 {object} response.CustomerSetting "Lỗi Server"
// @Router /api/v1/customers/{id} [get]
func (h *CustomerHandler) GetCustomerAndSettingById(ctx *gin.Context) {
	id := ctx.Param("id")

	isUUID := h.validate.ValidateUUID(id)

	if isUUID != nil {
		ctx.JSON(http.StatusBadRequest, response.CustomerSetting{
			Message: "Dữ liệu không hợp lệ!",
			Success: false,
			Status:  400,
			Data:    nil,
		})

		return
	}

	customer, status, err := h.service.GetCustomerAndSettingById(id)

	if err != nil {
		if status == 404 {
			ctx.JSON(http.StatusNotFound, response.CustomerSetting{
				Message: err.Error(),
				Success: false,
				Status:  status,
				Data:    customer,
			})
		} else {
			ctx.JSON(http.StatusInternalServerError, response.CustomerSetting{
				Message: err.Error(),
				Success: false,
				Status:  status,
				Data:    customer,
			})
		}
	} else {
		ctx.JSON(http.StatusOK, response.CustomerSetting{
			Message: "Thành công!",
			Success: true,
			Status:  status,
			Data:    customer,
		})
	}
}

// CreateCustomer godoc
// @Summary Tạo khách hàng
// @Description Tạo khách hàng mới
// @Tags customers
// @Accept json
// @Produce json
// @Param request body request.CreateCustomer true "Thông tin khách hàng cần tạo"
// @Success 201 {object} response.StatusResponse "Tạo khách hàng thành công"
// @Failure 400 {object} response.StatusResponse "Thông tin không hợp lệ"
// @Failure 409 {object} response.StatusResponse "Số điện thoại đã tồn tại"
// @Failure 500 {object} response.StatusResponse "Lỗi Server"
// @Router /api/v1/customers [post]
func (h *CustomerHandler) CreateCustomer(ctx *gin.Context) {
	var req request.CreateCustomer

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, response.StatusResponse{
			Message: "Dữ liệu không hợp lệ!",
			Success: false,
			Status:  400,
		})

		return
	}

	status, err := h.service.CreateCustomer(&req)

	if err != nil {
		if status == 409 {
			ctx.JSON(http.StatusConflict, response.StatusResponse{
				Message: err.Error(),
				Success: false,
				Status:  status,
			})
		} else {
			ctx.JSON(http.StatusInternalServerError, response.StatusResponse{
				Message: err.Error(),
				Success: false,
				Status:  status,
			})
		}
	} else {
		ctx.JSON(http.StatusCreated, response.StatusResponse{
			Message: "Tạo khách hàng thành công!",
			Success: true,
			Status:  status,
		})
	}
}

// UpdateCustomer godoc
// @Summary Cập nhật khách hàng
// @Description Cập nhật thông tin khách hàng
// @Tags customers
// @Accept json
// @Produce json
// @Param request body request.UpdateCustomerr true "Thông tin khách hàng cần cập nhật"
// @Success 200 {object} response.StatusResponse "Cập nhật thông tin khách hàng thành công"
// @Failure 400 {object} response.StatusResponse "Thông tin không hợp lệ"
// @Failure 409 {object} response.StatusResponse "Số điện thoại đã tồn tại"
// @Failure 500 {object} response.StatusResponse "Lỗi Server"
// @Router /api/v1/customers/{id} [patch]
func (h *CustomerHandler) UpdateCustomer(ctx *gin.Context) {
	var req request.UpdateCustomer
	id := ctx.Param("id")

	isUUID := h.validate.ValidateUUID(id)
	err := ctx.ShouldBindJSON(&req)

	if isUUID != nil || err != nil {
		ctx.JSON(http.StatusBadRequest, response.StatusResponse{
			Message: "Dữ liệu không hợp lệ!",
			Success: false,
			Status:  400,
		})

		return
	}

	status, err := h.service.UpdateCustomer(id, &req)

	if err != nil {
		if status == 404 {
			ctx.JSON(http.StatusNotFound, response.StatusResponse{
				Message: err.Error(),
				Success: false,
				Status:  status,
			})
		} else {
			ctx.JSON(http.StatusInternalServerError, response.StatusResponse{
				Message: err.Error(),
				Success: false,
				Status:  status,
			})
		}
	} else {
		ctx.JSON(http.StatusOK, response.StatusResponse{
			Message: "Cập nhật thông tin khách hàng thành công!",
			Success: true,
			Status:  status,
		})
	}
}

// DeleteCustomerById godoc
// @Summary Xóa khách hàng
// @Description Xóa khách hàng theo id
// @Tags customers
// @Accept json
// @Produce json
// @Param id path string true "Id khách hàng cần xóa"
// @Success 200 {object} response.StatusResponse "Xóa khách hàng thành công"
// @Failure 400 {object} response.StatusResponse "Thông tin không hợp lệ"
// @Failure 500 {object} response.StatusResponse "Lỗi Server"
// @Router /api/v1/customers/{id} [delete]
func (h *CustomerHandler) DeleteCustomerById(ctx *gin.Context) {
	id := ctx.Param("id")

	if err := h.validate.ValidateUUID(id); err != nil {
		ctx.JSON(http.StatusBadRequest, response.StatusResponse{
			Message: "Dữ liệu không hợp lệ!",
			Success: false,
			Status:  400,
		})
	}

	status, err := h.service.DeletCustomerById(id)

	if err != nil {
		if status == 404 {
			ctx.JSON(http.StatusNotFound, response.StatusResponse{
				Message: err.Error(),
				Success: false,
				Status:  status,
			})
		} else {
			ctx.JSON(http.StatusInternalServerError, response.StatusResponse{
				Message: err.Error(),
				Success: false,
				Status:  status,
			})
		}
	} else {
		ctx.JSON(http.StatusOK, response.StatusResponse{
			Message: "Xóa khách hàng thành công!",
			Success: true,
			Status:  status,
		})
	}
}

// DeleteManyCustomers godoc
// @Summary Xóa nhiều khách hàng
// @Description Xóa nhiều khách hàng theo id
// @Tags customers
// @Accept json
// @Produce json
// @Param ids body request.DeleteManyCustomer true "Danh sách id khách hàng cần xóa"
// @Success 200 {object} response.StatusResponse "Xóa khách hàng thành công"
// @Failure 400 {object} response.StatusResponse "Thông tin không hợp lệ"
// @Failure 500 {object} response.StatusResponse "Lỗi Server"
// @Router /api/v1/customers [delete]
func (h *CustomerHandler) DeleteManyCustomer(ctx *gin.Context) {
	var req request.DeleteManyCustomer

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, response.StatusResponse{
			Message: "Dữ liệu không hợp lệ!",
			Success: false,
			Status:  400,
		})

		return
	}

	if err := h.service.DeleteManyCustomer(&req); err != nil {
		ctx.JSON(http.StatusInternalServerError, response.StatusResponse{
			Message: err.Error(),
			Success: false,
			Status:  500,
		})
	} else {
		ctx.JSON(http.StatusOK, response.StatusResponse{
			Message: "Xóa khách hàng thành công!",
			Success: true,
			Status:  200,
		})
	}
}
