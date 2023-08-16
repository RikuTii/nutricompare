interface Translations {
  [key: string]: any;
}

let locale = "fi";

export const updateLocale = (newLocale: string) => {
  locale = newLocale;
};

const translations: Translations = {};
translations["fi"] = {
  energy: "Energia",
  protein: "Proteiini",
  calories: "Kalorit",
  carbohydrates: "Hiilihydraatit",
  fat: "Rasva",
  sugar: "Sokeri",
  salt: "Suola",

  //ui
  upload: "Lataa",
  productName: "Tuotteen nimi",
  uploadClipBoard: "Lataa tiedot leikepöydältä",
  chooseFile: "Valitse tiedosto",
  noFile: "Ei valittua tiedostoa",
  addProduct: "Lisää tuote",
  selectFromFile: "Tai lataa kuva tiedoista"
};
translations["en"] = {
  energy: "Energy",
  protein: "Protein",
  calories: "Calories",
  carbohydrates: "Carbohydrates",
  fat: "Fat",
  sugar: "Sugar",
  salt: "Salt",

    //ui
    upload: "Upload",
    productName: "Product name",
    uploadClipBoard: "Upload from clipboard",
    chooseFile: "Select file",
    noFile: "No file selected",
    addProduct: "Add product",
    selectFromFile: "Or upload picture of the information"
};

export const translate = (text: string) => {
  let translation = "";
  Object.keys(translations[locale]).map((key: string) => {
    if (key === text) {
      translation = translations[locale][key];
    }
  });

  return translation;
};
