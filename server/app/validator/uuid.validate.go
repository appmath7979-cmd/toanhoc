package validator

import (
	"errors"

	"github.com/google/uuid"
)

func (v *AppValidator) ValidateUUID(id string) error {
	_, err := uuid.Parse(id)

	if err != nil {
		return errors.New("Thông tin không hợp lệ!")
	}

	return err
}
