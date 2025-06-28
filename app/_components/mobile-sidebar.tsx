import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SideBar from "./sidebar";

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger
        className="pr-4 transition hover:opacity-75 md:hidden 
    text-gray-700 dark:text-gray-200 
    hover:bg-gray-100 dark:hover:bg-gray-700 
    rounded-md"
      >
        <Menu className="text-gray-700 dark:text-gray-200" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-white dark:bg-gray-800 p-0 
    border-r border-gray-200 dark:border-gray-700"
      >
        <SideBar />
      </SheetContent>
    </Sheet>
  );
};
