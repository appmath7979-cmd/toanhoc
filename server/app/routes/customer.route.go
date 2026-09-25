package routes

import (
	"server/app/handlers"
	"server/app/repositories"
	"server/app/services"

	"gorm.io/gorm"
)

func CustomerRoute(db *gorm.DB) RouteGroup {
	repositories := repositories.CustomerRepoFn(db)
	services := services.CustomerServiceFn(repositories)
	handlers := handlers.CustomerHandlerFn(services)

	return RouteGroup{
		Prefix: "customers",
		Routes: []Route{
			{
				Path: "", Method: "GET", Handler: handlers.GetManyCustomer,
			},
		},
	}
}
