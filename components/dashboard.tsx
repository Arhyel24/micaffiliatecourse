"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Clock } from "lucide-react";
import { InfoCard } from "./ui/info-card";
import CoursesList from "./ui/course-list";
import type { ICourse } from "@/models/Course";

export default function Dashboard() {
  const [coursesInProgress, setCoursesInProgress] = useState<ICourse[]>([]);
  const [completedCourses, setCompletedCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/course");
        const data = await res.json();

        if (Array.isArray(data)) {
          setCoursesInProgress(data);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="space-y-4 p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
          variant="default"
        />
        <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
        />
      </div>
      {loading ? (
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Loading courses...
        </p>
      ) : (
        <CoursesList items={[...coursesInProgress, ...completedCourses]} />
      )}
    </div>
  );
}
