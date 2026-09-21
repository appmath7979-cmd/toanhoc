package routes

import (
	"server/app/handlers"
	"server/configs"
)

func CustomerRoute() []RouteGroup {
	handlers := handlers.CustomerHandler(configs.DB)

	return []RouteGroup{
		{
			Prefix: "customers",
			Routes: []Route{
				{
					Path: "", Method: "GET", Handler: handlers.GetCustomer,
				},
				{
					Path: "", Method: "POST", Handler: handlers.CreateCustomer,
				},
				{
					Path: "/:id", Method: "PUT", Handler: handlers.UpdateCustomer,
				},
				{
					Path: "", Method: "DELETE", Handler: handlers.DeleteCustomer,
				},
				{
					Path: "/:id", Method: "DELETE", Handler: handlers.DeleteCustomerById,
				},
			},
		},
	}
}
