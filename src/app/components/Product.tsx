import { Product } from "../types/types";

const ProductView = (props: { product: Product }) => {
  return (
    <div>
        <p className="text-white">{props.product.name}</p>
        <p className="text-white">{props.product.info?.calories}</p>
    </div>
    );
};

export default ProductView;
