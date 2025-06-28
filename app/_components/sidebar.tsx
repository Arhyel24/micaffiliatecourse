import Logo from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

const Sidebar = () => {
  return (
    <div
      className="flex h-full flex-col overflow-y-auto 
  border-r border-gray-200 dark:border-gray-700 
  bg-white dark:bg-gray-800 
  shadow-sm dark:shadow-md"
    >
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex w-full flex-col">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
