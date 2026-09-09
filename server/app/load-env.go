package app

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func LoadEnv(env string) string {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Load environment failed: %v", err)
	}

	value := os.Getenv(env)
	return value
}
