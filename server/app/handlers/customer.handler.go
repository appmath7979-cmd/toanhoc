package handlers

import (
	"log"
	"net/http"
	"server/app/dtos"
	"server/app/services"
	"server/app/validator"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CustomerHandler(db *gorm.DB) *Handler {
	return &Handler{Service: services.CustomerService(db)}
}

// GetCustomer godoc
// @Summary      Lấy danh sách khách hàng
// @Description  Trả về danh sách khách hàng có phân trang, hỗ trợ tìm kiếm không dấu, lọc theo trạng thái active, khách vãng lai (guest) và sắp xếp.
// @Tags         customers
// @Accept       json
// @Produce      json
// @Param        page    query     int     false  "Số trang hiện tại (mặc định là 1)"
// @Param        search  query     string  false  "Từ khóa tìm kiếm theo họ tên hoặc số điện thoại"
// @Param        active  query     boolean false  "Lọc theo trạng thái active (true/false)"
// @Param        guest   query     boolean false  "Lọc theo khách vãng lai (true/false)"
// @Param        sort    query     string  false  "Kiểu sắp xếp" Enums(latest, oldest, name_ASC, name_DESC)
// @Success      200     {object}  dtos.CustomerListResponse "Lấy danh sách thành công"
// @Failure      400     {object}  dtos.CustomerListResponse "Query parameters không hợp lệ"
// @Failure      500     {object}  dtos.CustomerListResponse "Lỗi server nội bộ"
// @Router       /api/customers [get]
func (h *Handler) GetCustomer(ctx *gin.Context) {
	var query dtos.GetCustomersQuery

	// Bind query params tự động
	if err := ctx.ShouldBindQuery(&query); err != nil {
		ctx.JSON(http.StatusBadRequest, dtos.CustomerListResponse{
			Message: "Query parameters không hợp lệ: " + err.Error(),
			Success: false,
			Status:  400,
		})
		return
	}

	if query.Page < 1 {
		query.Page = 1
	}

	if query.Sort == "" {
		query.Sort = "latest"
	}

	customers, totalItem, totalPage, err := h.Service.GetManyCustomer(&query)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, dtos.CustomerListResponse{
			Message:   err.Error(),
			Success:   false,
			Status:    500,
			Data:      []dtos.CustomerItem{},
			Page:      0,
			TotalItem: int(totalItem),
			TotalPage: int(totalPage),
		})
		return
	}

	ctx.JSON(http.StatusOK, dtos.CustomerListResponse{
		Message:   "Thành công!",
		Success:   true,
		Status:    200,
		Data:      customers,
		Page:      query.Page,
		TotalItem: int(totalItem),
		TotalPage: int(totalPage),
	})
}

func (h *Handler) GetCustomerById(ctx *gin.Context) {
	id := ctx.Param("id")
	log.Fatalln(id)
}

// CreateCustomer godoc
// @Summary      Tạo mới khách hàng
// @Description  Thêm một khách hàng mới vào cơ sở dữ liệu
// @Tags         customers
// @Accept       json
// @Produce      json
// @Param        request  body      dtos.CreateCustomer         true  "Thông tin khách hàng cần tạo"
// @Success      201      {object}  dtos.MutateResponse  "Tạo thành công"
// @Failure      400      {object}  dtos.MutateResponse  "Dữ liệu không hợp lệ"
// @Failure      409      {object}  dtos.MutateResponse  "Số điện thoại đã tồn tại"
// @Failure      500      {object}  dtos.MutateResponse  "Lỗi server"
// @Router       /api/v1/customers [post]
func (h *Handler) CreateCustomer(ctx *gin.Context) {
	var req dtos.CreateCustomer

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, dtos.MutateResponse{
			Message: "Tạo khách hàng thất bại! Dữ liệu không hợp lệ!",
			Success: false,
			Status:  400,
		})

		return
	}

	status, err := h.Service.CreateCustomer(req)

	if err != nil {
		if status == 409 {
			ctx.JSON(http.StatusConflict, dtos.MutateResponse{
				Message: err.Error(),
				Success: false,
				Status:  status,
			})

			return
		} else {
			ctx.JSON(http.StatusInternalServerError, dtos.MutateResponse{
				Message: err.Error(),
				Success: false,
				Status:  status,
			})
		}

		return
	}

	ctx.JSON(http.StatusCreated, dtos.MutateResponse{
		Message: "Tạo khách hàng thành công!",
		Success: true,
		Status:  status,
	})
}

