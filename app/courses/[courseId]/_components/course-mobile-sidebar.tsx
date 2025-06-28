import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CourseSidebar from "./course-sidebar";
import { CourseType } from "@/lib/types";

type CourseMobileSidebarProps = {
  progressCount: number;
};

export default function CourseMobileSidebar({
  progressCount,
}: CourseMobileSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger className="pr-4 transition hover:opacity-75 md:hidden">
        <MenuIcon />
      </SheetTrigger>

      <SheetContent side="left" className="w-72 bg-white dark:bg-gray-800 p-0">
        <CourseSidebar progressCount={progressCount} />
      </SheetContent>
    </Sheet>
  );
}
