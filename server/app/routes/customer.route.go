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
		},
	}
}
