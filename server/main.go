package main

import (
	"server/app"
	"server/app/core"
	"server/app/handlers"
	"server/app/models"
	"server/configs"

	_ "server/docs"

	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title           Toanhoc Backend API
// @version         1.0
// @description     API documentation for Toanhoc backend used by Tauri app.
// @host            localhost:8080
// @BasePath        /api/v1
func main() {
	port := app.LoadEnv("PORT")

	configs.DbConfig()
	configs.DbMigrate(&models.Customer{}, &models.Setting{})

	app := core.NewApplication()

	r := app.Route
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	app.RegistRoute("v1", []core.RouteGroup{
		{Prefix: "customers", Routes: []core.Route{{Path: "", Method: "GET", Handler: handlers.CustomerHandlers(configs.DB).GetCustomerList}}},
	})

	app.Run(port)
}
