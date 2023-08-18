"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./globals.css";

import { useState } from "react";
import { NutritionInfo, Product } from "./types/types";
import { translate, updateLocale } from "./types/translations";
import AddProduct from "./AddProduct";
import { parseTargetValue, parseCalories } from "./ProductParser";
import ProductTable from "./ProductTable";
import { getNutriScore } from "./NutriScoreCalculator";

export default function Home() {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [localeState, setLocaleState] = useState(0);

  const loadProduct = (name: string, nutritionInfo: string, isBeverage: number) => {
    const addProduct: Product = {
      name: name,
      info: {
        calories: parseCalories(nutritionInfo),
        protein: parseTargetValue(nutritionInfo, translate("protein")),
        carbohydrates: parseTargetValue(
          nutritionInfo,
          translate("carbohydrates")
        ),
        totalFat: parseTargetValue(nutritionInfo, translate("fat")),
        saturatedFat: parseTargetValue(nutritionInfo, translate("saturatedFat")),
        sugars: parseTargetValue(nutritionInfo, translate("sugar")),
        fibre: parseTargetValue(nutritionInfo, translate("fibre")),
        salt: parseTargetValue(nutritionInfo, translate("salt")),
      },
    };

    if(addProduct.info?.fibre === 0) {
      addProduct.info.fibre = parseTargetValue(nutritionInfo, translate("altFibre"));
    }
    addProduct.type = isBeverage ? 'beverage' : 'food';

    addProduct.nutriScore = getNutriScore(addProduct);
    const newProducts = [...products];
    newProducts.push(addProduct);
    setProducts(newProducts);
  };

  const loadProductDirect = (name: string, nutritionInfo: NutritionInfo, isBeverage: number) => {
    const addProduct: Product = {
      name: name,
      info: nutritionInfo
    };

    addProduct.type = isBeverage ? 'beverage' : 'food';


    addProduct.nutriScore = getNutriScore(addProduct);

    const newProducts = [...products];
    newProducts.push(addProduct);
    setProducts(newProducts);
  };

  return (
    <main className="flex m-10" style={{ margin: 80 }}>
      <div
        className="d-flex justify-content-center"
        style={{ marginBottom: 20 }}
      >
        <h1 className="text-white">Nutricompare</h1>
      </div>
      <div className="d-flex justify-content-end" style={{ marginBottom: 20 }}>
        <div className="dropdown" data-bs-theme="dark">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Language
          </button>
          <ul className="dropdown-menu">
            <li>
              <a
                className="dropdown-item"
                onClick={() => {
                  updateLocale("fi");
                  setLocaleState(localeState + 1);
                }}
              >
                Suomi
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() => {
                  updateLocale("en");
                  setLocaleState(localeState + 1);
                }}
              >
                English
              </a>
            </li>
          </ul>
        </div>
      </div>
      <AddProduct loadProduct={loadProduct} loadProductDirect={loadProductDirect} />
      <ProductTable products={products} />
    </main>
  );
}
