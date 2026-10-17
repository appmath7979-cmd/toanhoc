package modules

import (
	"server/app/handlers"
	"server/app/repositories"
	"server/app/services"
)

func (m *AppModule) MessageModule() *handlers.MessageHandler {
	repo := repositories.MessageRepoFn(m.db)
	services := services.MessageServiceFn(repo)
	handlers := handlers.MessageHandlerFn(services)

	return handlers
}
