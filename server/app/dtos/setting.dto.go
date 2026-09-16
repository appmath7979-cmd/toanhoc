package dtos

type BetType string
type DaX_T string

const (
	BetB2  BetType = "b2"
	BetDD2 BetType = "dd2"
	BetDa  BetType = "da"
	BetDax BetType = "dax"
	BetB3  BetType = "b3"
	BetDD3 BetType = "dd3"
	BetB4  BetType = "b4"
)

type CreateBetPairValue struct {
	MB float32 `json:"mb" validate:"required,min=0"`
	MN float32 `json:"mn" validate:"required,min=0"`
	MT float32 `json:"mt" validate:"required,min=0"`
}

type CreateBetPair struct {
	Type    BetType            `json:"type" validate:"required,oneof=b2 dd2 da dax b3 dd3 b4"`
	C       CreateBetPairValue `json:"c" validate:"required"`
	T       CreateBetPairValue `json:"t" validate:"required"`
	Percent bool               `json:"percent"`
}

type CreateSetting struct {
	XienMB bool            `json:"xien_mb" gorm:"type:boolean;default:false"`
	DaXT   DaX_T           `json:"dax_t" validate:"required,oneof=ONE HALFMANY"` // Đã sửa requierd -> required
	Bets   []CreateBetPair `json:"bets" validate:"required"`
}