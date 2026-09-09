package core

import (
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Application struct {
	Route *gin.Engine
}

func NewApplication() *Application {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"https://example.com"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	return &Application{
		Route: r,
	}
}

func (a *Application) Run(port string) {
	if err := a.Route.Run(":" + port); err != nil {
		log.Fatalf("Run server failed: %v", err)
	}
}
