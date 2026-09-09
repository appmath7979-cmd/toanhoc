package main

import (
	"server/app"
	"server/app/core"
	"server/configs"

	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	_ "server/docs"
)

// @title           Toanhoc Backend API
// @version         1.0
// @description     API documentation for Toanhoc backend used by Tauri app.
// @host            localhost:8080
// @BasePath        /api/v1
func main() {
	port := app.LoadEnv("PORT")

	configs.DbConfig()
	configs.DbMigrate()

	app := core.NewApplication()

	r := app.Route
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	app.RegistRoute("v1", core.RouteGroup{})

	app.Run(port)
}
