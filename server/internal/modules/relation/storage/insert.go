package relation_storage

import (
	"context"
	"errors"
	database_model_const "parishioner_management/internal/constant/database/model"
	relation_database "parishioner_management/internal/databases/relation"
	database_util "parishioner_management/internal/utils/database"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (mongo *mongoStore) InsertRelation(
	ctx context.Context,
	model *relation_database.Model,
) (*primitive.ObjectID, error) {
	relationCollection := database_util.GetCollection(mongo.db, database_model_const.Relation)
	result, err := relationCollection.InsertOne(ctx, model)

	if err != nil {
		return nil, err
	}

	objectID, ok := result.InsertedID.(primitive.ObjectID)

	if !ok {
		return nil, errors.New("insert failed")
	}

	return &objectID, nil
}
