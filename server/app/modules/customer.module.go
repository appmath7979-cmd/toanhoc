package modules

import (
	"server/app/handlers"
	"server/app/repositories"
	"server/app/services"
)

func (m *AppModule) CustomerModule() *handlers.CustomerHandler {
	repo := repositories.CustomerRepoFn(m.db)
	services := services.CustomerServiceFn(repo)
	handlers := handlers.CustomerHandlerFn(services)

	return handlers
}
