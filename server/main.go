package main

import (
	"server/app"
	"server/app/core"
	"server/configs"
)

func main() {
	port := app.LoadEnv("PORT")

	configs.DbConfig()
	configs.DbMigrate()

	app := core.NewApplication()
	app.RegistRoute("v1", core.RouteGroup{})

	app.Run(port)
}
