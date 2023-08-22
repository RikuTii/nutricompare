import { ChangeEvent, useEffect, useState } from "react";
import { translate } from "../types/translations";
import { NutritionInfo } from "../types/types";
import ProductInput from "./ProductInput";
import { parseCalories, parseTargetValue } from "../helpers/ProductParser";
import "../styles/styles.scss";

const AddProduct = (props: {
  loadProduct: (
    name: string,
    nutritionInfo: string,
    isBeverage: number
  ) => void;
  loadProductDirect: (
    name: string,
    nutritionInfo: NutritionInfo,
    isBeverage: number
  ) => void;
}) => {
  const [productName, setProductName] = useState("");
  const [nutritionInfo, setNutritionInfo] = useState("");
  const [manualNutritionInfo, setManualNutritionInfo] =
    useState<NutritionInfo>();
  const [loadInfo, setLoadInfo] = useState<NutritionInfo>();
  const [imageFile, setImagefile] = useState<File | null>(null);
  const [showInput, setShowInput] = useState(false);
  const [isBeverage, setIsBeverage] = useState(0);

  async function parseNutritionFromImage() {
    const formData = new FormData();
    if (imageFile) {
      formData.append("file", imageFile);
    }
    formData.append("language", translate("lang"));
    formData.append("isTable", "true");

    const response = await fetch("/api/processImage", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data && data.IsErroredOnProcessing === false) {
      props.loadProduct(
        productName,
        data.ParsedResults[0].ParsedText,
        isBeverage
      );
    }
  }

  const loadProductFromInfo = (info: NutritionInfo) => {
    props.loadProductDirect(productName, info, isBeverage);
  };

  const onClipBoardDataLoaded = (data: string) => {
    if (data === "") {
      setLoadInfo(undefined);
      return;
    }
    const info: NutritionInfo = {
      calories: parseCalories(data),
      protein: parseTargetValue(data, translate("protein")),
      carbohydrates: parseTargetValue(data, translate("carbohydrates")),
      totalFat: parseTargetValue(data, translate("fat")),
      saturatedFat: parseTargetValue(data, translate("saturatedFat")),
      sugars: parseTargetValue(data, translate("sugar")),
      fibre: parseTargetValue(data, translate("fibre")),
      salt: parseTargetValue(data, translate("salt")),
    };

    if (info.fibre === 0) {
      info.fibre = parseTargetValue(data, translate("altFibre"));
    }

    setLoadInfo(info);
  };

  return (
    <div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={productName}
          placeholder={translate("productName")}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setProductName(event.currentTarget.value);
          }}
        />
      </div>
      <div className="input-clipboard-small">
        <label htmlFor="clipBoardInput" className="text-white custom-class">
          {translate("uploadClipBoard")}
        </label>
      </div>
      <div className="input-group mb-2">
        <div className="input-clipboard">
          <div className="input-group-text">{translate("uploadClipBoard")}</div>
        </div>
        <textarea
          className="form-control"
          id="clipBoardInput"
          value={nutritionInfo}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
            setNutritionInfo(event.target.value);
            onClipBoardDataLoaded(event.target.value);
          }}
        ></textarea>
      </div>
      <span className="text-white">{translate("selectFromFile")}</span>
      <div className="input-group mb-3">
        <input
          type="file"
          className="form-control"
          accept="image/png, image/jpeg"
          onChange={(e) => {
            setNutritionInfo("");
            setImagefile(e.target?.files ? e.target?.files[0] : null);
          }}
        />
      </div>
      <button
        className="btn btn-dark text-white"
        onClick={() => setShowInput(!showInput)}
      >
        {translate("inputManually")}
      </button>

      {showInput && (
        <ProductInput
          nutritionInfo={loadInfo}
          onInfoUpdate={(info) => setManualNutritionInfo(info)}
        />
      )}

      <div className="form-check form-switch mt-2">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          checked={isBeverage ? true : false}
          id="flexSwitchCheckDefault"
          onChange={(e) => setIsBeverage(isBeverage ? 0 : 1)}
        />
        <label
          className="form-check-label text-white"
          htmlFor="flexSwitchCheckDefault"
        >
          {translate("drinkable")}
        </label>
      </div>

      <div className="d-flex justify-content-end">
        <button
          onClick={() => {
            if (imageFile !== null) {
              parseNutritionFromImage();
            } else {
              if (nutritionInfo === "" && manualNutritionInfo) {
                loadProductFromInfo(manualNutritionInfo);
              } else {
                props.loadProduct(productName, nutritionInfo, isBeverage);
              }
            }
            setNutritionInfo("");
            setProductName("");
            setIsBeverage(0);
            onClipBoardDataLoaded("");
          }}
          type="button"
          className="btn btn-outline-primary mb-3"
        >
          {translate("addProduct")}
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
