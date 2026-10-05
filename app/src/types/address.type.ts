type Region = "mb" | "mn" | "mt";

type Province =
	| "tp"
	| "dt"
	| "cm"
	| "bt"
	| "dn"
	| "ct"
	| "st"
	| "vt"
	| "bli"
	| "tn"
	| "bth"
	| "vl"
	| "bd"
	| "tv"
	| "la"
	| "hg"
	| "bp"
	| "tg"
	| "kg"
	| "dl"
	| "py"
	| "th"
	| "qna"
	| "kh"
	| "qb"
	| "qt"
	| "gl"
	| "nt"
	| "qn"
	| "dno"
	| "kt"
	| "mb"
	| "ag";

interface ProvinceItem {
	label: string;
	province: Province;
	region: Region;
}

export type { Region, Province, ProvinceItem };
