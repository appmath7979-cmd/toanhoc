package routes

import (
	"server/app/handlers"
	"server/app/services"

	"gorm.io/gorm"
)

func CustomerRoute(db *gorm.DB) RouteGroup {
	service := services.CustomerService(db)
	handler := handlers.CustomerHandler(service)

	return RouteGroup{
		Prefix: "/customers",
		Routes: []Route{
			{
				Path: "", Method: "GET", Handler: handler.GetManyCustomer,
			},
			{
				Path: "", Method: "POST", Handler: handler.CreateCustomer,
			},
			{
				Path: "/:id", Method: "PATCH", Handler: handler.UpdateCustomer,
			},
			{
				Path: "", Method: "DELETE", Handler: handler.DeleteManyCustomer,
			},
			{
				Path: "/:id", Method: "DELETE", Handler: handler.DeleteCustomerById,
			},
		},
	}
}
