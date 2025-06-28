"use client";

import { PlayCircleIcon, CheckCircle, Lock } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type CourseSidebarItemProps = {
  id: string;
  label: string | null;
  courseId: string;
  index: number;
  isCompleted?: boolean;
  isLocked?: boolean;
};

export default function CourseSidebarItem({
  id,
  label,
  courseId,
  index,
  isCompleted = false,
  isLocked = false,
}: CourseSidebarItemProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname?.includes(id);

  const onClick = () => {
    if (!isLocked) {
      router.push(`/courses/${courseId}/chapters/${id}`);
    }
  };

  const getIcon = () => {
    if (isCompleted) return CheckCircle;
    if (isLocked) return Lock;
    return PlayCircleIcon;
  };

  const Icon = getIcon();

  return (
    <motion.button
      onClick={onClick}
      disabled={isLocked}
      type="button"
      whileHover={!isLocked ? { x: 4 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
      className={cn(
        "flex items-center w-full p-4 text-left transition-all duration-200 border-l-4 hover:bg-gray-50 dark:hover:bg-gray-700/50",
        isActive
          ? "bg-blue-50 dark:bg-blue-900/20 border-l-blue-500 text-blue-700 dark:text-blue-300"
          : "border-l-transparent text-gray-700 dark:text-gray-300",
        isLocked && "opacity-60 cursor-not-allowed",
        isCompleted && !isActive && "bg-green-50 dark:bg-green-900/20 border-l-green-500"
      )}
    >
      {/* Chapter Number */}
      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mr-3",
        isActive
          ? "bg-blue-500 text-white"
          : isCompleted
          ? "bg-green-500 text-white"
          : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
      )}>
        {isCompleted ? (
          <CheckCircle className="w-4 h-4" />
        ) : (
          <span>{index}</span>
        )}
      </div>

      {/* Chapter Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4 className={cn(
            "text-sm font-medium line-clamp-2 leading-tight",
            isActive && "text-blue-700 dark:text-blue-300",
            isCompleted && !isActive && "text-green-700 dark:text-green-300"
          )}>
            {label}
          </h4>
          <Icon className={cn(
            "w-4 h-4 ml-2 flex-shrink-0",
            isActive && "text-blue-500",
            isCompleted && "text-green-500",
            isLocked && "text-gray-400"
          )} />
        </div>
        
        {/* Chapter Status */}
        <div className="flex items-center mt-1">
          <span className={cn(
            "text-xs",
            isActive && "text-blue-600 dark:text-blue-400",
            isCompleted && !isActive && "text-green-600 dark:text-green-400",
            !isActive && !isCompleted && "text-gray-500 dark:text-gray-400"
          )}>
            {isCompleted ? "Completed" : isLocked ? "Locked" : "Available"}
          </span>
        </div>
      </div>

      {/* Active Indicator */}
      {isActive && (
        <motion.div
          layoutId="activeChapter"
          className="absolute right-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-full"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </motion.button>
  );
}