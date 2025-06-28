"use client";

import { Avatar, DarkThemeToggle, Dropdown, Navbar } from "flowbite-react";
import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  User,
  Settings,
  LogOut,
  BookOpen,
  Users,
  BarChart3,
  Home,
} from "lucide-react";
import { isTeacher } from "@/lib/teacher";
import Link from "next/link";

export function NavBar() {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAdmin = isTeacher(session?.user?.email);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/courses", label: "Courses", icon: BookOpen },
  ];

  const adminItems = [
    { href: "/view/admin", label: "Manage Users", icon: Users },
    { href: "/view/courses", label: "Course Analytics", icon: BarChart3 },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700"
          : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">MIC</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
                Massive Income Course
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}

            {isAdmin && (
              <>
                {adminItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <DarkThemeToggle />

            {!session ? (
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  Login
                </motion.button>
              </Link>
            ) : (
              <div className="relative">
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                    >
                      <Avatar
                        alt="User settings"
                        img={
                          session?.user?.image ||
                          "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                        }
                        rounded
                        size="sm"
                      />
                      <div className="hidden sm:block text-left">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {session?.user?.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {session?.user?.email}
                        </div>
                      </div>
                    </motion.div>
                  }
                >
                  <Dropdown.Header>
                    <span className="block text-sm dark:text-gray-200">
                      {session?.user?.name}
                    </span>
                    <span className="block truncate text-sm font-medium dark:text-gray-400">
                      {session?.user?.email}
                    </span>
                  </Dropdown.Header>
                  
                  <Dropdown.Divider />
                  <Dropdown.Item href="/user/profile" icon={Settings}>
                    Profile Settings
                  </Dropdown.Item>

                  <Dropdown.Item onClick={() => signOut()} icon={LogOut}>
                    Sign out
                  </Dropdown.Item>
                </Dropdown>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4"
            >
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}

                {isAdmin && (
                  <>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                    {adminItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    ))}
                  </>
                )}

                {session && (
                  <>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                    <Link
                      href="/user/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
                    >
                      <Settings className="w-5 h-5" />
                      <span className="font-medium">Profile Settings</span>
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors w-full text-left"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Sign out</span>
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