// UpdateCustomer godoc
// @Summary      Sửa thông tin khách hàng
// @Description  Sửa thông tin khách hàng trong cơ sở dữ liệu (Sửa cả phần setting)
// @Tags         customers
// @Accept       json
// @Produce      json
// @Param        id  path     string        true  "Id khách hàng cần sửa"
// @Param        request  body     string        true  "Thông tin cần sửa"
// @Success      200      {object}  dtos.MutateResponse  "Sửa thành công"
// @Failure      500      {object}  dtos.MutateResponse  "Lỗi server"
// @Router       /api/v1/customers/{id} [delete]
func (h *Handler) UpdateCustomer(ctx *gin.Context) {
	customerId := ctx.Param("id")

	if err := validator.ValidateUUID(customerId); err != nil {
		ctx.JSON(http.StatusBadRequest, dtos.MutateResponse{
			Message: err.Error(),
			Success: false,
			Status:  400,
		})

		return
	}

	var req dtos.UpdateCustomerWithSetting
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, dtos.MutateResponse{
			Message: err.Error(),
			Success: false,
			Status:  400,
		})

		return
	}

	status, err := h.Service.UpdateCustomerWithSetting(customerId, req)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, dtos.MutateResponse{
			Message: err.Error(),
			Success: false,
			Status:  status,
		})

		return
	}

	ctx.JSON(http.StatusOK, dtos.MutateResponse{
		Message: "Thành công!",
		Success: true,
		Status:  status,
	})

}

// DeleteCustomerById godoc
// @Summary      Xóa một khách hàng
// @Description  Xóa một khách hàng trong cơ sở dữ liệu (Xóa cả phần setting)
// @Tags         customers
// @Accept       json
// @Produce      json
// @Param        id  path     string        true  "Id khách hàng cần xóa"
// @Success      200      {object}  dtos.MutateResponse  "Xóa thành công"
// @Failure      500      {object}  dtos.MutateResponse  "Lỗi server"
// @Router       /api/v1/customers/{id} [delete]
func (h *Handler) DeleteCustomerById(ctx *gin.Context) {
	id := ctx.Param("id")

	if err := h.Service.DeleteCustomerById(id); err != nil {
		ctx.JSON(http.StatusInternalServerError, dtos.MutateResponse{
			Message: err.Error(),
			Success: false,
			Status:  500,
		})
		return
	}

	ctx.JSON(http.StatusOK, dtos.MutateResponse{
		Message: "Xóa khách hàng thành công!",
		Success: true,
		Status:  200,
	})
}

// DeleteCustomer godoc
// @Summary      Xóa nhiều khách hàng
// @Description  Xóa nhiều khách hàng trong cơ sở dữ liệu (Xóa cả phần setting)
// @Tags         customers
// @Accept       json
// @Produce      json
// @Param        request  body      dtos.DeleteCustomerManyRequest         true  "Id khách hàng cần xóa"
// @Success      200      {object}  dtos.MutateResponse  "Xóa thành công"
// @Failure      400      {object}  dtos.MutateResponse  "Dữ liệu không hợp lệ"
// @Failure      500      {object}  dtos.MutateResponse  "Lỗi server"
// @Router       /api/v1/customers [delete]
func (h *Handler) DeleteCustomer(ctx *gin.Context) {
	var req dtos.DeleteCustomerManyRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, dtos.MutateResponse{
			Message: "Xóa thất bại! Dữ liệu không hợp lệ!",
			Success: false,
			Status:  400,
		})

		return
	}

	if len(req.Ids) == 0 {
		ctx.JSON(http.StatusBadRequest, dtos.MutateResponse{
			Message: "Xóa thất bại! Không có khách hàng nào có thể xóa!",
			Success: false,
			Status:  400,
		})

		return
	}

	if err := h.Service.DeleteManyCustomer(req); err != nil {
		ctx.JSON(http.StatusInternalServerError, dtos.MutateResponse{
			Message: err.Error(),
			Success: false,
			Status:  500,
		})

		return
	}

	ctx.JSON(http.StatusOK, dtos.MutateResponse{
		Message: "Xóa khách hàng thành công!",
		Success: true,
		Status:  200,
	})
}
