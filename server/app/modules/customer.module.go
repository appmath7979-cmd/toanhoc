package modules

import (
	"server/app/handlers"
	"server/app/repositories"
	"server/app/services"
	"server/app/validator"
)

func (m *AppModule) CustomerModule() *handlers.CustomerHandler {
	repo := repositories.CustomerRepoFn(m.db)
	services := services.CustomerServiceFn(repo)
	handlers := handlers.CustomerHandlerFn(services, validator.AppValidate())

	return handlers
}
