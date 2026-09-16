package core

import "server/app/routes"

func (a *Application) RegistRoute(ver string, groups []routes.RouteGroup) {
	var currentVer string

	if ver == "" {
		currentVer = "v1"
	} else {
		currentVer = ver
	}

	api := a.Route.Group("api/" + currentVer)

	for _, g := range groups {
		group := api.Group(g.Prefix)

		for _, r := range g.Routes {
			group.Handle(string(r.Method), r.Path, r.Handler)
		}
	}
}
