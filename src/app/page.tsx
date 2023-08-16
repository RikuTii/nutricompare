"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./globals.css";
import { ChangeEvent, useEffect, useState } from "react";
import { NutritionInfo, Product } from "./types/types";
import { translate, updateLocale } from "./types/translations";
import AddProduct from "./AddProduct";
import { parseTargetValue, parseCalories } from "./ProductParser";
import ProductView from "./Product";

export default function Home() {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [localeState, setLocaleState] = useState(0);
  const [sorting, setSorting] = useState("");
  const [sortingStep, setSortingStep] = useState(0);
  const [sortingDirection, setSortingDirection] = useState("asc");

  const loadProduct = (name: string, nutritionInfo: string) => {
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
        sugars: parseTargetValue(nutritionInfo, translate("sugar")),
      },
    };
    const newProducts = [...products];
    newProducts.push(addProduct);
    setProducts(newProducts);
  };

  const updateSorting = (type: string, step: number) => {
    const sorted = [...products];
    if (type === "name") {
      sorted.sort((a: Product, b: Product) => {
        const name1 = a.name ?? "";
        const name2 = b.name ?? "";
        if (step ? name1 > name2 : name2 > name1) {
          return 1;
        } else {
          return -1;
        }
      });
    } else if (type === "calories") {
      sorted.sort((a: Product, b: Product) => {
        const name1 = a.info?.calories ?? 0;
        const name2 = b.info?.calories ?? 0;
        if (step ? name1 > name2 : name2 > name1) {
          return 1;
        } else {
          return -1;
        }
      });
    }
   else if (type === "fat") {
    sorted.sort((a: Product, b: Product) => {
      const name1 = a.info?.totalFat ?? 0;
      const name2 = b.info?.totalFat ?? 0;
      if (step ? name1 > name2 : name2 > name1) {
        return 1;
      } else {
        return -1;
      }
    });
  }
  else if (type === "carbs") {
    sorted.sort((a: Product, b: Product) => {
      const name1 = a.info?.carbohydrates ?? 0;
      const name2 = b.info?.carbohydrates ?? 0;
      if (step ? name1 > name2 : name2 > name1) {
        return 1;
      } else {
        return -1;
      }
    });
  }
  else if (type === "protein") {
    sorted.sort((a: Product, b: Product) => {
      const name1 = a.info?.protein ?? 0;
      const name2 = b.info?.protein ?? 0;
      if (step ? name1 > name2 : name2 > name1) {
        return 1;
      } else {
        return -1;
      }
    });
  }

    return sorted;
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
      <AddProduct loadProduct={loadProduct} />
      <table className="table" data-bs-theme="dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col" className="c-pointer" onClick={() => {
              if(sorting === 'name') {
                setSortingStep(sortingStep ? 0 : 1);
              }
              setSorting('name');
            }}>Name</th>
            <th scope="col" onClick={() => {
              if(sorting === 'calories') {
                setSortingStep(sortingStep ? 0 : 1);
              }
              setSorting('calories');
            }}>Calories</th>
            <th scope="col" onClick={() => {
              if(sorting === 'fat') {
                setSortingStep(sortingStep ? 0 : 1);
              }
              setSorting('fat');
            }}>Fat</th>
            <th scope="col" onClick={() => {
              if(sorting === 'carbs') {
                setSortingStep(sortingStep ? 0 : 1);
              }
              setSorting('carbs');
            }}>Carbohydrates</th>
            <th scope="col" onClick={() => {
              if(sorting === 'protein') {
                setSortingStep(sortingStep ? 0 : 1);
              }
              setSorting('protein');
            }}>Protein</th>
          </tr>
        </thead>
        <tbody>
          {updateSorting(sorting,sortingStep).map((product: Product, index: number) => {
            return (
              <tr key={index}>
                <th scope="row">{index}</th>
                <td>{product.name}</td>
                <td>{product.info?.calories}</td>
                <td>{product.info?.totalFat}</td>
                <td>{product.info?.carbohydrates}</td>
                <td>{product.info?.protein}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
