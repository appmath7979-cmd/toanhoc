package routes

import (
	"server/app/handlers"

	"gorm.io/gorm"
)

func CustomerRoute(db *gorm.DB) RouteGroup {
	handler := handlers.CustomerHandler(db)

	return RouteGroup{
		Prefix: "/customers",
		Routes: []Route{
			{
				Path: "", Method: "GET", Handler: handler.GetManyCustomer,
			},
		},
	}
}
