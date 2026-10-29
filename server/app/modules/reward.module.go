package modules

import (
	"server/app/handlers"
	"server/app/repositories"
	"server/app/services"
	"server/app/validator"
)

func (m *AppModule) RewardModule() *handlers.RewardHandler {
	repo := repositories.RewardRepoFn(m.db)
	services := services.RewardServiceFn(repo)
	handlers := handlers.RewardHandlerFn(services, validator.AppValidate())
	return handlers
}
