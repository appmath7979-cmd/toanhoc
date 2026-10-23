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
			Message: "Thông tin không hợp lệ!",
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

func (h *MessageHandler) DeletMessage(ctx *gin.Context) {
	id := ctx.Param("id")

	if err := h.validate.ValidateUUID(id); err != nil {
		ctx.JSON(http.StatusBadRequest, response.StatusResponse{
			Message: "Thông tin không hợp lệ!",
			Success: false,
			Status:  400,
		})

		return
	}

	status, err := h.service.DeleteMessage(id)

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
			Message: "Xóa tin thành công!",
			Success: true,
			Status:  status,
		})
	}
}

func (h *MessageHandler) GetMessageById(ctx *gin.Context) {
	id := ctx.Param("id")

	if err := h.validate.ValidateUUID(id); err != nil {
		ctx.JSON(http.StatusBadRequest, response.GetMessageByIdRes{
			Data:    nil,
			Message: "Thông tin không hợp lệ",
			Success: false,
			Status:  400,
		})

		return
	}

	var res models.Message

	status, err := h.service.GetMessageById(id, &res)

	if err != nil {
		if status == 404 {
			ctx.JSON(http.StatusNotFound, response.GetMessageByIdRes{
				Data:    nil,
				Message: err.Error(),
				Success: false,
				Status:  status,
			})
		} else {
			ctx.JSON(http.StatusInternalServerError, response.GetMessageByIdRes{
				Data:    nil,
				Message: err.Error(),
				Success: false,
				Status:  status,
			})
		}
	} else {
		ctx.JSON(http.StatusOK, response.GetMessageByIdRes{
			Data:    &res,
			Message: "Thành công!",
			Success: true,
			Status:  status,
		})
	}
}

func (h *MessageHandler) UpdateMessage(ctx *gin.Context) {
	id := ctx.Param("id")

	if err := h.validate.ValidateUUID(id); err != nil {
		ctx.JSON(http.StatusBadRequest, response.StatusResponse{
			Message: "Thông tin không hợp lệ",
			Success: false,
			Status:  400,
		})

		return
	}

	var req request.UpdateMessage

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, response.StatusResponse{
			Message: "Thông tin không hợp lệ",
			Success: false,
			Status:  400,
		})

		return
	}

	status, err := h.service.UpdateMessage(id, req)

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
			Message: "Thành công!",
			Success: true,
			Status:  status,
		})
	}
}
