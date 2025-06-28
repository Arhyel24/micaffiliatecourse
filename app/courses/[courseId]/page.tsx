"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Chapter {
  _id: string;
  title: string;
}

interface CourseType {
  _id: string;
  title: string;
  author: string;
  category: string;
  duration: string;
  description: string;
  imageUrl?: string;
  chapters: Chapter[];
}

export default function CourseIdPage() {
  const router = useRouter();
  const params = useParams();
  const { courseId } = params as { courseId: string };

  const [course, setCourse] = useState<CourseType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;

      try {
        console.log("Fetching course with ID:", courseId);
        const res = await fetch(`/api/course/${courseId}`);
        const data = await res.json();

        if (!res.ok || !data || !data.chapters || data.chapters.length === 0) {
          router.push("/");
        } else {
          console.log("Fetched course data:", data);
          setCourse(data);
        }
      } catch (err) {
        console.error("Failed to fetch course:", err);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, router]);

  if (loading) {
    return <p className="p-6 text-center">Loading...</p>;
  }

  if (!course) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-900 dark:text-white">
      <div className="rounded-xl overflow-hidden shadow-lg dark:shadow-white/10">
        {course.imageUrl && (
          <Image
            src={course.imageUrl}
            alt="Course image"
            width={1200}
            height={500}
            className="w-full h-64 object-cover"
          />
        )}
        <div className="bg-white dark:bg-gray-900 p-6">
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            By {course.author || "None"}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Category: {course.category || "General"}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Duration: {course.duration || "N/A"}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            {course.description}
          </p>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Chapters</h2>
            <ChapterList chapters={course.chapters} />
          </div>

          <Link
            href={`/courses/${course._id}/chapters/${course.chapters[0]._id}`}
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600 shadow-md"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}

function ChapterList({
  chapters,
}: {
  chapters: Chapter[];
}) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? chapters : chapters.slice(0, 5);

  return (
    <>
      <ul className="space-y-2">
        {visible.map((ch) => (
          <li
            key={ch._id}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 hover:shadow-sm transition"
          >
            {ch.title}
          </li>
        ))}
      </ul>
      {chapters.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 flex items-center text-blue-600 dark:text-blue-400 hover:underline"
        >
          {showAll ? (
            <>
              Show Less <ChevronUp className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              Show All {chapters.length} Chapters{" "}
              <ChevronDown className="ml-1 h-4 w-4" />
            </>
          )}
        </button>
      )}
    </>
  );
}
