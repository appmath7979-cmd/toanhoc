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
				Path: "", Method: "GET", Handler: handlers.GetManyMessage,
			},
			{
				Path: "/:id", Method: "GET", Handler: handlers.GetMessageById,
			},
			{
				Path: "", Method: "POST", Handler: handlers.CreateMessage,
			},
			{
				Path: "/:id", Method: "PUT", Handler: handlers.UpdateMessage,
			},
			{
				Path: "/:id", Method: "DELETE", Handler: handlers.DeletMessage,
			},
		},
	}
}
