package relation_storage

import (
	"context"
	database_field_const "parishioner_management/internal/constant/database/field"
	database_model_const "parishioner_management/internal/constant/database/model"
	database_util "parishioner_management/internal/utils/database"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

func (mongo *mongoStore) DeleteManyRelation(
	ctx context.Context,
	filters map[string]interface{},
) (int, error) {
	condition := bson.M{}

	for key, value := range filters {
		condition[key] = value
	}

	relationCollection := database_util.GetCollection(mongo.db, database_model_const.Relation)
	result, err := relationCollection.UpdateMany(ctx, condition, bson.M{"$set": bson.M{
		database_field_const.DeletedAt: time.Now(),
	}})

	if err != nil {
		return 0, err
	}

	return int(result.ModifiedCount), nil
}
