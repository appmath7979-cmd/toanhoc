package routes

import (
	"server/app/handlers"
	"server/app/services"

	"gorm.io/gorm"
)

func SettingRoute(db *gorm.DB) RouteGroup {
	service := services.SettingService(db)
	handler := handlers.SettingHandler(service)

	return RouteGroup{
		Prefix: "/settings",
		Routes: []Route{
			{
				Path: "/:id", Method: "GET", Handler: handler.GetSettingByCustomerId,
			},
		},
	}
}
