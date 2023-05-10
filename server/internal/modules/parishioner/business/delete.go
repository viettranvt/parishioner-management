package parishioner_business

import (
	"context"
	"errors"
	database_field_const "parishioner_management/internal/constant/database/field"
	parishioner_database "parishioner_management/internal/databases/parishioner"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type DeleteStorage interface {
	DeleteManyParishioner(
		ctx context.Context,
		filters map[string]interface{},
	) (int, error)

	GetParishioner(
		ctx context.Context,
		filters map[string]interface{},
		withDeleted bool,
		moreKeys ...interface{},
	) (*parishioner_database.Model, error)
}

type deleteBusiness struct {
	store DeleteStorage
}

func NewDeleteBusiness(store DeleteStorage) *deleteBusiness {
	return &deleteBusiness{store: store}
}

// TODO improve performance
func (buz *deleteBusiness) Validate(ctx context.Context, ids []primitive.ObjectID) error {
	for _, id := range ids {
		filter := map[string]interface{}{
			database_field_const.ID: id,
		}
		if _, err := buz.store.GetParishioner(ctx, filter, false); err != nil {
			return errors.New("parishioner not found")
		}
	}

	return nil
}

func (buz *deleteBusiness) Delete(ctx context.Context, ids []primitive.ObjectID) (int, error) {
	filter := map[string]interface{}{
		database_field_const.ID: map[string]interface{}{
			"$in": ids,
		},
	}

	count, err := buz.store.DeleteManyParishioner(ctx, filter)

	if err != nil {
		return 0, err
	}

	return count, nil
}
