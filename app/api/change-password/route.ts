import User from "@/models/userModel";
import connectDB from "@/lib/connectDataBase";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Input validation function
function validatePassword(password: string): string | null {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters long";
  if (!/[A-Z]/.test(password))
    return "Password must contain at least one uppercase letter";
  if (!/[a-z]/.test(password))
    return "Password must contain at least one lowercase letter";
  if (!/[0-9]/.test(password))
    return "Password must contain at least one number";
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
    return "Password must contain at least one special character";
  return null;
}

export async function POST(req: NextRequest) {
  try {
    // Ensure database connection
    await connectDB();

    // Parse the JSON request body
    const { email, currentPassword, newPassword } = await req.json();

    // Validate inputs
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Validate new password
    const passwordValidationError = validatePassword(newPassword);
    if (passwordValidationError) {
      return NextResponse.json(
        { message: passwordValidationError },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Verify current password
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Current password is incorrect" },
        { status: 401 }
      );
    }

    // Check if new password is different from current password
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return NextResponse.json(
        { message: "New password must be different from current password" },
        { status: 400 }
      );
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user password
    user.password = hashedPassword;
    await user.save();

    // Return success response
    return NextResponse.json(
      {
        message: "Password changed successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Password change error:", error);

    // Differentiate between different types of errors
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "Error changing password",
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
