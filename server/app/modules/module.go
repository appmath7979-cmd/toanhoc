package modules

import "gorm.io/gorm"

type AppModule struct {
	db *gorm.DB
}

func AppModuleFn(db *gorm.DB) *AppModule {
	return &AppModule{db: db}
}
