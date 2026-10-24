package handlers

import (
	"net/http"
	"server/app/dtos/request"
	"server/app/dtos/response"
	"server/app/models"
	"server/app/services"
	"server/app/validator"

	"github.com/gin-gonic/gin"
)

type LimitHandler struct {
	service   *services.LimitService
	validator *validator.AppValidator
}

func LimitHandlerFn(service *services.LimitService,
	validator *validator.AppValidator) LimitHandler {
	return LimitHandler{service: service, validator: validator}
}

func (h *LimitHandler) GetCustomerLimit(ctx *gin.Context) {
	id := ctx.Param("id")
	dayStr := ctx.Query("day")

	idErr := h.validator.ValidateUUID(id)
	dayValidated, dayErr := h.validator.ValidateDay(dayStr)

	if idErr != nil {
		ctx.JSON(http.StatusBadRequest, response.GetCustomerLimit{
			Message: idErr.Error(),
			Success: false,
			Status:  400,
			Data:    nil,
		})

		return
	}

	if dayErr != nil {
		ctx.JSON(http.StatusBadRequest, response.GetCustomerLimit{
			Message: dayErr.Error(),
			Success: false,
			Status:  400,
			Data:    nil,
		})

		return
	}

	var customerLimit models.CustomerLimit
	day := *dayValidated

	status, err := h.service.GetCustomerLimit(id, day, &customerLimit)

	if err != nil {
		if status == 404 {
			ctx.JSON(http.StatusNotFound, response.GetCustomerLimit{
				Message: err.Error(),
				Success: false,
				Status:  status,
				Data:    nil,
			})
		} else {
			ctx.JSON(http.StatusInternalServerError, response.GetCustomerLimit{
				Message: err.Error(),
				Success: false,
				Status:  status,
				Data:    nil,
			})
		}
	} else {
		ctx.JSON(http.StatusOK, response.GetCustomerLimit{
			Message: "Thành công!",
			Success: true,
			Status:  status,
			Data:    &customerLimit,
		})
	}

}

func (h *LimitHandler) CreateCustomerLimit(ctx *gin.Context) {
	var req request.CreateCustomerLimit

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, response.StatusResponse{
			Message: "Thông tin không hợp lệ",
			Success: false,
			Status:  400,
		})

		return
	}

	status, err := h.service.CreateCustomerLimit(&req)

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
			Message: "Cập nhật thông tin thành công!",
			Success: true,
			Status:  status,
		})
	}
}
