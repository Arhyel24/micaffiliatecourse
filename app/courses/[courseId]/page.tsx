"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  Play,
  Clock,
  Users,
  Star,
  CheckCircle,
  BookOpen,
  Award,
  TrendingUp,
  Target,
} from "lucide-react";
import { NavBar } from "@/components/navbar";
import { MyFooter } from "@/components/footer";

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
  const [showAllChapters, setShowAllChapters] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;

      try {
        const res = await fetch(`/api/course/${courseId}`);
        const data = await res.json();

        if (!res.ok || !data || !data.chapters || data.chapters.length === 0) {
          router.push("/courses");
        } else {
          setCourse(data);
        }
      } catch (err) {
        console.error("Failed to fetch course:", err);
        router.push("/courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, router]);

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Loading course...
            </p>
          </div>
        </div>
      </>
    );
  }

  if (!course) return null;

  const visibleChapters = showAllChapters
    ? course.chapters
    : course.chapters.slice(0, 5);

  const benefits = [
    "Lifetime access to all course materials",
    "Step-by-step video tutorials",
    "Downloadable resources and templates",
    "Access to exclusive community",
    "Certificate of completion",
    "30-day money-back guarantee",
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Content",
      description: `${course.chapters.length} detailed chapters covering everything you need to know`,
    },
    {
      icon: Play,
      title: "Video Lessons",
      description: "High-quality video content with practical demonstrations",
    },
    {
      icon: Users,
      title: "Community Access",
      description:
        "Join thousands of students in our exclusive learning community",
    },
    {
      icon: Award,
      title: "Expert Instruction",
      description:
        "Learn from Coach Adams, a proven expert with 5+ years experience",
    },
  ];

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
                >
                  <Star className="w-4 h-4 text-yellow-400 mr-2" />
                  <span className="text-sm font-medium">Bestseller Course</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl lg:text-6xl font-bold mb-6"
                >
                  {course.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-blue-100 mb-8 leading-relaxed"
                >
                  {course.description}
                </motion.p>

                {/* Course Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-6 mb-8"
                >
                  <div className="flex items-center">
                    <BookOpen className="w-5 h-5 text-blue-300 mr-2" />
                    <span className="text-blue-100">
                      {course.chapters.length} Chapters
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-blue-300 mr-2" />
                    <span className="text-blue-100">Lifetime Access</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-blue-300 mr-2" />
                    <span className="text-blue-100">10,000+ Students</span>
                  </div>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link
                    href={`/courses/${course._id}/chapters/${course.chapters[0]._id}`}
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-8 py-4 rounded-full 
                               hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 
                               flex items-center shadow-2xl"
                    >
                      Start Learning Now
                      <Play className="ml-2 w-5 h-5" />
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right Content - Course Image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <div className="relative w-full h-80 rounded-2xl overflow-hidden">
                    {course.imageUrl && (
                      <Image
                        src={course.imageUrl}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer"
                      >
                        <Play className="w-8 h-8 text-white ml-1" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Course Info Card */}
                  <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-semibold">
                          Course Rating
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 text-yellow-400 fill-current"
                            />
                          ))}
                          <span className="text-blue-100 ml-2">
                            4.9 (2,500+ reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Why Choose This Course?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                This comprehensive course is designed to take you from beginner
                to expert with proven strategies and hands-on learning.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Course Content Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Course Content
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {course.chapters.length} comprehensive chapters designed to
                transform your skills
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Chapters ({course.chapters.length})
                </h3>
              </div>

              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {visibleChapters.map((chapter, index) => (
                  <motion.div
                    key={chapter._id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="p-6 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    <Link
                      href={`/courses/${course._id}/chapters/${chapter._id}`}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                          <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {chapter.title}
                          </h4>
                        </div>
                        <Play className="w-5 h-5 text-gray-400" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {course.chapters.length > 5 && (
                <div className="p-6 border-t border-gray-200 dark:border-gray-700 text-center">
                  <button
                    onClick={() => setShowAllChapters(!showAllChapters)}
                    className="flex items-center justify-center mx-auto text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                  >
                    {showAllChapters ? (
                      <>
                        Show Less <ChevronUp className="ml-1 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Show All {course.chapters.length} Chapters{" "}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  What You'll Get
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                  This course includes everything you need to succeed, with
                  lifetime access and ongoing support from our community.
                </p>

                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center"
                    >
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {benefit}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center"
              >
                <TrendingUp className="w-16 h-16 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">
                  Start Your Success Journey
                </h3>
                <p className="text-blue-100 mb-6">
                  Join thousands of successful students who have transformed
                  their lives with this course.
                </p>
                <Link
                  href={`/courses/${course._id}/chapters/${course.chapters[0]._id}`}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-blue-600 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg"
                  >
                    Begin Course Now
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
      <MyFooter />
    </>
  );
}
