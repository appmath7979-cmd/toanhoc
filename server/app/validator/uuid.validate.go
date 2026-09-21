package validator

import "github.com/google/uuid"

func ValidateUUID(id string) error {
	_, err := uuid.Parse(id)

	return err
}
