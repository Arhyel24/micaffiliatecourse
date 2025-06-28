import { NextResponse } from "next/server";
import connectToDb from "@/lib/connectDataBase";
import { Course } from "@/models/Course";
import { Chapter } from "@/models/Course";

export async function GET(
  _req: Request,
  context: { params: Promise<{ courseId: string; chapterId: string }> }
) {
  try {
    const { courseId, chapterId } = await context.params;
    await connectToDb();

    const course = await Course.findById(courseId).populate("chapters");
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const chapter = await Chapter.findById(chapterId);
    if (!chapter || !chapter.courseId.equals(course._id as string)) {
      return NextResponse.json(
        { error: "Chapter not found in course" },
        { status: 404 }
      );
    }

    const sortedChapters = course.chapters.sort(
      (a: any, b: any) => a.order - b.order
    );
    const currentIndex = sortedChapters.findIndex((ch: any) =>
      ch._id.equals(chapter._id)
    );
    const nextChapter = sortedChapters[currentIndex + 1] || null;

    return NextResponse.json({
      chapter,
      course: { _id: course._id, title: course.title },
      nextChapterId: nextChapter?._id ?? null,
    });
  } catch (err) {
    console.error("Error fetching chapter:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
