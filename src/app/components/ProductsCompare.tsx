import { translate } from "../types/translations";
import { NutritionInfo, Product } from "../types/types";
import styles from "../productStyle.module.css";
import "../styles/styles.scss";

const ProductsCompare = (props: {
  productA?: Product | undefined;
  productB?: Product | undefined;
  removeProduct: (num: number) => void;
}) => {
  const getBetterProduct = () => {
    if (props.productA && props.productB) {
      if (props.productA.nutriScore && props.productB.nutriScore) {
        if (props.productA.nutriScore === props.productB.nutriScore) {
          if (props.productA.info && props.productB.info) {
            return props.productA.info.calories > props.productB.info.calories
              ? props.productB
              : props.productA;
          }
        }
        return props.productA.nutriScore < props.productB.nutriScore
          ? props.productA
          : props.productB;
      }
    }

    return props.productA;
  };

  const roundedDelta = (num: number) => {
    return Math.abs(num).toFixed(1);
  };

  const getTextColor = (key: string) => {
    if (!props.productA || !props.productB) return { color: "green" };
    if (!props.productA.info || !props.productB.info) return { color: "green" };

    const a = Object.keys(props.productA.info).findIndex((e) => e === key);
    const b = Object.keys(props.productB.info).findIndex((e) => e === key);
    if (a < 0 || b < 0) return { color: "green" };

    let value =
      Object.values(props.productA.info)[a] -
      Object.values(props.productB.info)[b];

    const betterProduct = getBetterProduct();
    if (betterProduct && betterProduct?.id === props.productB.id) {
      value =
        Object.values(props.productB.info)[b] -
        Object.values(props.productA.info)[a];
    }

    if (key === "protein" || key === "fibre") {
      if (value === 0) {
        return { color: "gray" };
      } else if (value > 0) {
        return { color: "green" };
      }

      return { color: "red" };
    }

    if (value === 0) {
      return { color: "gray" };
    } else if (value < 0) {
      return { color: "green" };
    }
    return { color: "red" };
  };

  const betterProduct = getBetterProduct();
  const compareProduct =
    betterProduct?.id === props.productA?.id ? props.productB : props.productA;

  if (!betterProduct) return <></>;

  return (
    <div className="row m-0">
      <div className={styles.Productframe}>
        <div className={styles.ProductRow} style={{ marginTop: 10 }}>
          <div className="col">
            <p>
              {betterProduct?.name ? betterProduct.name : translate("product")}{" "}
              {compareProduct?.name ? "" : "1"}
            </p>
          </div>
          <div className="col col-md-2 d-flex justify-content-end">
            {props.productA && (
              <div
                className={styles.RemoveButton}
                onClick={(e) => props.removeProduct(betterProduct?.id ?? 0)}
              >
                <div className={styles.CrossContainer}>
                  <span className={styles.RemoveCrossLeft}></span>
                  <span className={styles.RemoveCrossRight}></span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.ProductRow}>
          <div className="col col-md-6">
            <p>{translate("energy")}</p>
          </div>
          <div className="col col-md-4 col-table-small">
            {betterProduct?.info?.calories} kcal
          </div>
          <div className="col col-md-2 d-flex justify-content-end">
            {compareProduct && (
              <p style={getTextColor("calories")}>
                {(compareProduct?.info?.calories ?? 0) -
                  (betterProduct?.info?.calories ?? 0)}{" "}
              </p>
            )}
          </div>
        </div>

        <div className={styles.ProductRow}>
          <div className="col col-md-6">
            <p>{translate("fat")}</p>
          </div>
          <div className="col col-md-4 col-table-small">
            {betterProduct?.info?.totalFat} g
          </div>
          <div className="col col-md-2 d-flex justify-content-end">
            {compareProduct && (
              <p style={getTextColor("totalFat")}>
                {roundedDelta(
                  (compareProduct?.info?.totalFat ?? 0) -
                    (betterProduct?.info?.totalFat ?? 0)
                )}{" "}
                g
              </p>
            )}
          </div>
        </div>
        <div className={styles.ProductRow}>
          <div className="col col-md-6">
            <small>{translate("saturatedFatUi")}</small>
          </div>
          <div className="col col-md-4 col-table-small">
            <small>{betterProduct?.info?.saturatedFat} g</small>
          </div>
          <div className="col col-md-2 d-flex justify-content-end">
            {compareProduct && (
              <small style={getTextColor("saturatedFat")}>
                {roundedDelta(
                  (compareProduct?.info?.saturatedFat ?? 0) -
                    (betterProduct?.info?.saturatedFat ?? 0)
                )}{" "}
                g
              </small>
            )}
          </div>
        </div>
        <div className={styles.ProductRow}>
          <div className="col col-md-6">
            <p>{translate("carbohydratesUi")}</p>
          </div>
          <div className="col col-md-4 col-table-small">
            {betterProduct?.info?.carbohydrates} g
          </div>
          <div className="col col-md-2 d-flex justify-content-end">
            {compareProduct && (
              <p style={getTextColor("carbohydrates")}>
                {roundedDelta(
                  (compareProduct?.info?.carbohydrates ?? 0) -
                    (betterProduct?.info?.carbohydrates ?? 0)
                )}{" "}
                g
              </p>
            )}
          </div>
        </div>
        <div className={styles.ProductRow}>
          <div className="col col-md-6">
            <small>{translate("sugarUi")}</small>
          </div>
          <div className="col col-md-4 col-table-small">
            <small>{betterProduct?.info?.sugars} g</small>
          </div>
          <div className="col col-md-2 d-flex justify-content-end">
            {compareProduct && (
              <small style={getTextColor("sugars")}>
                {roundedDelta(
                  (compareProduct?.info?.sugars ?? 0) -
                    (betterProduct?.info?.sugars ?? 0)
                )}{" "}
                g
              </small>
            )}
          </div>
        </div>
        <div className={styles.ProductRow}>
          <div className="col col-md-6">
            <p>{translate("fibre")}</p>
          </div>
          <div className="col col-md-4 col-table-small">
            {betterProduct?.info?.fibre} g
          </div>
          <div className="col col-md-2 d-flex justify-content-end">
            {compareProduct && (
              <p style={getTextColor("fibre")}>
                {roundedDelta(
                  (compareProduct?.info?.fibre ?? 0) -
                    (betterProduct?.info?.fibre ?? 0)
                )}{" "}
                g
              </p>
            )}
          </div>
        </div>
        <div className={styles.ProductRow}>
          <div className="col col-md-6">
            <p>{translate("protein")}</p>
          </div>
          <div className="col col-md-4 col-table-small">
            {betterProduct?.info?.protein} g
          </div>
          <div className="col col-md-2 d-flex justify-content-end">
            {compareProduct && (
              <p style={getTextColor("protein")}>
                {roundedDelta(
                  (compareProduct?.info?.protein ?? 0) -
                    (betterProduct?.info?.protein ?? 0)
                )}{" "}
                g
              </p>
            )}
          </div>
        </div>
        <div className={styles.ProductRow}>
          <div className="col col-md-6">
            <p>{translate("salt")}</p>
          </div>
          <div className="col col-md-4 col-table-small">
            {betterProduct?.info?.salt} g
          </div>
          <div className="col col-md-2 d-flex justify-content-end">
            {compareProduct && (
              <p style={getTextColor("salt")}>
                {roundedDelta(
                  (compareProduct?.info?.salt ?? 0) -
                    (betterProduct?.info?.salt ?? 0)
                )}{" "}
                g
              </p>
            )}
          </div>
        </div>
      </div>

      <div className={styles.Productframe}>
        <div className={styles.ProductRow} style={{ marginTop: 10 }}>
          <div className="col">
            <p>
              {compareProduct?.name
                ? compareProduct.name
                : translate("product")}{" "}
              {compareProduct?.name ? "" : "2"}
            </p>
          </div>

          {props.productB && (
            <div className="col col-md-2 d-flex justify-content-end">
              <div
                className={styles.RemoveButton}
                onClick={(e) => props.removeProduct(compareProduct?.id ?? 0)}
              >
                <div className={styles.CrossContainer}>
                  <span className={styles.RemoveCrossLeft}></span>
                  <span className={styles.RemoveCrossRight}></span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={styles.ProductRow}>
          <div className="col col-md-6">{translate("energy")}</div>
          <div className="col col-md-6">
            {compareProduct?.info?.calories} kcal
          </div>
        </div>
        <div className={styles.ProductRow}>
          <div className="col col-md-6">{translate("fat")}</div>
          <div className="col col-md-6">{compareProduct?.info?.totalFat} g</div>
        </div>
        <div className={styles.ProductRow}>
          <div className="col col-md-6">
            <small>{translate("saturatedFatUi")}</small>
          </div>
          <div className="col col-md-6">
            <small>{compareProduct?.info?.saturatedFat} g</small>
          </div>
        </div>
        <div className={styles.ProductRow}>
          <div className="col col-md-6">{translate("carbohydratesUi")} </div>
          <div className="col col-md-6">
            {compareProduct?.info?.carbohydrates} g
          </div>
        </div>
        <div className={styles.ProductRow}>
          <div className="col col-md-6">
            <small>{translate("sugarUi")}</small>
          </div>

          <div className="col col-md-6">
            <small>{compareProduct?.info?.sugars} g</small>
          </div>
        </div>
        <div className={styles.ProductRow}>
          <div className="col col-md-6">{translate("fibre")} </div>
          <div className="col col-md-6">{compareProduct?.info?.fibre} g</div>
        </div>
        <div className={styles.ProductRow}>
          <div className="col col-md-6">{translate("protein")} </div>
          <div className="col col-md-6">{compareProduct?.info?.protein} g</div>
        </div>
        <div className={styles.ProductRow}>
          <div className="col col-md-6">{translate("salt")} </div>
          <div className="col col-md-6">{compareProduct?.info?.salt} g</div>
        </div>
      </div>
    </div>
  );
};

export default ProductsCompare;
