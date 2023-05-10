package relation_repository

import (
	"context"
	database_field_const "parishioner_management/internal/constant/database/field"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type DeleteStorage interface {
	DeleteManyRelation(
		ctx context.Context,
		filters map[string]interface{},
	) (int, error)
}

type deleteRepository struct {
	store DeleteStorage
}

func NewDeleteRepository(store DeleteStorage) *deleteRepository {
	return &deleteRepository{store: store}
}

func (repo *deleteRepository) Delete(ctx context.Context, parishionerIDs []primitive.ObjectID) error {
	filter := map[string]interface{}{
		"$or": []interface{}{
			map[string]interface{}{
				database_field_const.ParishionerID: map[string]interface{}{
					"$in": parishionerIDs,
				},
			},
			map[string]interface{}{
				database_field_const.DependentsID: map[string]interface{}{
					"$in": parishionerIDs,
				},
			},
		},
	}

	_, err := repo.store.DeleteManyRelation(ctx, filter)
	return err
}
