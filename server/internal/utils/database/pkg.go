package database_util

import (
	"errors"
	database_model_const "parishioner_management/internal/constant/database/model"
	"reflect"
	"time"

	"github.com/fatih/structs"
	"github.com/iancoleman/strcase"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// this function will get collection from client of mongo db
func GetCollection(client *mongo.Client, collectionName string) *mongo.Collection {
	database := client.Database(database_model_const.DatabaseName)
	accountCollection := database.Collection(collectionName)

	if accountCollection == nil {
		panic(errors.New("get collection failed"))
	}

	return accountCollection
}

// this func will calculate the item need to skip
func CalculateSkipItem(page int, limit int) int64 {
	return (int64(page-1) * int64(limit))
}

// TODO improve later
// this func will normalize data before updating
// note: get only type without pointer
func NormalizeDataBeforeUpdating[T interface{}](model T) map[string]interface{} {
	typeData := reflect.TypeOf(model).Kind().String()

	if typeData == "ptr" {
		panic(errors.New("NormalizeDataBeforeUpdating::get only type without pointer"))
	}

	if typeData != "struct" {
		panic(errors.New("NormalizeDataBeforeUpdating::required input type is structure"))
	}

	data := structs.Map(model)
	delete(data, "ID")
	delete(data, "CreatedAt")
	delete(data, "UpdatedAt")
	delete(data, "DeletedAt")
	delete(data, "BaseModel")

	result := make(map[string]interface{})

	for key, value := range data {
		result[strcase.ToSnake(key)] = value
	}

	result["updated_at"] = time.Now()
	return result
}

func ConvertIDStringListToObjectIDList(ids []string) ([]primitive.ObjectID, error) {
	idList := make([]primitive.ObjectID, 0, len(ids))

	for _, id := range ids {
		objID, err := primitive.ObjectIDFromHex(id)

		if err != nil {
			return []primitive.ObjectID{}, err
		}

		idList = append(idList, objID)
	}

	return idList, nil
}
