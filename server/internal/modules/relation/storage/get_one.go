package relation_storage

import (
	"context"
	database_field_const "parishioner_management/internal/constant/database/field"
	database_model_const "parishioner_management/internal/constant/database/model"
	relation_database "parishioner_management/internal/databases/relation"
	database_util "parishioner_management/internal/utils/database"

	"go.mongodb.org/mongo-driver/bson"
)

func (mongo *mongoStore) GetRelation(
	ctx context.Context,
	filters map[string]interface{},
	withDeleted bool,
	moreKeys ...interface{},
) (*relation_database.Model, error) {
	relationCollection := database_util.GetCollection(mongo.db, database_model_const.Relation)
	filter := bson.M{}

	for key, value := range filters {
		filter[key] = value
	}

	if !withDeleted {
		filter[database_field_const.DeletedAt] = nil
	}

	var result relation_database.Model

	if err := relationCollection.FindOne(ctx, filter).Decode(&result); err != nil {
		return nil, err
	}

	return &result, nil
}
