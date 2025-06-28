import { CourseType } from "@/lib/types";
import CourseMobileSidebar from "./course-mobile-sidebar";
import { NavbarRoutes } from "@/components/navbar-routes";
import { motion } from "framer-motion";
import { BookOpen, Users, Award } from "lucide-react";

type CourseNavbarProps = { progressCount: number };

export default function CourseNavbar({
  progressCount,
}: CourseNavbarProps) {
  return (
    <div className="flex h-full items-center justify-between bg-white dark:bg-gray-800 px-4 shadow-sm">
      {/* Left side - Mobile sidebar and logo */}
      <div className="flex items-center space-x-4">
        <CourseMobileSidebar progressCount={progressCount} />
        
        {/* Course Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex items-center space-x-3"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            MIC Learning
          </span>
        </motion.div>
      </div>

      {/* Center - Course Stats */}
      <div className="hidden lg:flex items-center space-x-6">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Users className="w-4 h-4" />
          <span>10,000+ Students</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Award className="w-4 h-4" />
          <span>4.9/5 Rating</span>
        </div>
      </div>

      {/* Right side - Navigation routes */}
      <div className="flex items-center">
        <NavbarRoutes />
      </div>
    </div>
  );
}