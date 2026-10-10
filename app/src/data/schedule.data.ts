import { Province } from "@/types/address.type";
import { provinceList } from "./province.data";

const mbList = provinceList.filter((item) => item.region === "mb");
const mtList = provinceList.filter((item) => item.region === "mt");
const mnList = provinceList.filter((item) => item.region === "mn");

const getMB = (province: Province) => {
	const found = mbList.find((item) => item.province === province);
	return { label: found?.label ?? "", province: found?.province ?? "" };
};
const getMT = (province: Province) => {
	const found = mtList.find((item) => item.province === province);
	return { label: found?.label ?? "", province: found?.province ?? "" };
};
const getMN = (province: Province) => {
	const found = mnList.find((item) => item.province === province);
	return { label: found?.label ?? "", province: found?.province ?? "" };
};

export const schedule = [
	{
		mb: [getMB("mb")],
		mt: [getMT("kh"), getMT("kt")],
		mn: [getMN("tg"), getMN("kg"), getMN("dl")],
	},
	// Thứ 2
	{
		mb: [getMB("mb")],
		mt: [getMT("th"), getMT("py")],
		mn: [getMN("tp"), getMN("dt"), getMN("cm")],
	},
	// Thứ 3
	{
		mb: [getMB("mb")],
		mt: [getMT("qn"), getMT("dl")],
		mn: [getMN("bt"), getMN("vt"), getMN("bli")],
	},
	// Thứ 4
	{
		mb: [getMB("mb")],
		mt: [getMT("dn"), getMT("kh")],
		mn: [getMN("dn"), getMN("ct"), getMN("st")],
	},
	// Thứ 5
	{
		mb: [getMB("mb")],
		mt: [getMT("bd"), getMT("qb"), getMT("qt")],
		mn: [getMN("tn"), getMN("ag"), getMN("bth")],
	},
	// Thứ 6
	{
		mb: [getMB("mb")],
		mt: [getMT("gl"), getMT("nt")],
		mn: [getMN("vl"), getMN("bd"), getMN("tv")],
	},
	// Thứ 7
	{
		mb: [getMB("mb")],
		mt: [getMT("dn"), getMT("qn"), getMT("dno")],
		mn: [getMN("tp"), getMN("la"), getMN("hg"), getMN("bp")],
	},
];
