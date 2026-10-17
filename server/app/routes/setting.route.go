package routes

import (
	"server/app/modules"

	"gorm.io/gorm"
)

func SettingRoute(db *gorm.DB) RouteGroup {
	handlers := modules.AppModuleFn(db).SettingModule()

	return RouteGroup{
		Prefix: "settings",
		Routes: []Route{
			{
				Path: "/:id", Method: "GET", Handler: handlers.GetSettingByCustomerId,
			},
		},
	}
}
