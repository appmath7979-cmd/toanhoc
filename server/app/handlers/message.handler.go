package handlers

import (
	"net/http"
	"server/app/dtos"
	"server/app/services"
	"server/app/validator"

	"github.com/gin-gonic/gin"
)

func MessageHandler(service services.MessageServices, validator validator.AppValidator) *MessageHandlers {
	return &MessageHandlers{service: service, validator: validator}
}

// GetManyMessages godoc
// @Summary Lấy danh sách tin nhắn
// @Description Lấy danh sách tin nhắn theo ngày và theo khách hàng
// @Tags messages
// @Accept json
// @Produce json
// @Param request body dtos.GetMessageQuery true "Id khách hàng và ngày tạo tin"
// @Success 200 {object} dtos.GetManyMessageRes "Tìm kiếm thành công"
// @Success 400 {object} dtos.QueryErrListRes "Thông tin không hợp lệ"
// @Success 500 {object} dtos.QueryErrListRes "Lỗi Server"
// @Router /api/v1/messages [get]
func (h *MessageHandlers) GetManyMessage(ctx *gin.Context) {
	var req dtos.GetMessageQuery

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, dtos.QueryErrListRes{
			Message: "Thông tin không hợp lệ!",
			Success: false,
			Status:  400,
			Data:    []dtos.GetMessage{},
		})
	}

	messages, status, err := h.service.GetManyMessage(req.ID, req.At)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, dtos.GetManyMessageRes{
			Message: err.Error(),
			Success: false,
			Status:  status,
			Data:    messages,
		})
	} else {
		ctx.JSON(http.StatusBadRequest, dtos.GetManyMessageRes{
			Message: "Thành công!",
			Success: true,
			Status:  status,
			Data:    messages,
		})
	}
}
