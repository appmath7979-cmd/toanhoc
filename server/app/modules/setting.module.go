package modules

import (
	"server/app/handlers"
	"server/app/repositories"
	"server/app/services"
	"server/app/validator"
)

func (m *AppModule) SettingModule() *handlers.SettingHandler {
	repo := repositories.SettingRepoFn(m.db)
	services := services.SettingServiceFn(repo)
	return handlers.SettingHandlerFn(services, validator.AppValidate())
}
