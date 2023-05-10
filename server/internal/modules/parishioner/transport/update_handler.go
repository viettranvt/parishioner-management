package parishioner_transport

import (
	"net/http"
	"parishioner_management/internal/common"
	parishioner_business "parishioner_management/internal/modules/parishioner/business"
	parishioner_model "parishioner_management/internal/modules/parishioner/model"
	parishioner_storage "parishioner_management/internal/modules/parishioner/storage"
	relation_repository "parishioner_management/internal/modules/relation/repository"
	relation_storage "parishioner_management/internal/modules/relation/storage"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func Update(db *mongo.Client) func(*gin.Context) {
	return func(context *gin.Context) {
		var inputData parishioner_model.Parishioner

		if err := context.ShouldBind(&inputData); err != nil {
			response := common.NewFullErrorResponse(http.StatusBadRequest, nil, err.Error(), err.Error(), err.Error())
			context.JSON(response.StatusCode, response)
			return
		}

		if err := inputData.ValidateWhenUpdating(); err != nil {
			response := common.NewFullErrorResponse(http.StatusBadRequest, nil, err.Error(), err.Error(), err.Error())
			context.JSON(response.StatusCode, response)
			return
		}

		ctx := context.Request.Context()
		store := parishioner_storage.NewMongoStore(db)
		business := parishioner_business.NewUpdateBusiness(store)
		parishionerId := *inputData.Id

		// session, err := db.StartSession()

		// if err != nil {
		// 	panic(err)
		// }

		// if err = session.StartTransaction(); err != nil {
		// 	panic(err)
		// }

		// // start transaction
		// if err = mongo.WithSession(ctx, session, func(sc mongo.SessionContext) error {

		// 	if err = session.CommitTransaction(sc); err != nil {
		// 		return err
		// 	}

		// 	return nil
		// }); err != nil {
		// 	panic(err)
		// }

		// //end transaction
		// session.EndSession(ctx)

		parishioner, err := business.GetParishionerById(ctx, parishionerId)

		if err != nil {
			response := common.NewFullErrorResponse(http.StatusBadRequest, nil, err.Error(), err.Error(), err.Error())
			context.JSON(response.StatusCode, response)
			return
		}

		// convert data to parishioner model
		business.ApplyUpdate(ctx, &inputData, parishioner)

		if err := business.UpdateParishioner(ctx, parishionerId, parishioner); err != nil {
			response := common.NewFullErrorResponse(http.StatusBadRequest, nil, err.Error(), err.Error(), err.Error())
			context.JSON(response.StatusCode, response)
			return
		}

		relationStore := relation_storage.NewMongoStore(db)
		relationRepository := relation_repository.NewCreateRepository(relationStore)

		relationList := relationRepository.GetRelationInfoListInParishionerInfo(ctx, parishionerId, &inputData)
		idRelationListHasBeenInsert := relationRepository.InsertRelationList(ctx, relationList)
		relationRepository.DeleteRelationNotUse(ctx, parishionerId, idRelationListHasBeenInsert)

		response := common.SimpleSuccessResponse(map[string]string{
			"message": "update parishioner successful",
		})
		context.JSON(response.StatusCode, response)
	}
}
