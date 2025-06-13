import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("Sell car data received:", data);

    // In a real application, you would save this data to your database
    // For example: await db.collection('car_listings').add(data);

    return NextResponse.json({ message: "Car listing submitted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ message: "Error submitting car listing." }, { status: 500 });
  }
} 