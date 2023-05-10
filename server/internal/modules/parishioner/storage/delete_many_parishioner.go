package parishioner_storage

import (
	"context"
	database_field_const "parishioner_management/internal/constant/database/field"
	database_model_const "parishioner_management/internal/constant/database/model"
	database_util "parishioner_management/internal/utils/database"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

func (mongo *mongoStore) DeleteManyParishioner(
	ctx context.Context,
	filters map[string]interface{},
) (int, error) {
	condition := bson.M{}

	for key, value := range filters {
		condition[key] = value
	}

	parishionerCollection := database_util.GetCollection(mongo.db, database_model_const.Parishioner)
	result, err := parishionerCollection.UpdateMany(ctx, condition, bson.M{"$set": bson.M{
		database_field_const.DeletedAt: time.Now(),
	}})

	if err != nil {
		return 0, err
	}

	return int(result.ModifiedCount), nil
}
