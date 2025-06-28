"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import CourseNavbar from "../../_components/course-navbar";
import CourseSidebar from "../../_components/course-sidebar";
import { CourseType } from "@/lib/types";

export default function CourseShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [course, setCourse] = useState<CourseType | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId as string;

  useEffect(() => {
    if (!courseId) return;

    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/course/${courseId}`);
        const data = await res.json();

        if (!res.ok || !data?.chapters?.length) {
          router.push("/");
        } else {
          setCourse(data);
        }
      } catch (err) {
        console.error("Error loading course layout:", err);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, router]);

  if (loading || !course) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading course...</p>
        </div>
      </div>
    );
  }

  const progressCount = Math.floor(Math.random() * 100);

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Course Navbar - Fixed at top */}
      <div className="fixed inset-x-0 top-0 z-50 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="h-full md:pl-80">
          <CourseNavbar progressCount={progressCount} />
        </div>
      </div>

      {/* Course Sidebar - Fixed on left */}
      <div className="fixed inset-y-0 left-0 z-40 w-80 hidden md:flex">
        <CourseSidebar progressCount={progressCount} />
      </div>

      {/* Main Content Area */}
      <main className="h-full pt-16 md:pl-80 overflow-auto">
        <div className="h-full">
          {children}
        </div>
      </main>
    </div>
  );
}