package core

import (
	"log"
	"server/app"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Application struct {
	Route *gin.Engine
}

func NewApplication() *Application {
	var origins []string

	r := gin.Default()

	mode := app.LoadEnv("MODE")
	clients := app.LoadEnv("CLIENT_URL")

	if mode != "release" {
		origins = []string{
			"http://localhost:1420","http://tauri.localhost","https://tauri.localhost",
		}
	}

	if clients != "" {
		origins = strings.Split(clients, ",")
	}

	r.Use(RateLimiter(), cors.New(cors.Config{
		AllowOrigins:     origins,
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
