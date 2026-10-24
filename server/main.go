package main

import (
	"server/app"
	"server/app/common"
	"server/app/models"
	"server/app/routes"
	"server/configs"
)

func main() {
	port := app.LoadEnv("PORT")

	configs.DbConfig()
	configs.DbMigrate(
		&models.Customer{},
		&models.Setting{},
		&models.Message{},
		&models.MessageDetail{},
		&models.CustomerLimit{},
	)

	app := common.NewApplication()

	app.RegistRoute("v1", routes.AppRouter())

	app.Run(port)
}
