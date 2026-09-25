package routes

import (
	"server/configs"

	"github.com/gin-gonic/gin"
)

type Method string

const (
	MethodGET    Method = "GET"
	MethodPOST   Method = "POST"
	MethodPUT    Method = "PUT"
	MethodPATCH  Method = "PATCH"
	MethodDELETE Method = "DELETE"
)

type Route struct {
	Path    string
	Method  Method
	Handler gin.HandlerFunc
}

type RouteGroup struct {
	Prefix string
	Routes []Route
}

func AppRouter() []RouteGroup {
	var allGroup []RouteGroup
	db := configs.DB

	allGroup = append(allGroup, CustomerRoute(db))

	return []RouteGroup{}
}
