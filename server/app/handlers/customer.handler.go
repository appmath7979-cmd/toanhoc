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

	customers, totalPage, totalItem, status, err := h.service.GetManyCustomer(&req)

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

func (h *CustomerHandler) GetCustomerDetails(ctx *gin.Context) {
	id := ctx.Param("id")

	isUUID := h.validate.ValidateUUID(id)

	if isUUID != nil {
		ctx.JSON(http.StatusBadRequest, response.CustomerSetting{
			Message: isUUID.Error(),
			Success: false,
			Status:  400,
			Data:    nil,
		})

		return
	}

	customer, status, err := h.service.GetCustomerDetails(id)

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
