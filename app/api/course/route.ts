import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDataBase";
import { Course } from "@/models/Course";

export async function GET() {
  try {
    await connectDB();

    const courses = await Course.find().populate("chapters").lean();

    if (!courses || courses.length === 0) {
      return NextResponse.json({ error: "No courses found" }, { status: 404 });
    }

    return NextResponse.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
