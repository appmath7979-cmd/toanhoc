package validator

import (
	"errors"
	"strconv"
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

func (v *AppValidator) ValidateDay(dayStr string) (*int16, error) {
	if dayStr == "" {
		return nil, errors.New("Thông tin không hợp lệ!")
	}

	dayInt, err := strconv.Atoi(dayStr)

	if err != nil {
		return nil, errors.New("Thông tin không hợp lệ!")
	}

	if dayInt < 0 || dayInt > 6 {
		return nil, errors.New("Thông tin không hợp lệ!")
	}

	day := int16(dayInt)

	return &day, nil
}
