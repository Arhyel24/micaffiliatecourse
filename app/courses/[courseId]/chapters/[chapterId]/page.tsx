"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Preview } from "@/components/preview";
import { Separator } from "@/components/ui/separator";
import { CourseProgressButton } from "./_components/course-progress-button";
import { ChapterVideo } from "./_components/chapter-video";
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight,
  Play,
  Users,
  MessageCircle,
  Award,
  Star,
  Target,
  TrendingUp
} from "lucide-react";
import Link from "next/link";

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
          return;
        }

        setChapter(data.chapter);
        setCourse(data.course);
        setNextChapterId(data.nextChapterId || null);
      } catch (err) {
        console.error("Error loading chapter:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, chapterId, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading chapter...</p>
        </div>
      </div>
    );
  }

  if (!chapter || !course) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Chapter Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The chapter you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/courses">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Back to Courses
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/courses" className="text-blue-600 hover:text-blue-700 flex items-center">
              <BookOpen className="w-4 h-4 mr-1" />
              Courses
            </Link>
            <span className="text-gray-400">/</span>
            <Link 
              href={`/courses/${courseId}`} 
              className="text-blue-600 hover:text-blue-700 truncate max-w-xs"
            >
              {course.title}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 dark:text-gray-400 truncate max-w-xs">
              {chapter.title}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Video Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <ChapterVideo videoUrl={chapter.videoUrl} title={chapter.title} />
            </motion.div>

            {/* Chapter Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
            >
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="mb-4 lg:mb-0 flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    {chapter.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>Video Lesson</span>
                    </div>
                    <div className="flex items-center">
                      <Play className="w-4 h-4 mr-1" />
                      <span>Interactive Content</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>10,000+ Students</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <CourseProgressButton
                    courseId={courseId}
                    nextChapterId={nextChapterId}
                  />
                </div>
              </div>

              <Separator className="mb-8" />

              {/* Chapter Content */}
              <div className="prose dark:prose-invert max-w-none">
                <Preview value={chapter.description || ""} />
              </div>

              {/* Completion Section */}
              {!nextChapterId && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8 text-center border border-green-200 dark:border-green-800"
                >
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    🎉 Congratulations!
                  </h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                    You've successfully completed the entire course! You're now equipped with 
                    the knowledge and skills to succeed. Join our exclusive community to 
                    continue your journey and connect with fellow graduates.
                  </p>
                  <motion.a
                    href="https://chat.whatsapp.com/GtTnMNigNg0IoQB7gk7Cya"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold px-8 py-4 rounded-full hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Join WhatsApp Community
                  </motion.a>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-24 space-y-6"
            >
              {/* Course Progress */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                  Your Progress
                </h3>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-full h-3 mb-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${Math.random() * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Keep going! You're making excellent progress.
                </p>
              </div>

              <Separator />

              {/* Course Stats */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Course Stats</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-blue-500 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Students</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">10,000+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">95%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Rating</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">4.9/5</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Navigation */}
              <div className="space-y-3">
                <Link href={`/courses/${courseId}`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-3 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Course
                  </motion.button>
                </Link>

                {nextChapterId && (
                  <Link href={`/courses/${courseId}/chapters/${nextChapterId}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                    >
                      Next Chapter
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </motion.button>
                  </Link>
                )}
              </div>

              {/* Help Section */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2 flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  Need Help?
                </h4>
                <p className="text-xs text-blue-700 dark:text-blue-400 mb-3">
                  Join our community for support and discussions with fellow students.
                </p>
                <a
                  href="https://chat.whatsapp.com/GtTnMNigNg0IoQB7gk7Cya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Join WhatsApp Group →
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}