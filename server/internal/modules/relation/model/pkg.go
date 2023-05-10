package relation_model

import "go.mongodb.org/mongo-driver/bson/primitive"

type RelationCreation struct {
	ParishionerID primitive.ObjectID
	DependentsID  primitive.ObjectID
	Type          int
}
