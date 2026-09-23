package models

type BetType string

const (
	BetTypeB2  BetType = "b2"
	BetTypeDD2 BetType = "dd2"
	BetTypeDA  BetType = "da"
	BetTypeDAX BetType = "dax"
	BetTypeB3  BetType = "b3"
	BetTypeDD3 BetType = "dd3"
	BetTypeB4  BetType = "b4"
)

type Syntax string

const (
	SyntaxBao   Syntax = "b"
	SyntaxDau   Syntax = "dau"
	SyntaxDuoi  Syntax = "duoi"
	SyntaxDa    Syntax = "da"
	SyntaxDax   Syntax = "dax"
)

type Region string

const (
	RegionMB Region = "MB"
	RegionMT Region = "MT"
	RegionMN Region = "MN"
)

type Province string

const (
	ProvinceTP  Province = "tp"
	ProvinceDT  Province = "dt"
	ProvinceCM  Province = "cm"
	ProvinceBT  Province = "bt"
	ProvinceDN  Province = "dn"
	ProvinceCT  Province = "ct"
	ProvinceST  Province = "st"
	ProvinceVT  Province = "vt"
	ProvinceBLI Province = "bli"
	ProvinceTN  Province = "tn"
	ProvinceBTH Province = "bth"
	ProvinceVL  Province = "vl"
	ProvinceBD  Province = "bd"
	ProvinceTV  Province = "tv"
	ProvinceLA  Province = "la"
	ProvinceHG  Province = "hg"
	ProvinceBP  Province = "bp"
	ProvinceTG  Province = "tg"
	ProvinceKG  Province = "kg"
	ProvinceDL  Province = "dl"
	ProvincePY  Province = "py"
	ProvinceTH  Province = "th"
	ProvinceQNA Province = "qna"
	ProvinceKH  Province = "kh"
	ProvinceQB  Province = "qb"
	ProvinceQT  Province = "qt"
	ProvinceGL  Province = "gl"
	ProvinceNT  Province = "nt"
	ProvinceQN  Province = "qn"
	ProvinceDNO Province = "dno"
	ProvinceKT  Province = "kt"
	ProvinceMB  Province = "mb"
)

