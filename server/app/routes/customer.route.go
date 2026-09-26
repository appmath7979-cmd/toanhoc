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
			{
				Path: "/:id/:at", Method: "GET", Handler: handlers.GetCustomerAndMessageById,
			},
			{
				Path: "", Method: "POST", Handler: handlers.CreateCustomer,
			},
			{
				Path: "/:id", Method: "PATCH", Handler: handlers.UpdateCustomer,
			},
			{
				Path: "/:id", Method: "DELETE", Handler: handlers.DeleteCustomerById,
			},
		},
	}
}
