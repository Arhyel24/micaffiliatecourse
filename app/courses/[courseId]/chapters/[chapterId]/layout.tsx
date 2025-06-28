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

  if (loading || !course) return null;

  const progressCount = Math.floor(Math.random() * 100);

  return (
    <div className="h-full bg-white dark:bg-gray-900">
      <div className="fixed inset-y-0 z-50 h-20 w-full md:pl-80 bg-white dark:bg-gray-800">
        <CourseNavbar progressCount={progressCount} />
      </div>

      <div className="fixed inset-y-0 z-50 hidden h-full w-80 flex-col md:flex bg-white dark:bg-gray-800">
        <CourseSidebar progressCount={progressCount} />
      </div>

      <main className="h-full md:pl-80 bg-gray-100 dark:bg-gray-900">
        {children}
      </main>
    </div>
  );
}
