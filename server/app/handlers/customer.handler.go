package handlers

import (
	"net/http"
	"server/app/dtos"
	"server/app/services"
	"server/app/validator"

	"github.com/gin-gonic/gin"
)

func CustomerHandler(service services.CustomerServices) *CustomerHandlers {
	return &CustomerHandlers{service: service}
}

// GetManyCustomers godoc
// @Summary      Lấy danh sách khách hàng
// @Description  Trả về danh sách khách hàng có phân trang, hỗ trợ tìm kiếm không dấu, lọc theo trạng thái active, loại khách/chủ (guest) và sắp xếp.
// @Tags         customers
// @Accept       json
// @Produce      json
// @Param        page    query     int     true  "Số trang hiện tại (mặc định là 1)"
// @Param        search  query     string  false  "Từ khóa tìm kiếm theo họ tên hoặc số điện thoại"
// @Param        active  query     boolean false  "Lọc theo trạng thái active (true/false)"
// @Param        guest   query     boolean true  "Lọc theo khách vãng lai (true/false)"
// @Param        sort    query     string  false  "Kiểu sắp xếp" Enums(latest, oldest, name_ASC, name_DESC)
// @Success      200     {object}  dtos.GetManyCustomerRes "Lấy danh sách thành công (OK)"
// @Failure      400     {object}  dtos.QueryErrItemRes "Query parameters không hợp lệ (Bad Request)"
// @Failure      500     {object}  dtos.QueryErrItemRes "Lỗi server nội bộ (Internal Server Error)"
// @Router			 /api/v1/customers [get]
func (h *CustomerHandlers) GetManyCustomer(ctx *gin.Context) {
	var query dtos.CustomerQuery

	if err := ctx.ShouldBindQuery(&query); err != nil {
		ctx.JSON(http.StatusBadRequest, dtos.GetManyCustomerRes{
			Message:   err.Error(),
			Success:   false,
			Status:    400,
			Data:      nil,
			TotalItem: 0,
			TotalPage: 0,
		})

		return
	}

	customers, totalItem, totalPage, err := h.service.GetManyCustomer(&query)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, dtos.GetManyCustomerRes{
			Message:   err.Error(),
			Success:   false,
			Status:    500,
			Data:      customers,
			TotalItem: totalItem,
			TotalPage: totalPage,
		})

		return
	}

	ctx.JSON(http.StatusOK, dtos.GetManyCustomerRes{
		Message:   "Thành công!",
		Success:   true,
		Status:    200,
		Data:      customers,
		TotalItem: totalItem,
		TotalPage: totalPage,
	})
}

// GetCustomerById godoc
// @Summary      Tìm kiếm khách hàng
// @Description  Tìm khách hàng cùng với các tin nhắn theo thời gian chỉ định
// @Tags         customers
// @Accept       json
// @Produce      json
// @Param        id    path   string  true  "Id khách hàng"
// @Param        at    path   string  true  "Ngày gửi tin"
// @Success      200     {object}  dtos.GetCustomerByIdRes "Tìm khách hàng thành công (OK)"
// @Failure      400     {object}  dtos.QueryErrItemRes "Thông tin không hợp lệ (Bad Request)"
// @Failure      404     {object}  dtos.QueryErrItemRes "Không tìm thấy khách hàng (Not Found)"
// @Failure      500     {object}  dtos.QueryErrItemRes "Lỗi server nội bộ (Internal Server Error)"
// @Router			 /api/v1/customers/{id} [get]
func (h *CustomerHandlers) GetCustomerById(ctx *gin.Context) {
	id := ctx.Param("id")
	at := ctx.Query("at")

	isAt := validator.ValidateDate(at)
	isUUID := validator.ValidateUUID(id)

	if isUUID != nil || isAt != nil {
		ctx.JSON(http.StatusBadRequest, dtos.GetCustomerByIdRes{
			Message: "Thông tin không hợp lệ!",
			Success: false,
			Status:  400,
			Data:    nil,
		})

		return
	}

	customer, status, err := h.service.GetCustomerById(id, at)

	if err != nil {
		if status == 404 {
			ctx.JSON(http.StatusNotFound, dtos.GetCustomerByIdRes{
				Message: err.Error(),
				Success: false,
				Status:  status,
				Data:    customer,
			})
		} else {
			ctx.JSON(http.StatusInternalServerError, dtos.GetCustomerByIdRes{
				Message: err.Error(),
				Success: false,
				Status:  status,
				Data:    customer,
			})
		}
	} else {
		ctx.JSON(http.StatusOK, dtos.GetCustomerByIdRes{
			Message: "Thành công!",
			Success: true,
			Status:  status,
			Data:    customer,
		})
	}
}

// CreateCustomer godoc
// @Summary      Tạo khách hàng mới
// @Description  Tạo khách hàng cùng thiết lập cho khách hàng
// @Tags         customers
// @Accept       json
// @Produce      json
// @Param        request  body      dtos.CreateCustomer  true   "Thông tin khách hàng"
// @Success      201      {object}  dtos.MutateResponse  "Tạo khách hàng thành công"
// @Failure      400      {object}  dtos.ErrorRes        "Thông tin không hợp lệ"
// @Failure      409      {object}  dtos.ErrorRes        "Số điện thoại bị trùng"
// @Failure      500      {object}  dtos.ErrorRes        "Lỗi server nội bộ"
// @Router       /api/v1/customers [post]
func (h *CustomerHandlers) CreateCustomer(ctx *gin.Context) {
	var req dtos.CreateCustomer

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, dtos.MutateResponse{
			Message: err.Error(),
			Success: false,
			Status:  400,
		})

		return
	}

	status, err := h.service.CreateCustomer(&req)

	if err != nil {
		if status == 409 {
			ctx.JSON(http.StatusConflict, dtos.MutateResponse{
				Message: err.Error(),
				Success: false,
				Status:  status,
			})
		} else {
			ctx.JSON(http.StatusInternalServerError, dtos.MutateResponse{
				Message: err.Error(),
				Success: false,
				Status:  status,
			})
		}
	} else {
		ctx.JSON(http.StatusCreated, dtos.MutateResponse{
			Message: "Tạo khách hàng thành công!",
			Success: true,
			Status:  status,
		})
	}
}

