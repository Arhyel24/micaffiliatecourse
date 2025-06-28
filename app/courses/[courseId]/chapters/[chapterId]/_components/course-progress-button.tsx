"use client";

import { CheckCircle, ArrowRight, Trophy, Sparkles } from "lucide-react";
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

  if (!nextChapterId) return null;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={isLoading}
      className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
          Loading...
        </>
      ) : (
        <>
          <span className="mr-3">Continue Learning</span>
          <ArrowRight className="w-5 h-5" />
        </>
      )}
    </motion.button>
  );
};