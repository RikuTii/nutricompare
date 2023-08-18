import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { ChangeEvent, useState, useEffect } from "react";
import { translate } from "./types/translations";
import { NutritionInfo } from "./types/types";

const ProductInput = (props: {
  onInfoUpdate: (nutritionInfo: NutritionInfo) => void;
}) => {
  const [calories, setCalories] = useState("");
  const [totalFat, setTotalFat] = useState("");
  const [saturatedFat, setSaturatedFat] = useState("");
  const [sugar, setSugar] = useState("");
  const [carbohydrates, setCarbohydrates] = useState("");
  const [salt, setSalt] = useState("");
  const [fibre, setFibre] = useState("");
  const [protein, setProtein] = useState("");

  const updateNutrition = () => {
    const info: NutritionInfo = {
      calories: Number(calories),
      totalFat: Number(totalFat),
      saturatedFat: Number(saturatedFat),
      sugars: Number(sugar),
      carbohydrates: Number(carbohydrates),
      salt: Number(salt),
      fibre: Number(fibre),
      protein: Number(protein),
    };
    props.onInfoUpdate(info);
  };


  useEffect(() => {
    updateNutrition();
  }, [
    calories,
    totalFat,
    saturatedFat,
    sugar,
    carbohydrates,
    salt,
    fibre,
    protein,
  ]);


  return (
    <div>
      <div className="justify-content-between d-flex flex-wrap">
        <div className="row row-cols-5">
          <div className="col-6 col-sm-4 col-md-3">
            <label className="text-white" htmlFor="productCalories">
              {translate("calories")}
            </label>
            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control"
                id="productCalories"
                value={calories}
                placeholder={translate("productName")}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setCalories(event.target.value)
                }
              />
            </div>
          </div>
          <div className="col-6 col-sm-4 col-md-3">
            <label className="text-white" htmlFor="productFat">
              {translate("fat")}
            </label>
            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control"
                id="productFat"
                value={totalFat}
                placeholder={translate("fat")}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setTotalFat(event.target.value)
                }
              />
            </div>
          </div>
          <div className="col-6 col-sm-4 col-md-3">
            <label className="text-white" htmlFor="saturatedFat">
              {translate("saturatedFatUi")}
            </label>
            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control"
                id="saturatedFat"
                value={saturatedFat}
                placeholder={translate("saturatedFatUi")}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setSaturatedFat(event.target.value)
                }
              />
            </div>
          </div>

          <div className="col-6 col-sm-4 col-md-3">
            <label className="text-white" htmlFor="carbohydrates">
              {translate("carbohydratesUi")}
            </label>
            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control"
                id="carbohydrates"
                value={carbohydrates}
                placeholder={translate("carbohydratesUi")}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setCarbohydrates(event.target.value)
                }
              />
            </div>
          </div>
          <div className="col-6 col-sm-4 col-md-3">
            <label className="text-white" htmlFor="protein">
              {translate("protein")}
            </label>
            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control"
                id="protein"
                value={protein}
                placeholder={translate("protein")}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setProtein(event.target.value)
                }
              />
            </div>
          </div>
          <div className="col-6 col-sm-4 col-md-3">
            <label className="text-white" htmlFor="sugar">
              {translate("sugarUi")}
            </label>
            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control"
                id="sugar"
                value={sugar}
                placeholder={translate("sugarUi")}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setSugar(event.target.value)
                }
              />
            </div>
          </div>
          <div className="col-6 col-sm-4 col-md-3">
            <label className="text-white" htmlFor="fibre">
              {translate("fibre")}
            </label>
            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control"
                id="fibre"
                value={fibre}
                placeholder={translate("fibre")}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setFibre(event.target.value)
                }
              />
            </div>
          </div>
          <div className="col-6 col-sm-4 col-md-3">
            <label className="text-white" htmlFor="salt">
              {translate("salt")}
            </label>
            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control"
                id="salt"
                value={salt}
                placeholder={translate("salt")}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setSalt(event.target.value)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInput;