// UpdateCustomer godoc
// @Summary      Cập nhật thông tin khách hàng
// @Description  Cập nhật thông tin khách hàng cùng thiết lập cho khách hàng
// @Tags         customers
// @Accept       json
// @Produce      json
// @Param        id       path      string              true   "Id khách hàng"
// @Param        request  body      dtos.UpdateCustomer true   "Thông tin khách hàng"
// @Success      200      {object}  dtos.MutateResponse "Cập nhật thông tin khách hàng thành công"
// @Failure      400      {object}  dtos.ErrorRes       "Thông tin không hợp lệ"
// @Failure      409      {object}  dtos.ErrorRes       "Số điện thoại bị trùng"
// @Failure      500      {object}  dtos.ErrorRes       "Lỗi server nội bộ"
// @Router       /api/v1/customers/{id} [patch]
func (h *CustomerHandlers) UpdateCustomer(ctx *gin.Context) {
	var req dtos.UpdateCustomer
	id := ctx.Param("id")

	isUUIDErr := validator.ValidateUUID(id)

	err := ctx.ShouldBindJSON(&req)

	if err != nil || isUUIDErr != nil {
		ctx.JSON(http.StatusBadRequest, dtos.MutateResponse{
			Message: "Thông tin không hợp lệ!",
			Success: false,
			Status:  400,
		})

		return
	}

	status, err := h.service.UpdateCustomer(id, &req)

	if err != nil {
		if status != 404 {
			ctx.JSON(http.StatusNotFound, dtos.MutateResponse{
				Message: err.Error(),
				Success: false,
				Status:  status,
			})
		} else {
			ctx.JSON(http.StatusInternalServerError, dtos.MutateResponse{
				Message: err.Error(),
				Success: false,
				Status:  status,
			})
		}
	} else {
		ctx.JSON(http.StatusOK, dtos.MutateResponse{
			Message: "Cập nhật thông tin khách hàng thành công!",
			Success: true,
			Status:  status,
		})
	}
}

// DeleteManyCustomers godoc
// @Summary      Xóa nhiều khách hàng
// @Description  Xóa nhiều khách hàng bao gồm cấu hình của các khách hàng đó
// @Tags         customers
// @Accept       json
// @Produce      json
// @Param        request  body      dtos.DeleteManyCustomer  true   "Danh sách ID khách hàng cần xóa"
// @Success      200      {object}  dtos.MutateResponse      "Xóa khách hàng thành công"
// @Failure      400      {object}  dtos.ErrorRes            "Thông tin không hợp lệ (Mảng rỗng hoặc sai định dạng)"
// @Failure      500      {object}  dtos.ErrorRes            "Lỗi server nội bộ"
// @Router       /api/v1/customers [delete]
func (h *CustomerHandlers) DeleteManyCustomer(ctx *gin.Context) {
	var ids dtos.DeleteManyCustomer

	if err := ctx.ShouldBindJSON(&ids); err != nil {
		ctx.JSON(http.StatusBadRequest, dtos.MutateResponse{
			Message: err.Error(),
			Success: false,
			Status:  400,
		})

		return
	}

	status, err := h.service.DeleteManyCustomer(&ids)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, dtos.MutateResponse{
			Message: err.Error(),
			Success: false,
			Status:  status,
		})
	} else {
		ctx.JSON(http.StatusOK, dtos.MutateResponse{
			Message: "Xóa khách hàng thành công!",
			Success: true,
			Status:  status,
		})
	}
}

// DeleteCustomerById godoc
// @Summary      Xóa một khách hàng
// @Description  Xóa một khách hàng bao gồm cấu hình của khách hàng đó
// @Tags         customers
// @Accept       json
// @Produce      json
// @Param        id      path      string              true   "Id khách hàng cần xóa"
// @Success      200     {object}  dtos.MutateResponse "Xóa khách hàng thành công"
// @Failure      400     {object}  dtos.ErrorRes       "Thông tin ID không hợp lệ"
// @Failure      404     {object}  dtos.ErrorRes       "Không tìm thấy hoặc khách hàng không tồn tại"
// @Failure      500     {object}  dtos.ErrorRes       "Lỗi server nội bộ"
// @Router       /api/v1/customers/{id} [delete]
func (h *CustomerHandlers) DeleteCustomerById(ctx *gin.Context) {
	id := ctx.Param("id")

	err := validator.ValidateUUID(id)

	if id == "" || err != nil {
		ctx.JSON(http.StatusBadRequest, dtos.MutateResponse{
			Message: "Thông tin không hợp lệ!",
			Success: false,
			Status:  400,
		})

		return
	}

	status, err := h.service.DeleteCustomerById(id)

	if err != nil {
		if status == 404 {
			ctx.JSON(http.StatusNotFound, dtos.MutateResponse{
				Message: err.Error(),
				Success: false,
				Status:  status,
			})
		} else {
			ctx.JSON(http.StatusInternalServerError, dtos.MutateResponse{
				Message: err.Error(),
				Success: false,
				Status:  status,
			})
		}
	} else {
		ctx.JSON(http.StatusOK, dtos.MutateResponse{
			Message: "Xóa khách hàng thành công!",
			Success: true,
			Status:  status,
		})
	}
}
