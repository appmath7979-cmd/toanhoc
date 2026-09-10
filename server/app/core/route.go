package core

import "github.com/gin-gonic/gin"

type MethodType string

const (
	GET    MethodType = "GET"
	POST   MethodType = "POST"
	PUT    MethodType = "PUT"
	PATCH  MethodType = "PATCH"
	DELETE MethodType = "DELETE"
)

type Route struct {
	Path    string
	Method  MethodType
	Handler gin.HandlerFunc
}

type RouteGroup struct {
	Prefix string
	Routes []Route
}

func (a *Application) RegistRoute(ver string, groups []RouteGroup) {
	var currVer string

	if ver == "" {
		currVer = "v1"
	} else {
		currVer = ver
	}

	api := a.Route.Group("api/" + currVer)

	for _, g := range groups {
		group := api.Group(g.Prefix)

		for _, r := range g.Routes {
			group.Handle(string(r.Method), r.Path, r.Handler)
		}
	}
}
