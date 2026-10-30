package handlers

import (
	"log"
	"net/http"
	"server/app/dtos/request"
	"server/app/dtos/response"
	"server/app/models"
	"server/app/services"
	"server/app/validator"

	"github.com/gin-gonic/gin"
)

type RewardHandler struct {
	services  *services.RewardService
	validator *validator.AppValidator
}

func RewardHandlerFn(services *services.RewardService,
	validator *validator.AppValidator) *RewardHandler {
	return &RewardHandler{services: services, validator: validator}
}

func (h *RewardHandler) GetReward(ctx *gin.Context) {
	at := ctx.Query("at")

	if err := h.validator.ValidateDate(at); err != nil {
		ctx.JSON(http.StatusBadRequest, response.GetRewardRes{
			Data:    nil,
			Message: err.Error(),
			Success: false,
			Status:  400,
		})

		return
	}

	var res models.Reward

	status, err := h.services.GetReward(at, &res)

	if err != nil {
		if status == 404 {
			ctx.JSON(http.StatusNotFound, response.GetRewardRes{
				Data:    &res,
				Message: err.Error(),
				Success: false,
				Status:  status,
			})
		} else {
			ctx.JSON(http.StatusInternalServerError, response.GetRewardRes{
				Data:    &res,
				Message: err.Error(),
				Success: false,
				Status:  status,
			})
		}
	} else {
		ctx.JSON(http.StatusOK, response.GetRewardRes{
			Data:    &res,
			Message: "Thành công!",
			Success: true,
			Status:  status,
		})
	}
}

func (h *RewardHandler) CreateReward(ctx *gin.Context) {
	log.Println("[reward] 1. vào handler")
	var req request.CreateReward

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, response.StatusResponse{
			Message: "Thông tin không hợp lệ!",
			Success: false,
			Status:  400,
		})

		return
	}

	if err := h.validator.ValidateDate(req.At); err != nil {
		ctx.JSON(http.StatusBadRequest, response.StatusResponse{
			Message: err.Error(),
			Success: false,
			Status:  400,
		})

		return
	}

	status, err := h.services.CreateReward(&req)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, response.StatusResponse{
			Message: err.Error(),
			Success: false,
			Status:  status,
		})

	} else {
		ctx.JSON(http.StatusCreated, response.StatusResponse{
			Message: "Thành công!",
			Success: true,
			Status:  status,
		})
	}
}
