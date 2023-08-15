"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { ChangeEvent, useState } from "react";

interface Translations {
  [key: string]: any;
}

const locale = "en";
const translations: Translations = {};
translations["fi"] = {
  energy: "Energia",
  protein: "Proteiini",
  calories: "Kalorit",
  carbohydrates: "Hiilihydraatit",
  fat: "Rasva",
  sugar: "Sokeri",
  salt: "Suola",
};
translations["en"] = {
  energy: "Energy",
  protein: "Protein",
  calories: "Calories",
  carbohydrates: "Carbohydrates",
  fat: "Fat",
  sugar: "Sugar",
  salt: "Salt",
};

type NutritionInfo = {
  calories: number;
  carbohydrates: number;
  saturatedFat?: number;
  unSaturatedFat?: number;
  totalFat: number;
  protein: number;
  sugars: number;
  salt?: number;
};
type Product = {
  name?: string;
  info?: NutritionInfo;
};

export default function Home() {
  const [products, setProducts] = useState<Array<Product>>();
  const [newProduct, setNewProduct] = useState<Product>();
  const [nutritionInfo, setNutritionInfo] = useState("");

  const parseTargetValue = (info: string, target: string) => {
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

  const parseCalories = (info: string) => {
    const start = info.indexOf(translations[locale].energy);
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

  const populateNutritionInfo = () => {
    console.log(
      parseTargetValue(
        nutritionInfo,
        translations[locale].carbohydrates
      )
    );
    console.log(parseCalories(nutritionInfo));

    const addProduct: Product = {
      name: newProduct?.name,
      info: {
        calories: parseCalories(nutritionInfo),
        protein: parseTargetValue(nutritionInfo, translations[locale].protein),
        carbohydrates: parseTargetValue(nutritionInfo, translations[locale].carbohydrates),
      },
    };
  };

  return (
    <main className="flex m-10" style={{ margin: 80 }}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Tuotteen nimi"
          aria-label="name"
          aria-describedby="basic-addon1"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const productUpdate: Product = { ...newProduct };
            productUpdate.name = event.currentTarget.value;
            setNewProduct(productUpdate);
          }}
        />
      </div>
      <div className="input-group">
        <span className="input-group-text">Tuotteen tiedot leikepöydältä</span>
        <textarea
          className="form-control"
          aria-label="With textarea"
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
            setNutritionInfo(event.target.value);
          }}
        ></textarea>
      </div>
      <span>Tai lataa kuva tiedoista</span>
      <div className="input-group mb-3">
        <input type="file" className="form-control" id="inputGroupFile02" />
        <label className="input-group-text" htmlFor="inputGroupFile02">
          Upload
        </label>
      </div>
      <div className="d-flex justify-content-end">
        <button
          onClick={() => {
            populateNutritionInfo();
          }}
          type="button"
          className="btn btn-primary"
        >
          Primary
        </button>
      </div>
    </main>
  );
}
