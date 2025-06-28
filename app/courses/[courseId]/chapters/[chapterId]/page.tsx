"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Preview } from "@/components/preview";
import { Separator } from "@/components/ui/separator";
import { CourseProgressButton } from "./_components/course-progress-button";
import { ChapterVideo } from "./_components/chapter-video";
import Loading from "./loading";

export default function ChapterDetailsPage() {
  const { courseId, chapterId } = useParams() as {
    courseId: string;
    chapterId: string;
  };

  const [chapter, setChapter] = useState<any>(null);
  const [course, setCourse] = useState<any>(null);
  const [nextChapterId, setNextChapterId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!courseId || !chapterId) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/course/${courseId}/chapter/${chapterId}`);
        const data = await res.json();

        if (!res.ok || !data.chapter || !data.course) {
          // router.push("/");
          return;
        }

        setChapter(data.chapter);
        setCourse(data.course);
        setNextChapterId(data.nextChapterId || null);
      } catch (err) {
        console.error("Error loading chapter:", err);
        // router.push("/");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, chapterId, router]);

  if (loading || !chapter || !course) return <Loading />;

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen p-4 pt-12">
      <div className="mx-auto flex max-w-4xl flex-col pb-20 pt-12">
        <div className="w-full">
          <ChapterVideo videoUrl={chapter.videoUrl} title={chapter.title} />
        </div>

        <div className="mt-6 space-y-6">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 md:mb-0">
              {chapter.title}
            </h2>

            <CourseProgressButton
              courseId={courseId}
              nextChapterId={nextChapterId}
            />
          </div>

          <Separator className="dark:bg-gray-700" />

          <div className="prose dark:prose-invert max-w-full">
            <Preview value={chapter.description || ""} />
            {!nextChapterId && (
              <div className="max-w-md p-6 text-center bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:text-gray-200">
                <h2 className="text-2xl font-bold mb-4">🎉 Congratulations!</h2>
                <p className="mb-4">
                  You’ve successfully completed the course! Join our exclusive WhatsApp group for support and networking.
                </p>
                <a
                  href="https://chat.whatsapp.com/GtTnMNigNg0IoQB7gk7Cya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 text-sm font-medium text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 transition-all"
                >
                  Join WhatsApp Group
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
