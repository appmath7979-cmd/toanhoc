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

type MessageHandler struct {
	service  *services.MessageService
	validate *validator.AppValidator
}

func MessageHandlerFn(service *services.MessageService, validate *validator.AppValidator) *MessageHandler {
	return &MessageHandler{service, validate}
}

func (h *MessageHandler) GetManyMessage(ctx *gin.Context) {
	at := ctx.Query("at")
	id := ctx.Query("id")
	region := ctx.Query("region")

	atErr := h.validate.ValidateDate(at)
	idErr := h.validate.ValidateUUID(id)

	if region != "mb" && region != "mn" && region != "mt" {
		ctx.JSON(http.StatusBadRequest, response.StatusResponse{
			Message: "Thông tin không hợp lệ",
			Success: false,
			Status:  400,
		})

		return
	}

	if atErr != nil || idErr != nil {
		ctx.JSON(http.StatusBadRequest, response.StatusResponse{
			Message: "Thông tin không hợp lệ",
			Success: false,
			Status:  400,
		})

		return
	}

	messages, status, err := h.service.GetManyMessage(&request.GetMessageQuery{ID: id, At: at, Region: models.Region(region)})

	if err != nil {
		ctx.JSON(http.StatusBadRequest, response.GetManyMessageRes{
			Data:    messages,
			Message: err.Error(),
			Success: false,
			Status:  status,
		})
	} else {
		ctx.JSON(http.StatusOK, response.GetManyMessageRes{
			Data:    messages,
			Message: "Thành công!",
			Success: true,
			Status:  status,
		})
	}
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
