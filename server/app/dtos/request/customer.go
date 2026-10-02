package request

type GetManyCustomer struct {
	Page   int    `form:"page" default:"1"`
	Search string `form:"search"`
	Active *bool  `form:"active"`
	Guest  bool   `form:"guest"`
	Sort   string `form:"sort"`
}

type CreateCustomer struct {
	FullName    string        `json:"full_name" binding:"required,min=2,max=100"`
	IsGuest     *bool         `json:"is_guest" binding:"required"`
	Setting     CreateSetting `json:"setting" binding:"required"`
}

type UpdateCustomer struct {
	FullName    *string        `json:"full_name" binding:"omitempty,min=2,max=100"`
	IsGuest     *bool          `json:"is_guest" binding:"omitempty"`
	Active      *bool          `json:"active" binding:"omitempty"`
	Setting     *UpdateSetting `json:"setting" binding:"omitempty"`
}

type DeleteManyCustomer struct {
	Ids []string `json:"ids" binding:"required,div,uuid"`
}