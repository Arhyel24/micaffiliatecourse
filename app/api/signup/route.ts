import User from "@/models/userModel";
import { hashPassword } from "@/lib/bcryptconfig";
import connectDB from "@/lib/connectDataBase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    // Parse the JSON request body
    const { username, email, password } = await req.json();

    const hashedPassword = await hashPassword(password);

    // Create a new user
    const newUser = new User({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
