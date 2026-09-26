package handlers

import (
	"net/http"
	"server/app/dtos"
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

// GetSettingById godoc
// @Summary Lấy thông tin khách hàng
// @Description Lấy thông tin khách hàng theo id
// @Tags settings
// @Accept json
// @Produce json
// @Param id path string true "Id của khách hàng"
// @Success 200 {object} dtos.GetSettingResponse "Tìm thông tin khách hàng thành công"
// @Failure 404 {object} dtos.GetSettingResponse "Không tìm thấy thông tin khách hàng"
// @Failure 500 {object} dtos.GetSettingResponse "Lỗi Server"
// @Router /api/v1/settings/{id} [get]
func (h *SettingHandler) GetSettingById(ctx *gin.Context) {
	id := ctx.Param("id")

	if err := h.validate.ValidateUUID(id); err != nil {
		ctx.JSON(http.StatusBadRequest, dtos.GetSettingResponse{
			Message: "Dữ liệu không hợp lệ!",
			Success: false,
			Status:  400,
			Data:    nil,
		})

		return
	}

	setting, status, err := h.service.GetSettingById(id)

	if err != nil {
		if status == 404 {
			ctx.JSON(http.StatusNotFound, dtos.GetSettingResponse{
				Message: err.Error(),
				Success: false,
				Status:  status,
				Data:    setting,
			})
		} else {
			ctx.JSON(http.StatusInternalServerError, dtos.GetSettingResponse{
				Message: err.Error(),
				Success: false,
				Status:  status,
				Data:    setting,
			})
		}
	} else {
		ctx.JSON(http.StatusOK, dtos.GetSettingResponse{
			Message: "Thành công!",
			Success: true,
			Status:  status,
			Data:    setting,
		})
	}
}
