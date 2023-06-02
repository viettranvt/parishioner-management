package relation_repository

import (
	"context"
	"errors"
	database_const "parishioner_management/internal/constant/database"
	database_field_const "parishioner_management/internal/constant/database/field"
	relationship_const "parishioner_management/internal/constant/relationship"
	relation_database "parishioner_management/internal/databases/relation"
	parishioner_model "parishioner_management/internal/modules/parishioner/model"
	relation_model "parishioner_management/internal/modules/relation/model"

	"github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type RelationStorage interface {
	InsertRelation(
		ctx context.Context,
		model *relation_database.Model,
	) (*primitive.ObjectID, error)

	GetRelation(
		ctx context.Context,
		filters map[string]interface{},
		withDeleted bool,
		moreKeys ...interface{},
	) (*relation_database.Model, error)

	DeleteManyRelation(
		ctx context.Context,
		filters map[string]interface{},
	) (int, error)
}

type createRepository struct {
	store RelationStorage
}

func NewCreateRepository(store RelationStorage) *createRepository {
	return &createRepository{store: store}
}

func (repo *createRepository) GetRelationInfoListInParishionerInfo(ctx context.Context, currentParishionerID primitive.ObjectID, parishionerInfo *parishioner_model.Parishioner) []*relation_model.RelationCreation {
	relationInfoList := make([]*relation_model.RelationCreation, 0)

	if parishionerInfo.FatherID != nil {
		// relation of father
		relationInfoList = append(relationInfoList, &relation_model.RelationCreation{
			ParishionerID: currentParishionerID,
			DependentsID:  *parishionerInfo.FatherID,
			Type:          relationship_const.Father,
		})

		// if other parishioner is father => current parishioner is child of this other parishioner
		relationInfoList = append(relationInfoList, &relation_model.RelationCreation{
			ParishionerID: *parishionerInfo.FatherID,
			DependentsID:  currentParishionerID,
			Type:          relationship_const.Child,
		})
	}

	if parishionerInfo.MotherID != nil {
		// relation of mother
		relationInfoList = append(relationInfoList, &relation_model.RelationCreation{
			ParishionerID: currentParishionerID,
			DependentsID:  *parishionerInfo.MotherID,
			Type:          relationship_const.Mother,
		})

		// if other parishioner is mother => current parishioner is child of this other parishioner
		relationInfoList = append(relationInfoList, &relation_model.RelationCreation{
			ParishionerID: *parishionerInfo.MotherID,
			DependentsID:  currentParishionerID,
			Type:          relationship_const.Child,
		})
	}

	if parishionerInfo.GuarantorID != nil {
		// relation of guarantor
		relationInfoList = append(relationInfoList, &relation_model.RelationCreation{
			ParishionerID: currentParishionerID,
			DependentsID:  *parishionerInfo.GuarantorID,
			Type:          relationship_const.Guarantor,
		})

		// if other parishioner is guarantor => current parishioner is child of guarantor of this other parishioner
		relationInfoList = append(relationInfoList, &relation_model.RelationCreation{
			ParishionerID: *parishionerInfo.GuarantorID,
			DependentsID:  currentParishionerID,
			Type:          relationship_const.ChildOfGuarantor,
		})
	}

	if parishionerInfo.WifeOrHusbandID != nil {
		// relation of wife or husband
		relationInfoList = append(relationInfoList, &relation_model.RelationCreation{
			ParishionerID: currentParishionerID,
			DependentsID:  *parishionerInfo.WifeOrHusbandID,
			Type:          relationship_const.HusbandOrWife,
		})

		// if other parishioner is husband of wife => current parishioner is wife or husband of this other parishioner
		relationInfoList = append(relationInfoList, &relation_model.RelationCreation{
			ParishionerID: *parishionerInfo.WifeOrHusbandID,
			DependentsID:  currentParishionerID,
			Type:          relationship_const.HusbandOrWife,
		})
	}

	if parishionerInfo.ChildIDs != nil {
		for _, childID := range parishionerInfo.ChildIDs {
			// // relation of child
			relationInfoList = append(relationInfoList, &relation_model.RelationCreation{
				ParishionerID: currentParishionerID,
				DependentsID:  childID,
				Type:          relationship_const.Child,
			})

			// if gender of current parishioner has male => current parishioner mother of this other parishioner
			if *parishionerInfo.Gender == database_const.Male {
				relationInfoList = append(relationInfoList, &relation_model.RelationCreation{
					ParishionerID: childID,
					DependentsID:  currentParishionerID,
					Type:          relationship_const.Mother,
				})
			}

			// if gender of current parishioner has female => current parishioner mother of this other parishioner
			if *parishionerInfo.Gender == database_const.Female {
				relationInfoList = append(relationInfoList, &relation_model.RelationCreation{
					ParishionerID: childID,
					DependentsID:  currentParishionerID,
					Type:          relationship_const.Father,
				})
			}
		}
	}

	return relationInfoList
}

func (repo *createRepository) InsertRelationList(ctx context.Context, relationList []*relation_model.RelationCreation) []primitive.ObjectID {
	idList := make([]primitive.ObjectID, 0, len(relationList))

	for _, relation := range relationList {
		id := repo.insertRelation(ctx, relation)
		idList = append(idList, id)
	}

	return idList
}

func (repo *createRepository) insertRelation(ctx context.Context, relation *relation_model.RelationCreation) primitive.ObjectID {
	filters := map[string]interface{}{
		database_field_const.ParishionerID: relation.ParishionerID,
		database_field_const.DependentsID:  relation.DependentsID,
		database_field_const.RelationShip:  relation.Type,
	}

	result, err := repo.store.GetRelation(ctx, filters, false)

	if err != nil {
		if err != mongo.ErrNoDocuments {
			panic(errors.New(err.Error()))
		}
	}

	if result != nil {
		logrus.Info("relation has exists")
		logrus.Info(result.ID)
		return result.ID
	}

	model := &relation_database.Model{
		ParishionerID: relation.ParishionerID,
		DependentsID:  relation.DependentsID,
		Relationship:  relation.Type,
	}

	id, err := repo.store.InsertRelation(ctx, model)

	if err != nil {
		panic(errors.New(err.Error()))
	}

	return *id
}

func (repo *createRepository) DeleteRelationNotUse(ctx context.Context, parishionerID primitive.ObjectID, relationIDList []primitive.ObjectID) error {
	filter := map[string]interface{}{
		"$or": []interface{}{
			map[string]interface{}{
				database_field_const.ID: map[string]interface{}{
					"$nin": relationIDList,
				},
				database_field_const.ParishionerID: parishionerID,
			},
			map[string]interface{}{
				database_field_const.ID: map[string]interface{}{
					"$nin": relationIDList,
				},
				database_field_const.DependentsID: parishionerID,
			},
		},
	}

	_, err := repo.store.DeleteManyRelation(ctx, filter)
	return err
}
