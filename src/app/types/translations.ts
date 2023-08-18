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
  carbohydrates: "Hiilihydr",
  fat: "Rasva",
  sugar: "soker",
  salt: "Suola",
  fibre: "Kuitu",
  altFibre: "kuidut",
  saturatedFat: "Tyydytty",

  //

  //ui
  upload: "Lataa",
  productName: "Tuotteen nimi",
  uploadClipBoard: "Lataa tiedot leikepöydältä",
  chooseFile: "Valitse tiedosto",
  noFile: "Ei valittua tiedostoa",
  addProduct: "Lisää tuote",
  selectFromFile: "Tai lataa kuva tiedoista",
  sugarUi: "Sokeri",
  noInformation: "Ei tietoa",
  carbohydratesUi: "Hiilihydraatit",
  inputManually: "Syötä manuaalisesti",
  saturatedFatUi: "Tyydyttynyt rasva",
  drinkable: "Juotava",

};
translations["en"] = {
  energy: "Energy",
  protein: "Protein",
  calories: "Calories",
  carbohydrates: "Carbohydrates",
  fat: "Fat",
  sugar: "Sugar",
  salt: "Salt",
  fibre: "Fibre",
  saturatedFat: "Saturated",
  altFibre: "Fiber",

  //ui
  upload: "Upload",
  productName: "Product name",
  uploadClipBoard: "Upload from clipboard",
  chooseFile: "Select file",
  noFile: "No file selected",
  addProduct: "Add product",
  selectFromFile: "Or upload picture of the information",
  sugarUi: "Sugar",
  noInformation: "No info",
  carbohydratesUi: "Carbohydrates",
  inputManually: "Input manually",
  saturatedFatUi: "Saturated fat",
  drinkable: "Drinkable",
  
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
