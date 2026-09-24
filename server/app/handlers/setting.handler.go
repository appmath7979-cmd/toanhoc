package handlers

import (
	"net/http"
	"server/app/dtos"
	"server/app/services"
	"server/app/validator"

	"github.com/gin-gonic/gin"
)



func SettingHandler(service services.SettingServices) *SettingHandlers {
	return &SettingHandlers{service: service}
}

// GetSettingByCustomerId godoc
// @Summary      Lấy cấu hình của khách hàng
// @Description  Lấy tất cả thông tin cấu hình của khách hàng
// @Tags         settings
// @Accept       json
// @Produce      json
// @Param        customerId    path     string     true  "Thông tin người dùng"
// @Success      200     {object}  dtos.GetManyCustomerRes "Lấy danh sách thành công"
// @Failure      400     {object}  dtos.GetManyCustomerRes "Thông tin người dùng không hợp lệ"
// @Failure      404     {object}  dtos.GetManyCustomerRes "Không tìm thấy cấu hình hoặc người dùng"
// @Failure      500     {object}  dtos.GetManyCustomerRes "Lỗi server nội bộ"
// @Router			 /api/v1/settings/{id} [get]
func (h *SettingHandlers) GetSettingByCustomerId(ctx *gin.Context) {
	customerId := ctx.Param("id")

	if err := validator.ValidateUUID(customerId); err != nil {
		ctx.JSON(http.StatusBadRequest, dtos.GetSettingResponse{
			Message: "Người dùng không hợp lệ!",
			Success: false,
			Status:  400,
			Data:    nil,
		})
	}

	setting, status, err := h.service.GetSettingByCustomerId(customerId)

	if err != nil {
		switch status {
		case 400:
			ctx.JSON(http.StatusBadRequest, dtos.GetSettingResponse{
				Message: err.Error(),
				Success: false,
				Status:  status,
				Data:    setting,
			})
		case 404:
			ctx.JSON(http.StatusNotFound, dtos.GetSettingResponse{
				Message: err.Error(),
				Success: false,
				Status:  status,
				Data:    setting,
			})
		default:
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
