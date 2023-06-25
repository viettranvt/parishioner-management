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
	model.FullName = *data.FullName
	model.Address = data.Address
	model.Note = data.Note
	model.Gender = *data.Gender
	model.Avatar = data.Avatar
	model.ParishName = string_util.NormalizedData(*data.ParishName, false)
	model.ChristianName = string_util.NormalizedData(*data.ChristianName, false)

	if data.DateOfBirth != nil {
		date := date_util.ConvertMillisecondToTime(*data.DateOfBirth)
		model.DateOfBirth = &date
	} else {
		model.DateOfBirth = nil
	}

	if data.DateOfDeath != nil {
		date := date_util.ConvertMillisecondToTime(*data.DateOfDeath)
		model.DateOfDeath = &date
	} else {
		model.DateOfDeath = nil
	}

	if data.DateOfWedding != nil {
		date := date_util.ConvertMillisecondToTime(*data.DateOfWedding)
		model.DateOfWedding = &date
	} else {
		model.DateOfWedding = nil
	}

	if data.DateOfBaptism != nil {
		date := date_util.ConvertMillisecondToTime(*data.DateOfBaptism)
		model.DateOfBaptism = &date
	} else {
		model.DateOfBaptism = nil
	}

	if data.DateOfFirstCommunion != nil {
		date := date_util.ConvertMillisecondToTime(*data.DateOfFirstCommunion)
		model.DateOfFirstCommunion = &date
	} else {
		model.DateOfFirstCommunion = nil
	}

	if data.DateOfConfirmation != nil {
		date := date_util.ConvertMillisecondToTime(*data.DateOfConfirmation)
		model.DateOfConfirmation = &date
	} else {
		model.DateOfConfirmation = nil
	}

	if data.DateOfOath != nil {
		date := date_util.ConvertMillisecondToTime(*data.DateOfOath)
		model.DateOfOath = &date
	} else {
		model.DateOfOath = nil
	}

	if data.DateOfHolyOrder != nil {
		date := date_util.ConvertMillisecondToTime(*data.DateOfHolyOrder)
		model.DateOfHolyOrder = &date
	} else {
		model.DateOfHolyOrder = nil
	}
}
