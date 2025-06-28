import User from "@/models/userModel";
import connectDB from "@/lib/connectDataBase";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"; // Recommended for validation

// Input validation schema
const UpdateProfileSchema = z.object({
  email: z.string().email("Invalid email format"),
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .optional(),
  imageUrl: z.string().url("Invalid image URL").optional(),
});

export async function POST(req: NextRequest) {
  try {
    // Ensure database connection
    await connectDB();

    // Parse the JSON request body
    const body = await req.json();

    // Validate input using Zod
    const validationResult = UpdateProfileSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: "Invalid input",
          errors: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const { email, username, imageUrl } = validationResult.data;

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update user profile
    if (username) {
      user.username = username;
    }

    if (imageUrl) {
      user.image = imageUrl;
    }

    // Save updated user
    await user.save();

    // Return success response
    return NextResponse.json(
      {
        message: "Profile updated successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    // Log the full error for server-side debugging
    console.error("Profile update error:", error);

    // Handle specific error types
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      // Mongoose validation errors or other specific errors
      return NextResponse.json(
        {
          message: "Error updating profile",
          error: error.message,
        },
        { status: 500 }
      );
    }

    // Fallback for unexpected errors
    return NextResponse.json(
      {
        message: "Unexpected error occurred",
      },
      { status: 500 }
    );
  }
}

// Optional: Add CORS handling if needed
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}
