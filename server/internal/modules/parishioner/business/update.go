package parishioner_business

import (
	"context"
	database_field_const "parishioner_management/internal/constant/database/field"
	parishioner_database "parishioner_management/internal/databases/parishioner"
	parishioner_model "parishioner_management/internal/modules/parishioner/model"
	database_util "parishioner_management/internal/utils/database"
	date_util "parishioner_management/internal/utils/date"
	string_util "parishioner_management/internal/utils/string"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UpdateStorage interface {
	UpdateParishioner(
		ctx context.Context,
		id primitive.ObjectID,
		dataUpdate map[string]interface{},
	) error

	GetParishioner(
		ctx context.Context,
		filters map[string]interface{},
		withDeleted bool,
		moreKeys ...interface{},
	) (*parishioner_database.Model, error)
}

type updateBusiness struct {
	store UpdateStorage
}

func NewUpdateBusiness(store UpdateStorage) *updateBusiness {
	return &updateBusiness{store: store}
}

func (biz *updateBusiness) GetParishionerById(ctx context.Context, id primitive.ObjectID) (*parishioner_database.Model, error) {
	condition := map[string]interface{}{
		database_field_const.ID: id,
	}
	return biz.store.GetParishioner(ctx, condition, false, nil)
}

func (biz *updateBusiness) UpdateParishioner(
	ctx context.Context,
	id primitive.ObjectID,
	dataUpdate *parishioner_database.Model,
) error {
	mapData := database_util.NormalizeDataBeforeUpdating(*dataUpdate)
	return biz.store.UpdateParishioner(ctx, id, mapData)
}

// this func will convert input data to parishioner model
func (biz *updateBusiness) ApplyUpdate(ctx context.Context, data *parishioner_model.Parishioner, model *parishioner_database.Model) {
	if data.FullName != nil {
		model.FullName = *data.FullName
	}

	if data.Address != nil {
		model.Address = data.Address
	}

	if data.Note != nil {
		model.Note = data.Note
	}

	if data.Gender != nil {
		model.Gender = *data.Gender
	}

	if data.Avatar != nil {
		model.Avatar = data.Avatar
	}

	if data.ParishName != nil {
		model.ParishName = string_util.NormalizedData(*data.ParishName, false)
	}

	if data.ChristianName != nil {
		model.ChristianName = string_util.NormalizedData(*data.ChristianName, false)
	}

	if data.DateOfBirth != nil {
		date := date_util.ConvertMillisecondToTime(*data.DateOfBirth)
		model.DateOfBirth = &date
	}

	if data.DateOfDeath != nil {
		date := date_util.ConvertMillisecondToTime(*data.DateOfDeath)
		model.DateOfDeath = &date
	}

	if data.DateOfWedding != nil {
		date := date_util.ConvertMillisecondToTime(*data.DateOfWedding)
		model.DateOfWedding = &date
	}

	if data.DateOfBaptism != nil {
		date := date_util.ConvertMillisecondToTime(*data.DateOfBaptism)
		model.DateOfBaptism = &date
	}

	if data.DateOfFirstCommunion != nil {
		date := date_util.ConvertMillisecondToTime(*data.DateOfFirstCommunion)
		model.DateOfFirstCommunion = &date
	}

	if data.DateOfConfirmation != nil {
		date := date_util.ConvertMillisecondToTime(*data.DateOfConfirmation)
		model.DateOfConfirmation = &date
	}

	if data.DateOfOath != nil {
		date := date_util.ConvertMillisecondToTime(*data.DateOfOath)
		model.DateOfOath = &date
	}

	if data.DateOfHolyOrder != nil {
		date := date_util.ConvertMillisecondToTime(*data.DateOfHolyOrder)
		model.DateOfHolyOrder = &date
	}
}
