package parishioner_transport

import (
	"net/http"
	"parishioner_management/internal/common"
	parishioner_business "parishioner_management/internal/modules/parishioner/business"
	parishioner_model "parishioner_management/internal/modules/parishioner/model"
	parishioner_storage "parishioner_management/internal/modules/parishioner/storage"
	relation_repository "parishioner_management/internal/modules/relation/repository"
	relation_storage "parishioner_management/internal/modules/relation/storage"
	database_util "parishioner_management/internal/utils/database"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func Delete(db *mongo.Client) func(*gin.Context) {
	return func(context *gin.Context) {
		ids := common.BindIds(*context)

		if len(ids) < 1 {
			response := common.NewFullErrorResponse(
				http.StatusBadRequest, nil,
				parishioner_model.ErrInvalidId.Error(),
				parishioner_model.ErrInvalidId.Error(),
				parishioner_model.ErrInvalidId.Error(),
			)
			context.JSON(response.StatusCode, response)
			return
		}

		objectIDs, err := database_util.ConvertIDStringListToObjectIDList(ids)

		if err != nil {
			panic(err)
		}

		ctx := context.Request.Context()
		store := parishioner_storage.NewMongoStore(db)
		business := parishioner_business.NewDeleteBusiness(store)

		if err := business.Validate(ctx, objectIDs); err != nil {
			response := common.NewFullErrorResponse(
				http.StatusBadRequest, nil,
				err.Error(),
				err.Error(),
				err.Error(),
			)
			context.JSON(response.StatusCode, response)
			return
		}

		count, err := business.Delete(ctx, objectIDs)

		if err != nil {
			panic(err)
		}

		// remove relation of parishioner
		relationStore := relation_storage.NewMongoStore(db)
		relationRepository := relation_repository.NewDeleteRepository(relationStore)

		if err := relationRepository.Delete(context, objectIDs); err != nil {
			panic(err)
		}

		response := common.SimpleSuccessResponse(map[string]interface{}{
			"total_count": count,
		})

		context.JSON(response.StatusCode, response)
	}
}
