const { NextResponse } = require("next/server");

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, phone, password } = body;
  } catch (err) {
    console.log(err);
  }
}
