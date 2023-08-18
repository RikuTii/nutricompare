import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { ChangeEvent, useEffect, useState } from "react";
import { translate } from "./types/translations";
import { NutritionInfo } from "./types/types";
import ProductInput from "./ProductInput";

const AddProduct = (props: {
  loadProduct: (name: string, nutritionInfo: string, isBeverage: number) => void;
  loadProductDirect: (name: string, nutritionInfo: NutritionInfo, isBeverage: number) => void;
}) => {
  const [productName, setProductName] = useState("");
  const [nutritionInfo, setNutritionInfo] = useState("");
  const [manualNutritionInfo, setManualNutritionInfo] =
    useState<NutritionInfo>();
  const [imageFile, setImagefile] = useState<File | null>(null);
  const [showInput, setShowInput] = useState(false);
  const [isBeverage, setIsBeverage] = useState(0);

  async function parseNutritionFromImage() {
    const formData = new FormData();
    if (imageFile) {
      formData.append("file", imageFile);
    }
    formData.append("language", "fin");
    formData.append("isTable", "true");

    const response = await fetch("https://api.ocr.space/parse/image", {
      method: "POST",
      headers: {
        apikey: process.env.NEXT_PUBLIC_OCR_API_KEY ?? "",
      },
      body: formData,
    });

    const data = await response.json();
    if (data && data.IsErroredOnProcessing === false) {
      props.loadProduct(productName, data.ParsedResults[0].ParsedText, isBeverage);
    }
  }

  const loadProductFromInfo = (info: NutritionInfo) => {
    props.loadProductDirect(productName, info, isBeverage);
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
      <div className="input-group">
        <span className="input-group-text">{translate("uploadClipBoard")}</span>
        <textarea
          className="form-control"
          value={nutritionInfo}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
            setNutritionInfo(event.target.value);
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
      <span className="text-white" onClick={() => setShowInput(!showInput)}>
        {translate("inputManually")}
      </span>

      {showInput && (
        <ProductInput onInfoUpdate={(info) => setManualNutritionInfo(info)} />
      )}

      <div className="form-check form-switch mt-2">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          value={isBeverage}
          id="flexSwitchCheckDefault"
          onClick={e => setIsBeverage(isBeverage ? 0 : 1)}
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
          }}
          type="button"
          className="btn btn-primary mb-3"
        >
          {translate("addProduct")}
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
