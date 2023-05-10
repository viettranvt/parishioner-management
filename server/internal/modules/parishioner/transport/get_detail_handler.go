package parishioner_transport

import (
	"net/http"
	"parishioner_management/internal/common"
	parishioner_business "parishioner_management/internal/modules/parishioner/business"
	parishioner_storage "parishioner_management/internal/modules/parishioner/storage"
	relation_storage "parishioner_management/internal/modules/relation/storage"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetDetail(db *mongo.Client) func(*gin.Context) {
	return func(context *gin.Context) {
		//parse id param
		id := context.Param("id")
		objID, err := primitive.ObjectIDFromHex(id)

		if err != nil {
			response := common.NewFullErrorResponse(http.StatusBadRequest, nil, err.Error(), "invalid id", err.Error())
			context.JSON(response.StatusCode, response)
			return
		}

		ctx := context.Request.Context()
		store := parishioner_storage.NewMongoStore(db)
		relationStore := relation_storage.NewMongoStore(db)
		business := parishioner_business.NewGetDetailBusiness(store, relationStore)

		result, err := business.GetDetail(ctx, objID)

		if err != nil {
			response := common.NewFullErrorResponse(
				http.StatusBadRequest, nil, err.Error(), err.Error(), err.Error(),
			)
			context.JSON(response.StatusCode, response)
			return
		}

		response := common.NewSuccessResponse(business.ToResponse(ctx, *result))
		context.JSON(response.StatusCode, response)
	}
}
