"use client";

import { CheckCircle, XCircle, ChevronsRight, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

interface CourseProgressButtonProps {
  courseId: string;
  nextChapterId?: string | null;
}

export const CourseProgressButton = ({
  courseId,
  nextChapterId,
}: CourseProgressButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }

      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (!nextChapterId) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 rounded-lg px-4 py-3"
      >
        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
        <span className="text-green-700 dark:text-green-300 font-medium">
          Course Completed!
        </span>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={isLoading}
      className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Loading...
        </>
      ) : (
        <>
          Next Chapter
          <ArrowRight className="w-4 h-4 ml-2" />
        </>
      )}
    </motion.button>
  );
};