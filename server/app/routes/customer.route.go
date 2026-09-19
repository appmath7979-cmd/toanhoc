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
					Path: "", Method: "GET", Handler: handlers.GetCustomers,
				},
				{
					Path: "", Method: "POST", Handler: handlers.CreateCustomer,
				},
				{
					Path: "", Method: "DELETE", Handler: handlers.DeleteCustomers,
				},
			},
		},
	}
}
