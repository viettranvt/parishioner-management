package relation_storage

import (
	"context"
	database_field_const "parishioner_management/internal/constant/database/field"
	database_model_const "parishioner_management/internal/constant/database/model"
	relation_database "parishioner_management/internal/databases/relation"
	database_util "parishioner_management/internal/utils/database"

	"go.mongodb.org/mongo-driver/bson"
)

func (mongo *mongoStore) GetRelationList(
	ctx context.Context,
	filters map[string]interface{},
	withDeleted bool,
	moreKeys ...interface{},
) ([]relation_database.Model, error) {
	relationCollection := database_util.GetCollection(mongo.db, database_model_const.Relation)
	filter := bson.M{}

	for key, value := range filters {
		filter[key] = value
	}

	if !withDeleted {
		filter[database_field_const.DeletedAt] = nil
	}

	result := make([]relation_database.Model, 0)
	cursor, err := relationCollection.Find(ctx, filter)

	if err != nil {
		return nil, err
	}

	for cursor.Next(ctx) {
		//Create a value into which the single document can be decoded
		var parishionerData relation_database.Model
		if err := cursor.Decode(&parishionerData); err != nil {
			return nil, err
		}

		result = append(result, parishionerData)
	}

	return result, nil
}
