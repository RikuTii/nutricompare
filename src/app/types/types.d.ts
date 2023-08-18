export type NutritionInfo = {
    calories: number;
    carbohydrates: number;
    saturatedFat?: number;
    unSaturatedFat?: number;
    totalFat: number;
    protein: number;
    sugars: number;
    salt?: number;
    fibre?: number;
  };


export type Product = {
    id: number;
    name?: string;
    info?: NutritionInfo;
    nutriScore?: string;
    type?: ProductType;
  };