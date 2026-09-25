package routes

import (
	"server/app/handlers"
	"server/app/services"
	"server/app/validator"

	"gorm.io/gorm"
)

func MessageRoute(db *gorm.DB) RouteGroup {
	service := services.MessageService(db)
	handler := handlers.MessageHandler(service, validator.AppValidator{})

	return RouteGroup{
		Prefix: "messages",
		Routes: []Route{
			{
				Path: "", Method: "GET", Handler: handler.GetManyMessage, 
			},
		},
	}
}
