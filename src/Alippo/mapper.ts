import { IMainData } from "./types";
import { isEmpty, map } from "lodash";

export const MapTableData = (data: Array<IMainData>) => {
  let tableData = [] as Array<IMainData>;
  let i = 1;
  if (!isEmpty(data)) {
    tableData = map(data, (d: IMainData) => ({
      SLNO: i++,
      name: d.name ? d.name : "-",
      age: d.age ? d.age : "-",
      city: d.city ? d.city : "-",
      pinCode: d.pinCode ? d.pinCode : "-",
    }));
  }
  return tableData;
};
