"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 pl-6 text-sm font-[500] text-slate-500 dark:text-slate-300 transition-all hover:bg-slate-300/20 dark:hover:bg-slate-700/20 hover:text-slate-600 dark:hover:text-slate-200",
        isActive &&
          "bg-sky-200/20 text-sky-700 dark:bg-sky-800/20 dark:text-sky-400 hover:bg-sky-200/20 dark:hover:bg-sky-800/20 hover:text-sky-700 dark:hover:text-sky-400"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-slate-500 dark:text-slate-300",
            isActive && "text-sky-700 dark:text-sky-400"
          )}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto h-full border-2 border-sky-700 dark:border-sky-400 opacity-0 transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};
