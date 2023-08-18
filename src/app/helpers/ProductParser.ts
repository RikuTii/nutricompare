import { translate } from "../types/translations";

const cleanUpString = (value: string) => {
  return value.replace(/[^0-9,]/gi, "").replace(",", ".");
};

export const parseTargetValue = (info: string, target: string) => {

  let targetInfo = info;

  if(targetInfo.charAt(0).match(/\d+/) !== null) {
    targetInfo = targetInfo.split("").reverse().join("");
  }
  const start = targetInfo.toLowerCase().indexOf(target.toLowerCase());

  if (start > -1) {
    const valueEnd = targetInfo.indexOf("g", start + target.length);
    if (valueEnd > -1) {
      if (valueEnd - (start + target.length) > 20) {
        return 0;
      }
      return Number(
        cleanUpString(targetInfo.substring(start + target.length, valueEnd))
      );
    } else {
      const valueAltEnd = targetInfo.indexOf("mg", start + target.length);
      if (valueAltEnd - (start + target.length) > 20) {
        return 0;
      }
      if (valueAltEnd > -1) {
        return Number(
          cleanUpString(targetInfo.substring(start + target.length, valueAltEnd))
        );
      }
    }
  }
  return 0;
};

export const parseCalories = (info: string) => {
  const calories = info.indexOf("kcal");
  if (calories > 1) {
    let hasNumber = false;
    for (let it = 1; it < 20; it++) {
      const numberMatch = info
        .substring(calories - it, calories - it + 1)
        .match(/\d+/);
      if (
        hasNumber &&
        info.substring(calories - it, calories - it + 1).match(/\d+/) === null
      ) {
        return Number(cleanUpString(info.substring(calories - it, calories)));
      } else if (numberMatch !== null) {
        hasNumber = true;
      }
    }
  }

  return 0;
};
