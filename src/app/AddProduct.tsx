import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { ChangeEvent, useState } from "react";
import { NutritionInfo, Product } from "./types/types";
import { translate } from "./types/translations";

const AddProduct = (props: {
    loadProduct: (name: string, nutritionInfo: string) => void;
}) => {
  const [newProduct, setNewProduct] = useState<Product>();
  const [nutritionInfo, setNutritionInfo] = useState("");

  return (
    <div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder={translate('productName')}
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
        <span className="input-group-text">{translate('uploadClipBoard')}</span>
        <textarea
          className="form-control"
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
            setNutritionInfo(event.target.value);
          }}
        ></textarea>
      </div>
      <span className="text-white">{translate('selectFromFile')}</span>
      <div className="input-group mb-3">
        <input type="file" className="form-control" id="inputGroupFile02" />
        <label className="input-group-text" htmlFor="inputGroupFile02">
          {translate('upload')}
        </label>
      </div>
      <div className="d-flex justify-content-end">
        <button
          onClick={() => {
            props.loadProduct(newProduct?.name ?? '', nutritionInfo);
            setNutritionInfo('');
            setNewProduct({});
          }}
          type="button"
          className="btn btn-primary"
        >
          {translate('addProduct')}
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
