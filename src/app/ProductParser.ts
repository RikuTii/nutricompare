import { translate } from "./types/translations";

const cleanUpString = (value: string) => {
    return value.replace(/[^0-9,]/gi, '').replace(',', '.');
}

export const parseTargetValue = (info: string, target: string) => {
    const start = info.indexOf(target);
    console.log(start,target);
    if (start > -1) {
      const valueEnd = info.indexOf("g", start + target.length);
      if (valueEnd > -1) {
        if(valueEnd - (start + target.length) > 12) {
          return 0;
        }
        console.log(cleanUpString(info.substring(start + target.length, valueEnd)));
        return Number(cleanUpString(info.substring(start + target.length, valueEnd)));
      } else {
        const valueAltEnd = info.indexOf("mg", start + target.length);
        if(valueAltEnd - (start + target.length) > 12) {
          return 0;
        }
        if (valueAltEnd > -1) {
          return Number(cleanUpString(info.substring(start + target.length, valueAltEnd)));
        }
      }
    }
    return 0;
  };

  export const parseCalories = (info: string) => {
    const start = info.indexOf(translate('energy'));
    if (start > -1) {
      const calStart = info.indexOf("/", start);
      if (calStart > -1) {
        const calories = info.indexOf("kcal", calStart);
        if (calories > -1) {
          const calEnd = info.substring(calStart + 2, calories);
          return Number(calEnd);
        }
      }
    }
    return 0;
  };