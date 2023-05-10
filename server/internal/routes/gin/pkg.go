package gin_routes

import (
	"parishioner_management/internal/components"
	"path"

	"github.com/gin-gonic/gin"

	auth_transport "parishioner_management/internal/modules/auth/transport"
	parishioner_transport "parishioner_management/internal/modules/parishioner/transport"
)

const (
	authPrefix         = "auth"
	parishionersPrefix = "parishioners"
)

const (
	authLoginSuffix   = "login"
	authRefreshSuffix = "refresh"
	listSuffix        = "list"
	newSuffix         = "new"
	deleteSuffix      = "delete"
	updateSuffix      = "update"
	detailSuffix      = "detail"
)

func RegisterAllModules(g *gin.Engine, appContext components.AppContext, apiPrefix string) {
	db := appContext.GetMainMongoDBConnection()

	api := g.Group(apiPrefix)
	{

		auth := api.Group(authPrefix)
		{
			// POST /api/auth/login
			auth.POST(authLoginSuffix, auth_transport.Login(db))

			// POST /api/auth/refresh
			auth.POST(authRefreshSuffix, auth_transport.Refresh(db))
		}

		parishioner := api.Group(parishionersPrefix)
		{
			// POST /api/parishioners/list
			parishioner.GET(listSuffix, parishioner_transport.GetList(db))

			// POST /api/parishioners/new
			parishioner.POST(newSuffix, parishioner_transport.Create(db))

			// POST /api/parishioners/delete
			parishioner.POST(deleteSuffix, parishioner_transport.Delete(db))

			// POST /api/parishioners/delete/:id
			parishioner.POST(path.Join(deleteSuffix, ":id"), parishioner_transport.Delete(db))

			// POST /api/parishioners/update
			parishioner.POST(updateSuffix, parishioner_transport.Update(db))

			// GET /api/parishioners/detail/:id
			parishioner.GET(path.Join(detailSuffix, ":id"), parishioner_transport.GetDetail(db))
		}
	}
}
