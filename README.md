# Nutricompare

Application to compare nutritional information of products built with [NextJS](https://nextjs.org/).

## Features

- Parsing product information from text
- Parsing product information from images
- Input information manually
- Calculate product [Nutri-Score](https://sante.gouv.fr/IMG/pdf/nutri-score_follow-up_report_3_years_26juillet2021.pdf) based on the parsed information
- Table showing key nutritional values of added products
- Sort products based on nutritional values
- Compare two products side by side and see nutritional differences


## Getting Started

Acquire free OCR api key for parsing image data from [here](https://ocr.space/ocrapi) and 
then create .env.local file at the project root with the key set as shown
```bash
OCR_API_KEY=
```


Then install dependencies:
```bash
npm install
```

And run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

