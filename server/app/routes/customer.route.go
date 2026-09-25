package routes

import (
	"server/app/modules"

	"gorm.io/gorm"
)

func CustomerRoute(db *gorm.DB) RouteGroup {
	handlers := modules.AppModuleFn(db).CustomerModule()

	return RouteGroup{
		Prefix: "customers",
		Routes: []Route{
			{
				Path: "", Method: "GET", Handler: handlers.GetManyCustomer,
			},
		},
	}
}
