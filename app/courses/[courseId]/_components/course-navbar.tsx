import { CourseType } from "@/lib/types";
import CourseMobileSidebar from "./course-mobile-sidebar";
import { NavbarRoutes } from "@/components/navbar-routes";

type CourseNavbarProps = { progressCount: number };

export default function CourseNavbar({
  progressCount,
}: CourseNavbarProps) {
  return (
    <div className="flex h-full items-center border-b bg-white dark:bg-gray-800 p-4 shadow-sm dark:shadow-md">
      <CourseMobileSidebar progressCount={progressCount} />
      <NavbarRoutes />
    </div>
  );
}
