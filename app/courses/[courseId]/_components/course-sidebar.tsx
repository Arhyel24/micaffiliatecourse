"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import CourseSidebarItem from "./course-sidebar-item";
import { CourseProgress } from "@/components/course-progress";

type Chapter = {
  _id: string;
  title: string;
};

type CourseSidebarProps = {
  progressCount: number;
};

export default function CourseSidebar({ progressCount }: CourseSidebarProps) {
  const router = useRouter();
  const { courseId } = useParams() as { courseId: string };
  const [title, setTitle] = useState("Loading...");
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    if (!courseId) return;

    const fetchCourseData = async () => {
      try {
        const res = await fetch(`/api/course/${courseId}`);
        const data = await res.json();

        if (!res.ok || !data || !data._id) {
          router.push("/");
          return;
        }

        setTitle(data.title || "Untitled Course");
        setChapters(data.chapters || []);
      } catch (err) {
        console.error("Failed to load course:", err);
        router.push("/");
      }
    };

    fetchCourseData();
  }, [courseId, router]);

  return (
    <div className="flex h-full flex-col overflow-y-auto border-r shadow-sm bg-white dark:bg-gray-800">
      <div className="flex flex-col border-b p-8 bg-gray-50 dark:bg-gray-900">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h1>
        <div className="mt-10">
          <CourseProgress variant="success" value={progressCount} />
        </div>
      </div>

      <div className="flex w-full flex-col">
        {chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter._id}
            id={chapter._id}
            label={chapter.title}
            courseId={courseId}
          />
        ))}
      </div>
    </div>
  );
}
