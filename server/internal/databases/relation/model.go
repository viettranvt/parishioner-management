package relationship_database

import (
	"parishioner_management/internal/common"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Model struct {
	common.BaseModel `json:",inline" bson:",inline"`
	ParishionerID    primitive.ObjectID `json:"parishioner_id" bson:"parishioner_id"`
	DependentsID     primitive.ObjectID `json:"dependents_id" bson:"dependents_id"`
	Relationship     int                `json:"relationship" bson:"relationship"` // protector //father //mother //wife //husband
}

func (u *Model) MarshalBSON() ([]byte, error) {
	if u.CreatedAt.IsZero() {
		u.CreatedAt = time.Now()
		u.DeletedAt = time.Time{}
	}

	u.UpdatedAt = time.Now()

	type my Model
	return bson.Marshal((*my)(u))
}
