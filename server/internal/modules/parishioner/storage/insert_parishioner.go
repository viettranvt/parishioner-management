package parishioner_storage

import (
	"context"
	"errors"
	database_model_const "parishioner_management/internal/constant/database/model"
	parishioner_database "parishioner_management/internal/databases/parishioner"
	database_util "parishioner_management/internal/utils/database"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (mongo *mongoStore) InsertParishioner(
	ctx context.Context,
	model *parishioner_database.Model,
) (*primitive.ObjectID, error) {
	parishionerCollection := database_util.GetCollection(mongo.db, database_model_const.Parishioner)
	result, err := parishionerCollection.InsertOne(ctx, model)

	if err != nil {
		return nil, err
	}

	id, ok := result.InsertedID.(primitive.ObjectID)

	if !ok {
		return nil, errors.New("insert failed")
	}

	return &id, nil
}
