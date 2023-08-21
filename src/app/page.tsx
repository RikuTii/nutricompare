"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./globals.css";

import { useState } from "react";
import { NutritionInfo, Product } from "./types/types";
import { translate, updateLocale } from "./types/translations";
import AddProduct from "./components/AddProduct";
import { parseTargetValue, parseCalories } from "./helpers/ProductParser";
import ProductTable from "./components/ProductTable";
import { getNutriScore } from "./helpers/NutriScoreCalculator";
import ProductsCompare from "./components/ProductsCompare";

export default function Home() {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [compareProducts, setCompareProducts] = useState<Array<Product>>([]);
  const [localeState, setLocaleState] = useState(0);

  const loadProduct = (
    name: string,
    nutritionInfo: string,
    isBeverage: number
  ) => {
    const addProduct: Product = {
      name: name,
      id: products.length + 1,
      info: {
        calories: parseCalories(nutritionInfo),
        protein: parseTargetValue(nutritionInfo, translate("protein")),
        carbohydrates: parseTargetValue(
          nutritionInfo,
          translate("carbohydrates")
        ),
        totalFat: parseTargetValue(nutritionInfo, translate("fat")),
        saturatedFat: parseTargetValue(
          nutritionInfo,
          translate("saturatedFat")
        ),
        sugars: parseTargetValue(nutritionInfo, translate("sugar")),
        fibre: parseTargetValue(nutritionInfo, translate("fibre")),
        salt: parseTargetValue(nutritionInfo, translate("salt")),
      },
    };

    if (addProduct.info?.fibre === 0) {
      addProduct.info.fibre = parseTargetValue(
        nutritionInfo,
        translate("altFibre")
      );
    }
    addProduct.type = isBeverage ? "beverage" : "food";

    addProduct.nutriScore = getNutriScore(addProduct);
    const newProducts = [...products];
    newProducts.push(addProduct);
    setProducts(newProducts);
  };

  const removeProduct = (num: number) => {
    if (num === 0) {
      const newCompareProducts = [...compareProducts];
      newCompareProducts.pop();
      setCompareProducts(newCompareProducts);
    } else {
      const newCompareProducts = [...compareProducts];
      const compared = newCompareProducts.slice(0, 1);
      setCompareProducts(compared);
    }
  };

  const loadProductDirect = (
    name: string,
    nutritionInfo: NutritionInfo,
    isBeverage: number
  ) => {
    const addProduct: Product = {
      id: products.length + 1,
      name: name,
      info: nutritionInfo,
    };

    addProduct.type = isBeverage ? "beverage" : "food";

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
      <AddProduct
        loadProduct={loadProduct}
        loadProductDirect={loadProductDirect}
      />
      <ProductTable
        addCompareProduct={(product) => {
          if(compareProducts && compareProducts.findIndex(e => e.id === product.id) === -1) {
            setCompareProducts([...compareProducts, product])
          } 
        }}
        products={products}
      />
      <ProductsCompare
        removeProduct={removeProduct}
        productA={compareProducts.at(0)}
        productB={
          compareProducts.length > 0 ? compareProducts.at(1) : undefined
        }
      />
    </main>
  );
}
