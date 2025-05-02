import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const currency = searchParams.get("currency");

  try {
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/INR"
    );
    const data = await response.json();

    return NextResponse(
      { rate: data.rates[currency] },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    // Fallback rate
    return new Response(
      { rate: 83.33 },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
