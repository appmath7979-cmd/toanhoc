import type { Province } from "@/types/address.type";
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

type Schedule = { province: string; label: string };

const schedule = [
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

const provinceNameSchedule = () =>
  schedule.map((s) => {
    const mb = s.mb;
    const mt = s.mt;
    const mn = s.mn;

    const newMB = mixProvince(mb);
    const newMT = mixProvince(mt);
    const newMN = mixProvince(mn);

    return {
      mb: newMB,
      mt: newMT,
      mn: newMN,
    };
  });

function mixProvince(
  provinces: {
    label: string;
    province: string;
  }[],
): {
  label: string;
  province_name: string;
}[] {
  const values: {
    label: string;
    province_name: string;
  }[] = [];

  provinces.forEach((item) => {
    const conv = {
      label: item.label,
      province_name: item.province,
    };

    values.push(conv);
  });

  if (provinces.length > 1) {
    for (let i = 0; i < provinces.length - 1; i++) {
      for (let j = 1; j <= provinces.length - 1; j++) {
        const mixed = {
          label: `${provinces[i].label}-${provinces[j].label}`,
          province_name: `${provinces[i].province}-${provinces[j].province}`,
        };

        values.push(mixed);
      }
    }
  }

  return values;
}

export { provinceNameSchedule, type Schedule, schedule };
