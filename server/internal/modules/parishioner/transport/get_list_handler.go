package parishioner_transport

import (
	"net/http"
	"parishioner_management/internal/common"
	parishioner_business "parishioner_management/internal/modules/parishioner/business"
	parishioner_storage "parishioner_management/internal/modules/parishioner/storage"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

// @BasePath /api

// PingExample godoc
// @Summary ping example
// @Schemes
// @Description do ping
// @Tags example
// @Accept json
// @Produce json
// @Success 200 {string} HelloWorld
// @Router /parishioners/list [get]
func GetList(db *mongo.Client) func(*gin.Context) {
	return func(context *gin.Context) {
		params, err := common.ParseQueryParams(*context)

		if err != nil {
			response := common.NewFullErrorResponse(http.StatusBadRequest, nil, err.Error(), err.Error(), err.Error())
			context.JSON(response.StatusCode, response)
			return
		}

		ctx := context.Request.Context()
		store := parishioner_storage.NewMongoStore(db)
		business := parishioner_business.NewGetListBusiness(store)

		result, err := business.GetList(ctx, params)

		if err != nil {
			response := common.NewFullErrorResponse(
				http.StatusBadRequest, nil, err.Error(), err.Error(), err.Error(),
			)
			context.JSON(response.StatusCode, response)
			return
		}

		response := common.NewSuccessResponse(map[string]interface{}{
			"data":   business.ToResponse(ctx, result),
			"paging": params.Page,
		})
		context.JSON(response.StatusCode, response)
	}
}
