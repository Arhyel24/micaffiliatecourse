import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/AuthOptions";
import { Course } from "@/models/Course";
import type { ICourse } from "@/models/Course";
import connectDB from "@/lib/connectDataBase";

export async function GET(
  req: Request,
  context: { params: Promise<{ courseId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { courseId } = await context.params;
  if (!courseId) {
    return NextResponse.json(
      { error: "Course ID is required" },
      { status: 400 }
    );
  }

  console.log("Course Id:", courseId)

  try {
    await connectDB();

    const course: ICourse | null = await Course.findById(courseId)
      .populate({
        path: "chapters",
        options: { sort: { order: 1 } },
      })
      .lean();

    if (!course || !course.chapters || course.chapters.length === 0) {
      return NextResponse.json(
        { error: "Course not found or has no chapters" },
        { status: 404 }
      );
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}