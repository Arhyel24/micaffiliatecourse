"use client";

import { formatDate } from "@/actions/format-date";
import { Card, Button, Modal } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export function UserCard({ user }) {
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();

  const deleteUser = async () => {
    try {
      const response = await fetch("/api/deleteUser ", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user.email }),
      });

      if (!response.ok) {
        console.error("Failed to delete user");
      }

      const data = await response.json();
      toast.success(data.message);
      setOpenModal(false);
      router.refresh();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  return (
    <Card className="w-[300px]">
      <div className="flex justify-end px-4 pt-4"></div>
      <div className="flex flex-col items-center pb-6">
        <Image
          alt={`${user.username}'s image`}
          height={96}
          src={
            user.image ||
            "https://flowbite.com/docs/images/people/profile-picture-2.jpg"
          }
          width={96}
          className="mb-3 rounded-full shadow-lg"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {user.username}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {user.email}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {formatDate(user.createdAt)}
        </span>

        <div className="mt-4 flex space-x-3 lg:mt-6">
          <Button
            size="xs"
            color="failure"
            onClick={() => setOpenModal(true)}
            className="inline-flex items-center rounded-lg hover:bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:focus:ring-cyan-800"
          >
            Delete user
          </Button>
        </div>
      </div>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this user? {user.email}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteUser}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Card>
  );
}
