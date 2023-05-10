package parishioner_business

import (
	"context"
	database_field_const "parishioner_management/internal/constant/database/field"
	relationship_const "parishioner_management/internal/constant/relationship"
	parishioner_database "parishioner_management/internal/databases/parishioner"
	relation_database "parishioner_management/internal/databases/relation"
	parishioner_model "parishioner_management/internal/modules/parishioner/model"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type GetDetailStorage interface {
	GetParishioner(
		ctx context.Context,
		filters map[string]interface{},
		withDeleted bool,
		moreKeys ...interface{},
	) (*parishioner_database.Model, error)
}

type RelationStorage interface {
	GetRelation(
		ctx context.Context,
		filters map[string]interface{},
		withDeleted bool,
		moreKeys ...interface{},
	) (*relation_database.Model, error)

	GetRelationList(
		ctx context.Context,
		filters map[string]interface{},
		withDeleted bool,
		moreKeys ...interface{},
	) ([]relation_database.Model, error)
}

type getDetailBusiness struct {
	relationStorage RelationStorage
	store           GetDetailStorage
}

func NewGetDetailBusiness(store GetDetailStorage, relationStorage RelationStorage) *getDetailBusiness {
	return &getDetailBusiness{store: store, relationStorage: relationStorage}
}

// this func will get list of parishioner has pagination
func (biz *getDetailBusiness) GetDetail(ctx context.Context, id primitive.ObjectID) (*parishioner_database.Model, error) {
	condition := map[string]interface{}{
		database_field_const.ID: id,
	}
	return biz.store.GetParishioner(ctx, condition, false)
}

func (biz *getDetailBusiness) ToResponse(
	ctx context.Context, parishioner parishioner_database.Model,
) parishioner_model.ParishionerDetailResponse {
	result := parishioner_model.ParishionerDetailResponse{
		ID:                   parishioner.ID,
		CreatedAt:            parishioner.CreatedAt,
		UpdatedAt:            parishioner.UpdatedAt,
		DateOfBirth:          parishioner.DateOfBirth,          // ngay sinh
		DateOfDeath:          parishioner.DateOfDeath,          // ngay mat
		DateOfWedding:        parishioner.DateOfWedding,        // ngay cuoi
		DateOfBaptism:        parishioner.DateOfBaptism,        // ngay rua toi
		DateOfFirstCommunion: parishioner.DateOfFirstCommunion, // ngay ruoc le lan dau
		DateOfConfirmation:   parishioner.DateOfConfirmation,   // ngay them suc
		DateOfOath:           parishioner.DateOfOath,           // ngay tuyen hua bao dong
		DateOfHolyOrder:      parishioner.DateOfHolyOrder,      // ngay truyen chuc thanh
		ParishName:           parishioner.ParishName,           // ten giao ho
		ChristianName:        parishioner.ChristianName,        // ten thanh
		Avatar:               parishioner.Avatar,               // hinh anh
		FullName:             parishioner.FullName,
		Note:                 parishioner.Note,
		Gender:               parishioner.Gender,
		Address:              parishioner.Address,
		Father:               nil,
		Mother:               nil,
		WifeOrHusband:        nil,
		Guarantor:            nil,
		Childs:               []parishioner_model.ParishionerListResponse{},
	}

	biz.LoadRelation(ctx, parishioner.ID, &result)

	return result
}

func (biz *getDetailBusiness) LoadRelation(
	ctx context.Context, parishionerID primitive.ObjectID, response *parishioner_model.ParishionerDetailResponse,
) {
	filter := map[string]interface{}{
		database_field_const.ParishionerID: parishionerID,
	}
	relationList, err := biz.relationStorage.GetRelationList(ctx, filter, false)

	if err != nil {
		panic(err)
	}

	for _, value := range relationList {
		condition := map[string]interface{}{
			database_field_const.ID: value.DependentsID,
		}

		parishioner, err := biz.store.GetParishioner(ctx, condition, false)

		if err != nil {
			panic(err)
		}

		basicResponse := &parishioner_model.ParishionerListResponse{
			ID:            parishioner.ID,
			FullName:      parishioner.FullName,
			DateOfBirth:   parishioner.DateOfBirth,
			ParishName:    parishioner.ParishName,
			ChristianName: parishioner.ChristianName,
			Gender:        parishioner.Gender,
		}

		childListResponse := make([]parishioner_model.ParishionerListResponse, 0)

		switch value.Relationship {
		case relationship_const.Father:
			response.Father = basicResponse
		case relationship_const.Mother:
			response.Mother = basicResponse
		case relationship_const.HusbandOrWife:
			response.WifeOrHusband = basicResponse
		case relationship_const.Guarantor:
			response.Guarantor = basicResponse
		case relationship_const.Child:
			childListResponse = append(childListResponse, *basicResponse)
		}

		response.Childs = childListResponse
	}
}
