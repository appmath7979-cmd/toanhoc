package handlers

import (
	"net/http"
	"server/app/dtos/response"
	"server/app/services"
	"server/app/validator"

	"github.com/gin-gonic/gin"
)

type SettingHandler struct {
	service  *services.SettingService
	validate *validator.AppValidator
}

func SettingHandlerFn(service *services.SettingService, validate *validator.AppValidator) *SettingHandler {
	return &SettingHandler{service: service, validate: validate}
}

func (h *SettingHandler) GetSettingByCustomerId(ctx *gin.Context) {
	id := ctx.Param("id")

	if err := h.validate.ValidateUUID(id); err != nil {
		ctx.JSON(http.StatusBadRequest, response.GetSetting{
			Message: "Dữ liệu không hợp lệ!",
			Success: false,
			Status:  400,
			Data:    nil,
		})

		return
	}

	setting, status, err := h.service.GetSettingByCustomerId(id)

	if err != nil {
		if status == 404 {
			ctx.JSON(http.StatusNotFound, response.GetSetting{
				Message: err.Error(),
				Success: false,
				Status:  status,
				Data:    setting,
			})
		} else {
			ctx.JSON(http.StatusInternalServerError, response.GetSetting{
				Message: err.Error(),
				Success: false,
				Status:  status,
				Data:    setting,
			})
		}
	} else {
		ctx.JSON(http.StatusOK, response.GetSetting{
			Message: "Thành công!",
			Success: true,
			Status:  status,
			Data:    setting,
		})
	}
}
