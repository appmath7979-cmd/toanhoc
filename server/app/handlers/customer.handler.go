package handlers

import (
	"net/http"
	"server/app/dtos"
	"server/app/services"

	"github.com/gin-gonic/gin"
)

type CustomerHandler struct {
	service *services.CustomerService
}

func CustomerHandlerFn(service *services.CustomerService) *CustomerHandler {
	return &CustomerHandler{service: service}
}

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
