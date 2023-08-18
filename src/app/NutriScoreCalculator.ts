import { Product } from "./types/types";


const nutriTable = {
    'cal': 80,
    'sugar': 4.5,
    'fat': 1,
    'salt': 90,
    'fibre': 0.7,
    'protein': 1.6
};
const nutriTableBeverage = {
    'cal': 7.2,
    'sugar': 1.5,
};


export const getNutriScore = (product: Product) => {
    if(!product.info) return 'E';
    const a = product.info.calories / (product.type === 'food' ? nutriTable['cal'] : nutriTableBeverage['cal']);
    const b = product.info.sugars / (product.type === 'food' ? nutriTable['sugar'] : nutriTableBeverage['sugar']);
    const c = product.info.saturatedFat ?? 1 / nutriTable['fat'];
    let sodium = 0.1;
    console.log(product.type);

    if(product.info?.salt) {
        sodium = (product.info?.salt * 1000) * 0.4;
    }
    const d = sodium / nutriTable['salt'];

    const e = 0;//fruit/vegetable
    const f = Math.min(product.info?.fibre ?? 1 / nutriTable['fibre'], 5);
    const g = Math.min(product.info.protein ?? 1 / nutriTable['protein'], 5);

    const n = (a + b + c + d);
    const p = (e + f + g);

    const total = Math.ceil(n - p);

    if(product.type === 'beverage') {
        if(total == 0) {
            return 'A';
        } else if(total >= 1 && total <= 2) {
            return 'B';
        } else if(total >= 3 && total <= 4) {
            return 'C';
        }
        else if(total >= 5 && total <= 8) {
            return 'D';
        } else {
            return 'E';
        }
    }

    if(total <= -1) {
        return 'A';
    } else if(total >= 0 && total <= 2) {
        return 'B';
    } else if(total >= 3 && total <= 10) {
        return 'C';
    }
    else if(total >= 11 && total <= 18) {
        return 'D';
    } else {
        return 'E';
    }
}