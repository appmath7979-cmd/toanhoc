package handlers

import (
	"net/http"
	"server/app/dtos"
	"server/app/services"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type CustomerHandler struct {
	db *gorm.DB
}

func CustomerHandlers(db *gorm.DB) *CustomerHandler {
	return &CustomerHandler{
		db: db,
	}
}

// CreateCustomerHandler godoc
// @Summary      Lấy danh sách khách hàng
// @Description  Trả về danh sách khách hàng được phân trang, không đính kèm thông tin Setting của từng khách hàng
// @Tags         Customers
// @Accept       json
// @Produce      json
// @Param        page   query    int  false  "Số trang hiện tại (Mặc định: 1, Limit: 10)" default(1)
// @Param        search query    string  false  "Tìm kiếm theo tên hoặc số điện thoại (Mặc định "")" default("")
// @Param        active   query    string  false  "Chỉ xem những khách hàng đang hoạt động hoặc bị dừng hoạt động ("" | "true" | "false")" default("")
// @Param        sortBy   query    string  false  "Trường sắp xếp theo ngày khởi tạo"
// @Param        sortOrder   query    string  false  "Thứ tự sắp xếp: 'latest' (Mới nhất) hoặc 'oldest' (Cũ nhất)" enums(latest, oldest) default(desc)"

// @Success      200  {object}  dtos.CustomerListResponse "Success!"
// @Failure      500  {object}  map[string]string "Internal Server Error!"
// @Router       /api/v1/customers [get]
func (h *CustomerHandler) GetCustomerList(ctx *gin.Context) {
	page, _ := strconv.Atoi(ctx.DefaultQuery("page", "1"))
	search := strings.TrimSpace(ctx.Query("search"))
	active := ctx.DefaultQuery("active", "")
	sort := ctx.DefaultQuery("sort", "latest")

	if sort != "latest" && sort != "oldest" {
		sort = "created_at DESC"
	} else if sort == "oldest" {
		sort = "created_at ASC"
	} else {
		sort = "created_at DESC"
	}

	if page < 1 {
		page = 1
	}

	var activeFilter *bool
	if active == "true" || active == "false" {
		val, err := strconv.ParseBool(active)

		if err == nil {
			activeFilter = &val
		}
	}

	customers, totalItem, totalPage, err := services.CustomerServices(h.db).GetMany(search, page, sort, activeFilter)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, dtos.CustomerListResponse{
			Message:   "Internal Server Error!",
			Success:   false,
			Status:    500,
			Data:      nil,
			Page:      0,
			TotalItem: 0,
			TotalPage: 0,
		})
		return
	}

	ctx.JSON(http.StatusOK, dtos.CustomerListResponse{
		Message:   "Success!",
		Success:   true,
		Status:    200,
		Data:      customers,
		Page:      page,
		TotalItem: totalItem,
		TotalPage: totalPage,
	})
}

// func (h *CustomerHandler) GetCustomerList(ctx *gin.Context) {}
// func (h *CustomerHandler) GetCustomerList(ctx *gin.Context) {}
// func (h *CustomerHandler) GetCustomerList(ctx *gin.Context) {}
