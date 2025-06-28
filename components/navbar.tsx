"use client";

import { Avatar, DarkThemeToggle, Dropdown, Navbar } from "flowbite-react";
import Image from "next/image";
import { Button, Label, Modal, TextInput, FileInput } from "flowbite-react";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { isTeacher } from "@/lib/teacher";

export function NavBar() {
  const { data: session } = useSession();

  console.log("session:", session!);

  const isAdmin = isTeacher(session?.user?.email);

  return (
    <Navbar
      fluid
      rounded
      className="bg-white dark:bg-gray-800 fixed w-full z-30"
    >
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Massive Income Course
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 gap-2">
        <DarkThemeToggle />
        {!session ? (
          <Button href="/login">Login</Button>
        ) : (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User  settings"
                img={
                  session?.user?.image ||
                  "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                }
                rounded
              />
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
            <Dropdown.Item href="/">Dashboard</Dropdown.Item>
            {isAdmin && (
              <>
                <Dropdown.Item href="/view/admin">View users</Dropdown.Item>
                <Dropdown.Item href="/view/courses">View Courses</Dropdown.Item>
              </>
            )}
            <Dropdown.Item href="/user/profile">Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => signOut()}>Sign out</Dropdown.Item>
          </Dropdown>
        )}
      </div>
    </Navbar>
  );
}
