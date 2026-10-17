package routes

import (
	"server/app/modules"

	"gorm.io/gorm"
)

func MessageRoute(db *gorm.DB) RouteGroup {
	handlers := modules.AppModuleFn(db).MessageModule()

	return RouteGroup{
		Prefix: "messages",
		Routes: []Route{
			{
				Path: "", Method: "POST", Handler: handlers.CreateMessage,
			},
		},
	}
}
