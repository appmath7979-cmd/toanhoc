package handlers

import (
	"net/http"
	"server/app/dtos"
	"server/app/services"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SettingHandler(db *gorm.DB) *Handler {
	return &Handler{Service: services.SettingService(db)}
}

// GetSettingById godoc
// @Summary      Tìm kiếm thiết lập của khách hàng
// @Description  Lấy thông tin thiết lập của khách hàng
// @Tags         settings
// @Accept       json
// @Produce      json
// @Param        id  path      string      true  "Id của khách hàng cần lấy"
// @Success      200      {object}  dtos.SettingResponse  "Lấy cấu hình thành công"
// @Failure      404      {object}  dtos.SettingResponse  "Dữ liệu không tồn tại"
// @Failure      500      {object}  dtos.SettingResponse  "Lỗi server"
// @Router       /api/v1/settings/{id} [get]
func (h *Handler) GetSettingById(ctx *gin.Context) {
	customerId := ctx.Param("id")

	setting, status, err := h.Service.GetSettingByCustomerId(customerId)

	if err != nil {
		if status == 404 {
			ctx.JSON(http.StatusNotFound, dtos.SettingResponse{
				Message: err.Error(),
				Success: false,
				Data:    dtos.SettingItem{},
				Status:  status,
			})

			return
		}

		ctx.JSON(http.StatusInternalServerError, dtos.SettingResponse{
			Message: err.Error(),
			Success: false,
			Data:    dtos.SettingItem{},
			Status:  status,
		})

		return
	}

	ctx.JSON(http.StatusOK, dtos.SettingResponse{
		Message: "Thành công!",
		Success: true,
		Data:    setting,
		Status:  status,
	})
}
