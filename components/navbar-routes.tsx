"use client";

import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";

import { SearchInput } from "./search-input";
import { isTeacher } from "@/lib/teacher";
import { Button } from "./ui/button";
import { DarkThemeToggle } from "flowbite-react";
import { useSession } from "next-auth/react";

export const NavbarRoutes = () => {
  const { data: session } = useSession();
  
  const email = session?.user?.email;
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname?.includes("/search");

  return (
  <>
    {isSearchPage && (
      <div className="hidden md:block">
        <SearchInput />
      </div>
    )}
    <div className="ml-auto flex gap-x-2">
      <DarkThemeToggle />
      {(isTeacherPage || isCoursePage) && (
        <>
          {isTeacher(email) && (
            <Link href="/view/courses">
              <Button size="sm" variant="ghost">
                Teacher mode
              </Button>
            </Link>
          )}
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="mr-2 h-4 w-4" />
              Exit
            </Button>
          </Link>
        </>
      )}
    </div>
  </>
);
};
