package dtos

type BetType string
type DaX_T string

type CreateBetPairValue struct {
	MB float32 `json:"mb" validate:"required,min=0"`
	MN float32 `json:"mn" validate:"required,min=0"`
	MT float32 `json:"mt" validate:"required,min=0"`
}

type CreateBetPair struct {
	// validateoneof giúp ép Client chỉ được gửi các giá trị thuộc enum BetType
	Type    BetType            `json:"type" validate:"required,oneof=b2 dd2 da dax b3 dd3 b4"`
	C       CreateBetPairValue `json:"c" validate:"required"`
	T       CreateBetPairValue `json:"t" validate:"required"`
	Percent bool               `json:"percent"`
}

type CreateSetting struct {
	XienMB bool            `gorm:"type:boolean;default:false"`
	DaXT   DaX_T           `json:"dax_t" validate:"requierd,oneof=ONE HALF MANY"`
	Bets   []CreateBetPair `json:"setting" validate:"required"`
}
