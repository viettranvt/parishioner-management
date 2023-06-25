package parishioner_model

import (
	"errors"
	database_const "parishioner_management/internal/constant/database"
	"time"

	validation "github.com/go-ozzo/ozzo-validation"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var (
	ErrInvalidId = errors.New("invalid id")
)

type Parishioner struct {
	Id                   *primitive.ObjectID  `json:"id"`
	DateOfBirth          *int64               `json:"date_of_birth"`           // ngay sinh, millisecond
	DateOfDeath          *int64               `json:"date_of_death"`           // ngay mat, millisecond
	DateOfWedding        *int64               `json:"date_of_wedding"`         // ngay cuoi, millisecond
	DateOfBaptism        *int64               `json:"date_of_baptism"`         // ngay rua toi, millisecond
	DateOfFirstCommunion *int64               `json:"date_of_first_communion"` // ngay ruoc le lan dau, millisecond
	DateOfConfirmation   *int64               `json:"date_of_confirmation"`    // ngay them suc, millisecond
	DateOfOath           *int64               `json:"date_of_oath"`            // ngay tuyen hua bao dong, millisecond
	DateOfHolyOrder      *int64               `json:"date_of_holy_order"`      // ngay truyen chuc thanh, millisecond
	ParishName           *string              `json:"parish_name"`             // ten giao ho
	ChristianName        *string              `json:"christian_name"`          // ten thanh
	Avatar               *string              `json:"avatar"`                  // hinh anh
	FullName             *string              `json:"full_name"`
	Note                 *string              `json:"note"`
	Gender               *int                 `json:"gender"`
	Address              *string              `json:"address"`
	MotherID             *primitive.ObjectID  `json:"mother_id"`
	FatherID             *primitive.ObjectID  `json:"father_id"`
	WifeOrHusbandID      *primitive.ObjectID  `json:"wife_or_husband_id"`
	GuarantorID          *primitive.ObjectID  `json:"guarantor_id"`
	ChildIDs             []primitive.ObjectID `json:"child_ids"`

	// TODO add relation for parishioner
}

func (data Parishioner) ValidateWhenCreating() error {
	return validation.ValidateStruct(&data,
		validation.Field(&data.ParishName, validation.Required),
		validation.Field(&data.ChristianName, validation.Required),
		validation.Field(&data.FullName, validation.Required),
		validation.Field(&data.Gender, validation.Required, validation.In(
			database_const.Female,
			database_const.Male,
		)),
	)
}

func (data Parishioner) ValidateWhenUpdating() error {
	return validation.ValidateStruct(&data,
		validation.Field(&data.Id, validation.Required),
		validation.Field(&data.ParishName, validation.Required),
		validation.Field(&data.ChristianName, validation.Required),
		validation.Field(&data.FullName, validation.Required),
		validation.Field(&data.Gender, validation.Required, validation.In(
			database_const.Female,
			database_const.Male,
		)),
	)
}

type ParishionerListResponse struct {
	ID            primitive.ObjectID `json:"id"`
	FullName      string             `json:"full_name"`
	DateOfBirth   *time.Time         `json:"date_of_birth,omitempty"` // ngay sinh
	ParishName    string             `json:"parish_name"`             // ten giao ho
	ChristianName string             `json:"christian_name"`          // ten thanh
	Gender        int                `json:"gender"`
}

type ParishionerDetailResponse struct {
	ID                   primitive.ObjectID        `json:"id"`
	CreatedAt            time.Time                 `json:"created_at"`
	UpdatedAt            time.Time                 `json:"updated_at"`
	DateOfBirth          *time.Time                `json:"date_of_birth,omitempty"`           // ngay sinh
	DateOfDeath          *time.Time                `json:"date_of_death,omitempty"`           // ngay mat
	DateOfWedding        *time.Time                `json:"date_of_wedding,omitempty"`         // ngay cuoi
	DateOfBaptism        *time.Time                `json:"date_of_baptism,omitempty"`         // ngay rua toi
	DateOfFirstCommunion *time.Time                `json:"date_of_first_communion,omitempty"` // ngay ruoc le lan dau
	DateOfConfirmation   *time.Time                `json:"date_of_confirmation,omitempty"`    // ngay them suc
	DateOfOath           *time.Time                `json:"date_of_oath,omitempty"`            // ngay tuyen hua bao dong
	DateOfHolyOrder      *time.Time                `json:"date_of_holy_order,omitempty"`      // ngay truyen chuc thanh
	ParishName           string                    `json:"parish_name"`                       // ten giao ho
	ChristianName        string                    `json:"christian_name"`                    // ten thanh
	Avatar               *string                   `json:"avatar,omitempty"`                  // hinh anh
	FullName             string                    `json:"full_name"`
	Note                 *string                   `json:"note,omitempty"`
	Gender               int                       `json:"gender"`
	Address              *string                   `json:"address,omitempty"`
	Father               *ParishionerListResponse  `json:"father,omitempty"`
	Mother               *ParishionerListResponse  `json:"mother,omitempty"`
	WifeOrHusband        *ParishionerListResponse  `json:"wife_or_husband,omitempty"`
	Guarantor            *ParishionerListResponse  `json:"guarantor,omitempty"`
	Children             []ParishionerListResponse `json:"children"`
}
