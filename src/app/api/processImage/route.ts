import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await fetch("https://api.ocr.space/parse/image", {
    method: "POST",
    headers: {
      apikey: process.env.OCR_API_KEY ?? "",
    },
    body: await request.formData(),
  });

  const data = await res.json();

  return NextResponse.json(data);
}
