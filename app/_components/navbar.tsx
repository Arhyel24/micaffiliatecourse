import { NavbarRoutes } from "@/components/navbar-routes";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <div
      className="flex h-full items-center border-b 
  bg-white dark:bg-gray-800 
  border-gray-200 dark:border-gray-700 
  p-4 shadow-sm dark:shadow-md 
  text-gray-900 dark:text-gray-100"
    >
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};
