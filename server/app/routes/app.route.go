package routes

import (
	"github.com/gin-gonic/gin"
)

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

func AppRoutes() []RouteGroup {
	var allRouteGroups []RouteGroup

	allRouteGroups = append(allRouteGroups, CustomerRoute()...)

	return allRouteGroups
}
