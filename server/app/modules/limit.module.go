package modules

import (
	"server/app/handlers"
	"server/app/repositories"
	"server/app/services"
	"server/app/validator"
)

func (m *AppModule) LimitModule() *handlers.LimitHandler {
	repo := repositories.LimitRepoFn(m.db)
	services := services.LimitServiceFn(repo)
	handlers := handlers.LimitHandlerFn(services, validator.AppValidate())

	return &handlers
}
