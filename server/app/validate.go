package app

import "github.com/go-playground/validator/v10"

func ReqValidate(req interface{}) (uint16, error) {
	validate := validator.New()

	if err := validate.Struct(req); err != nil {
		return 400, err
	}

	return 202, nil
}
