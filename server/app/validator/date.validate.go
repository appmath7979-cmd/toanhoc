package validator

import (
	"errors"
	"time"
)

func (v *AppValidator) ValidateDate(date string) error {
	if date == "" {
		return errors.New("Thông tin không hợp lệ!")
	}

	layout := "02/01/2006"

	_, err := time.Parse(layout, date)

	return err
}
