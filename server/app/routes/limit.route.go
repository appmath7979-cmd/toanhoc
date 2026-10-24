package routes

import (
	"server/app/modules"

	"gorm.io/gorm"
)

func LimitRoute(db *gorm.DB) RouteGroup {
	handlers := modules.AppModuleFn(db).LimitModule()

	return RouteGroup{
		Prefix: "/limits",
		Routes: []Route{
			{Path: "/customer/:id", Method: "GET", Handler: handlers.GetCustomerLimit},
			{Path: "/customer", Method: "POST", Handler: handlers.CreateCustomerLimit},
		},
	}
}
