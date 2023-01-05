export function toJSONQuery(cols: any) : string {
  const keys = Object.keys(cols);
  return keys.map(key => `'${key}', ${cols[key]}`).join(",");
}

export function parseByKeys( obj: any, cols: any ) {
  const keys = Object.keys(cols);
  const newObj : any = {};
  keys.forEach((key) => {
    if (obj[key] !== undefined)
      newObj[cols[key]] = obj[key];
  });
  return newObj;
}1