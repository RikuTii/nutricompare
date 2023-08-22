import { useState } from "react";
import { Product } from "../types/types";
import { translate, updateLocale } from "../types/translations";

const ProductTable = (props: {
  products: Array<Product>;
  addCompareProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
}) => {
  const [sorting, setSorting] = useState("");
  const [sortingStep, setSortingStep] = useState(0);
  const updateSorting = (type: string, step: number) => {
    const sorted = [...props.products];
    if (type === "name") {
      sorted.sort((a: Product, b: Product) => {
        if (
          step
            ? (a.name ?? "") > (b.name ?? "")
            : (b.name ?? "") > (a.name ?? "")
        ) {
          return 1;
        } else {
          return -1;
        }
      });
    } else if (type === "calories") {
      sorted.sort((a: Product, b: Product) => {
        if (
          step
            ? (a.info?.calories ?? 0) > (b.info?.calories ?? 0)
            : (b.info?.calories ?? 0) > (a.info?.calories ?? 0)
        ) {
          return 1;
        } else {
          return -1;
        }
      });
    } else if (type === "fat") {
      sorted.sort((a: Product, b: Product) => {
        if (
          step
            ? (a.info?.totalFat ?? 0) > (b.info?.totalFat ?? 0)
            : (b.info?.totalFat ?? 0) > (a.info?.totalFat ?? 0)
        ) {
          return 1;
        } else {
          return -1;
        }
      });
    } else if (type === "carbs") {
      sorted.sort((a: Product, b: Product) => {
        if (
          step
            ? (a.info?.carbohydrates ?? 0) > (b.info?.carbohydrates ?? 0)
            : (b.info?.carbohydrates ?? 0) > (a.info?.carbohydrates ?? 0)
        ) {
          return 1;
        } else {
          return -1;
        }
      });
    } else if (type === "protein") {
      sorted.sort((a: Product, b: Product) => {
        if (
          step
            ? (a.info?.protein ?? 0) > (b.info?.protein ?? 0)
            : (b.info?.protein ?? 0) > (a.info?.protein ?? 0)
        ) {
          return 1;
        } else {
          return -1;
        }
      });
    } else if (type === "nutriscore") {
      sorted.sort((a: Product, b: Product) => {
        if (
          step
            ? (a.nutriScore ?? "") > (b.nutriScore ?? "")
            : (b.nutriScore ?? "") > (a.nutriScore ?? "")
        ) {
          return 1;
        } else {
          return -1;
        }
      });
    }

    return sorted;
  };

  const setSortingType = (name: string) => {
    setSortingStep(sortingStep ? 0 : 1);
    setSorting(name);
  };

  if (!props.products || !props.products.length) return <></>;

  return (
    <div className="table-responsive mb-4">
      <table className="table" data-bs-theme="dark">
        <thead>
          <tr>
            <th scope="col" onClick={() => setSortingType("default")}>
              #
            </th>
            <th
              scope="col"
              className="c-pointer"
              onClick={() => setSortingType("name")}
            >
              {translate("productName")}{" "}
              {sorting === "name" && (sortingStep ? "▼" : "▲")}
            </th>
            <th scope="col" onClick={() => setSortingType("nutriscore")}>
              Nutri-Score{" "}
              {sorting === "nutriscore" && (sortingStep ? "▼" : "▲")}
            </th>
            <th scope="col" onClick={() => setSortingType("calories")}>
              {translate("calories")}{" "}
              {sorting === "calories" && (sortingStep ? "▼" : "▲")}
            </th>
            <th scope="col" onClick={() => setSortingType("fat")}>
              {translate("fat")}{" "}
              {sorting === "fat" && (sortingStep ? "▼" : "▲")}
            </th>
            <th scope="col" onClick={() => setSortingType("carbs")}>
              {translate("carbohydratesUi")}{" "}
              {sorting === "carbs" && (sortingStep ? "▼" : "▲")}
            </th>
            <th scope="col" onClick={() => setSortingType("protein")}>
              {translate("protein")}{" "}
              {sorting === "protein" && (sortingStep ? "▼" : "▲")}
            </th>
            <th>{translate("compare")}</th>
            <th>{translate("remove")}</th>
          </tr>
        </thead>
        <tbody>
          {updateSorting(sorting, sortingStep).map((product: Product) => {
            return (
              <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <td>{product.name}</td>
                <td>{product.nutriScore}</td>
                <td>{product.info?.calories}</td>
                <td>{product.info?.totalFat}</td>
                <td>{product.info?.carbohydrates}</td>
                <td>{product.info?.protein}</td>
                <td
                  onClick={(e) => props.addCompareProduct(product)}
                  className="c-pointer"
                >
                  ⋛
                </td>
                <td
                  onClick={(e) => props.removeProduct(product)}
                  className="c-pointer"
                >
                  X
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
