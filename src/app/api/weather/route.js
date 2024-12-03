// app/api/weather/route.js
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://sachet.ndma.gov.in/locales/en/weather.json");
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch data from external API" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
