import { isDate, isEqual } from "lodash";

export default function getObjectDiff(a: any, b: any, exclude?: string[]): any {
  const keys = Object.keys({ ...a, ...b });
  return keys.reduce((val: any, curr: any) => {
    let aVal = a[curr];
    let bVal = b[curr];

    if (isDate(aVal) || isDate(bVal)) {
      aVal = isDate(aVal) ? new Date(aVal).toISOString() : aVal;
      bVal = isDate(bVal) ? new Date(bVal).toISOString() : bVal;
    }

    if (isEqual(aVal, bVal))
      return val;
    return {
      from: { ...val.from, [curr]: a[curr] },
      to: { ...val.to, [curr]: b[curr] }
    }
  }, { from: {}, to: {} });
}