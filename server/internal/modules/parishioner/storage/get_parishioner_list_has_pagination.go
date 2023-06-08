package parishioner_storage

import (
	"context"
	"parishioner_management/internal/common"
	database_field_const "parishioner_management/internal/constant/database/field"
	database_model_const "parishioner_management/internal/constant/database/model"
	database_operator_const "parishioner_management/internal/constant/database/operator"
	parishioner_database "parishioner_management/internal/databases/parishioner"
	database_util "parishioner_management/internal/utils/database"
	date_util "parishioner_management/internal/utils/date"
	"strconv"
	"strings"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func (mongo *mongoStore) GetParishionerListHasPagination(
	ctx context.Context,
	params *common.Param,
	withDeleted bool,
	moreKeys ...interface{},
) ([]parishioner_database.Model, error) {
	parishionerCollection := database_util.GetCollection(mongo.db, database_model_const.Parishioner)
	paging := params.Page
	filter := bson.M{}

	// setup pagination for
	findOptions := options.Find()
	findOptions.SetLimit(int64(paging.Limit))
	findOptions.SetSkip(database_util.CalculateSkipItem(paging.Page, paging.Limit))

	// TODO improve later
	// move this part to business folder
	if len(params.Sorts) > 0 {
		sort := bson.M{}
		for _, data := range params.Sorts {
			sortOption := 1

			if !data.Ascending {
				sortOption = -1
			}

			sort[data.Field] = sortOption
		}

		findOptions.SetSort(sort)
	}

	if len(params.Filters) > 0 {
		for _, param := range params.Filters {
			if len(param.Values) < 1 {
				continue
			}

			op := strings.ToUpper(param.Op)

			for _, name := range []string{
				database_field_const.FullName, database_field_const.ParishName, database_field_const.ChristianName,
			} {
				if name != param.Field {
					continue
				}

				if op == database_operator_const.Eq {
					filter[param.Field] = param.Values[0]
					continue
				}

				if op == database_operator_const.Like {
					filter[param.Field] = primitive.Regex{Pattern: param.Values[0], Options: "i"}
					continue
				}

				if op == database_operator_const.In {
					filter[param.Field] = bson.M{"$in": param.Values}
					continue
				}

				if op == database_operator_const.Neq {
					filter[param.Field] = bson.M{"$ne": param.Values}
					continue
				}
			}

			for _, name := range []string{
				database_field_const.DateOfBaptism, database_field_const.DateOfConfirmation, database_field_const.DateOfWedding,
			} {
				if param.Field != name {
					continue
				}

				milliseconds, err := strconv.Atoi(param.Values[0])

				if err != nil {
					continue
				}

				date := date_util.ConvertMillisecondToTime(int64(milliseconds))

				if op == database_operator_const.Eq {
					filter[param.Field] = date
					continue
				}

				if op == database_operator_const.Lt {
					filter[param.Field] = bson.M{"$lt": param}
					continue
				}

				if op == database_operator_const.Lte {
					filter[param.Field] = bson.M{"$lte": param}
					continue
				}

				if op == database_operator_const.Gt {
					filter[param.Field] = bson.M{"$gt": param}
					continue
				}

				if op == database_operator_const.Gte {
					filter[param.Field] = bson.M{"$gte": param}
					continue
				}

				if op == database_operator_const.In {
					if len(param.Values) < 2 {
						continue
					}

					// pattern
					//  from   to
					//  [1  ,  2]
					//

					fromMillisecond, err := strconv.Atoi(param.Values[0])

					if err != nil {
						continue
					}

					toMillisecond, err := strconv.Atoi(param.Values[1])

					if err != nil {
						continue
					}

					from := date_util.ConvertMillisecondToTime(int64(fromMillisecond))
					to := date_util.ConvertMillisecondToTime(int64(toMillisecond))
					filter[param.Field] = bson.M{"$gte": from, "$lte": to}
					continue
				}
			}
		}
	}

	if !withDeleted {
		filter[database_field_const.DeletedAt] = nil
	}

	// count parishioner
	totalCount, err := parishionerCollection.CountDocuments(ctx, filter)

	if err != nil {
		return nil, err
	}

	params.Page.Total = totalCount
	result := make([]parishioner_database.Model, 0)
	cursor, err := parishionerCollection.Find(ctx, filter, findOptions)

	if err != nil {
		return nil, err
	}

	for cursor.Next(ctx) {
		//Create a value into which the single document can be decoded
		var parishionerData parishioner_database.Model
		if err := cursor.Decode(&parishionerData); err != nil {
			return nil, err
		}

		result = append(result, parishionerData)
	}

	return result, nil
}
