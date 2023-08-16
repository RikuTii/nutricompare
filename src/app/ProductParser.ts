import { translate } from "./types/translations";


export const parseTargetValue = (info: string, target: string) => {
    const start = info.indexOf(target);
    if (start > -1) {
      const valueEnd = info.indexOf("g", start + target.length);
      if (valueEnd > -1) {
        return Number(info.substring(start + target.length, valueEnd));
      } else {
        const valueAltEnd = info.indexOf("mg", start + target.length);
        if (valueAltEnd > -1) {
          return Number(info.substring(start + target.length, valueAltEnd));
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