package handlers

import (
	"net/http"
	"server/app/dtos/request"
	"server/app/dtos/response"
	"server/app/services"

	"github.com/gin-gonic/gin"
)

type MessageHandler struct {
	service *services.MessageService
}

func MessageHandlerFn(service *services.MessageService) *MessageHandler {
	return &MessageHandler{service: service}
}

func (h *MessageHandler) CreateMessage(ctx *gin.Context) {
	var req request.CreateMessage
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, response.StatusResponse{
			Message: "Thông tin không hợp lệ",
			Success: false,
			Status:  400,
		})

		return
	}

	status, err := h.service.CreateMessage(&req)

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
		ctx.JSON(http.StatusCreated, response.StatusResponse{
			Message: "Thêm tin nhắn thành công!",
			Success: false,
			Status:  status,
		})
	}
}
