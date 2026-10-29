package routes

import (
	"server/app/modules"

	"gorm.io/gorm"
)

func RewardRoute(db *gorm.DB) RouteGroup {
	handlers := modules.AppModuleFn(db).RewardModule()

	return RouteGroup{
		Prefix: "rewards",
		Routes: []Route{
			{
				Path: "", Method: "GET", Handler: handlers.GetReward,
			},
			{
				Path: "", Method: "POST", Handler: handlers.CreateReward,
			},
		},
	}
}
