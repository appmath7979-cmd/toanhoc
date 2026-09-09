package configs

import (
	"log"
	"server/app"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func DbConfig() {
	dsn := app.LoadEnv("DATABASE_URL")

	if dsn == "" {
		log.Fatalf("Cannot find Database Url!")
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatalf("Connect to database failed: %v", err)
	}

	DB = db
	sqlDB, err := DB.DB()

	if err != nil {
		log.Fatalf("Error: %v", err)
	}

	if err := sqlDB.Ping(); err != nil {
		log.Fatalf("Database ping failed: %v", err)
	}

	log.Printf("Connect to database successful!")
}

func DbMigrate(dst ...interface{}) {
	if DB == nil {
		log.Fatalln("Database is not defined, run `DbConfig` before!")
	}

	DB.AutoMigrate(dst...)
}
