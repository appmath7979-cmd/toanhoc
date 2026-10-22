package main

import (
	"server/app"
	"server/app/common"
	"server/app/models"
	"server/app/routes"
	"server/configs"

	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func main() {
	port := app.LoadEnv("PORT")

	configs.DbConfig()
	configs.DbMigrate(
		&models.Customer{},
		&models.Setting{},
		&models.Message{},
		&models.MessageDetail{},
	)

	app := common.NewApplication()

	r := app.Route
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	app.RegistRoute("v1", routes.AppRouter())

	app.Run(port)
}
