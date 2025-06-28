import User from "@/models/userModel";
import connectDB from "@/lib/connectDataBase";
import { NextResponse } from "next/server";

export async function POST() {
  await connectDB();
  try {
    const users = await User.find({});

    // Return the users with a 200 status code
    return NextResponse.json(
      { message: "Api is working", users },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
