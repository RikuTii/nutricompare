import { Product } from "../types/types";

const nutriTable = {
  cal: 80,
  sugar: 4.5,
  fat: 1,
  salt: 90,
  fibre: 0.7,
  protein: 1.6,
};
const nutriTableBeverage = {
  cal: 7.2,
  sugar: 1.5,
};

export const getNutriScore = (product: Product) => {
  if (!product.info) return "E";
  const a = Math.floor(
    product.info.calories /
      (product.type === "food" ? nutriTable["cal"] : nutriTableBeverage["cal"])
  );
  const b = Math.floor(
    product.info.sugars /
      (product.type === "food"
        ? nutriTable["sugar"]
        : nutriTableBeverage["sugar"])
  );
  const c = Math.floor((product.info.saturatedFat ?? 1) / nutriTable["fat"]);
  let sodium = 0.1;

  if (product.info?.salt) {
    sodium = product.info.salt * 1000 * 0.4;
  }

  const d = Math.floor(sodium / nutriTable["salt"]);

  const e = 0; //fruit/vegetable amount for beverages
  const f = Math.min(
    Math.floor(product.info.fibre ?? 1 / nutriTable["fibre"]),
    5
  );

  const g = Math.min(
    Math.floor(product.info.protein / nutriTable["protein"]),
    5
  );

  const n = a + b + c + d;
  let p = e + f + g;

  if (product.type === "food") {
    if (n >= 11) {
      console.log("n is", n, "delta", p - g);

      if (p - g < 5) {
        p = p - g;
      }
    }
  }

  const total = Math.ceil(n - p);

  if (product.type === "beverage") {
    if (total == 0) {
      return "A";
    } else if (total >= 1 && total <= 2) {
      return "B";
    } else if (total >= 3 && total <= 4) {
      return "C";
    } else if (total >= 5 && total <= 8) {
      return "D";
    } else {
      return "E";
    }
  }

  if (total <= -1) {
    return "A";
  } else if (total >= 0 && total <= 2) {
    return "B";
  } else if (total >= 3 && total <= 10) {
    return "C";
  } else if (total >= 11 && total <= 18) {
    return "D";
  } else {
    return "E";
  }
};
