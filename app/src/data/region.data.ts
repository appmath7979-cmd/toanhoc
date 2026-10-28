import type { Region } from "@/types/address.type";

const regionData: Record<Region, string> = {
  mb: "Miền Bắc",
  mt: "Miền Trung",
  mn: "Miền Nam",
};

const regionList: Region[] = ["mb", "mt", "mn"];

export { regionData, regionList };
