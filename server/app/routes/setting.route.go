package routes

import (
	"server/app/handlers"
	"server/configs"
)

func SettingRoute() []RouteGroup {
	handlers := handlers.SettingHandler(configs.DB)

	return []RouteGroup{
		{
			Prefix: "settings",
			Routes: []Route{
				{
					Path: "/:id", Method: "GET", Handler: handlers.GetSettingById,
				},
			},
		},
	}
}
