"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import CourseSidebarItem from "./course-sidebar-item";
import { CourseProgress } from "@/components/course-progress";
import { motion } from "framer-motion";
import { BookOpen, Clock, Users, Award, Star } from "lucide-react";

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
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId, router]);

  if (loading) {
    return (
      <div className="flex h-full flex-col bg-white dark:bg-gray-800">
        <div className="p-8 border-b border-gray-200 dark:border-gray-700">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
        </div>
        <div className="flex-1 p-4 space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      {/* Course Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
              {title}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {chapters.length} chapters
            </p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Your Progress</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {progressCount}%
            </span>
          </div>
          <CourseProgress variant="success" value={progressCount} />
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-700">
            <Users className="w-4 h-4 text-blue-500 mx-auto mb-1" />
            <div className="text-xs font-semibold text-gray-900 dark:text-white">10K+</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Students</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-700">
            <Star className="w-4 h-4 text-yellow-500 mx-auto mb-1" />
            <div className="text-xs font-semibold text-gray-900 dark:text-white">4.9</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Rating</div>
          </div>
        </div>
      </motion.div>

      {/* Chapters List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            Course Content
          </h3>
        </div>
        
        <div className="space-y-1">
          {chapters.map((chapter, index) => (
            <motion.div
              key={chapter._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <CourseSidebarItem
                id={chapter._id}
                label={chapter.title}
                courseId={courseId}
                index={index + 1}
              />
            </motion.div>
          ))}
        </div>

        {chapters.length === 0 && (
          <div className="p-8 text-center">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">No chapters available</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            Need help? Join our community
          </p>
          <a
            href="https://chat.whatsapp.com/GtTnMNigNg0IoQB7gk7Cya"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            WhatsApp Support Group →
          </a>
        </div>
      </div>
    </div>
  );
}