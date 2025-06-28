import { MenuIcon, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CourseSidebar from "./course-sidebar";
import { motion } from "framer-motion";

type CourseMobileSidebarProps = {
  progressCount: number;
};

export default function CourseMobileSidebar({
  progressCount,
}: CourseMobileSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <MenuIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
        </motion.div>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-80 bg-white dark:bg-gray-900 p-0 border-r border-gray-200 dark:border-gray-700"
      >
        <CourseSidebar progressCount={progressCount} />
      </SheetContent>
    </Sheet>
  );
}
