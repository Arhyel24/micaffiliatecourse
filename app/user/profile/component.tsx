"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import LoadingRing from "@/components/loading-ring";
import { isSquareImage } from "@/actions/is-sqaure";

// Add type for user
interface User {
  email: string;
  username?: string;
  image?: string;
}

export default function ProfileComp({ user }) {
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_IMGBB_APIKEY as string;
  const imgApiUrl = process.env.NEXT_PUBLIC_IMGBB_URL as string;

  const router = useRouter();

  const uploadToImgBB = async (file: File): Promise<string | null> => {
    // Validate API configuration
    if (!apiKey || !imgApiUrl) {
      setUploadError("Image upload service is not configured");
      return null;
    }

    // Validate file
    if (!file) {
      setUploadError("No file selected");
      return null;
    }

    // File size validation
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeInBytes) {
      toast.error("File size exceeds 5MB limit");
      return null;
    }

    // Allowed image types
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload an image.");
      return null;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(imgApiUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        toast.error(`HTTP error! status: ${response.status}`);
        return null;
      }

      const data = await response.json();

      // Validate response
      if (!data?.data?.url) {
        setUploadError("Invalid response from image upload service");
        return null;
      }

      return data.data.url;
    } catch (error) {
      console.error("Image upload error:", error);
      setUploadError("Failed to upload image");
      return null;
    }
  };

  const updateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setUserLoading(true);

    try {
      // Prepare update payload
      const updatePayload: {
        email: string;
        username: string;
        imageUrl?: string;
      } = {
        email: user.email,
        username: username.trim() || user.name,
      };

      // Upload image if file exists
      if (imageFile) {
        const imgUrl = await uploadToImgBB(imageFile);
        if (imgUrl) {
          updatePayload.imageUrl = imgUrl;
        } else {
          // Image upload failed, but continue with user update
          toast.error("Image upload failed, but will update other details");
        }
      }

      // Send update request
      const response = await fetch("/api/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatePayload),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Profile updated successfully!");
        router.refresh(); // Refresh to get updated data
      } else {
        // Handle server-side validation errors
        setUploadError(data.message || "Failed to update profile");
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      console.error("User update error:", error);

      // Differentiate error types
      if (error instanceof Error) {
        setError(error.message);
        toast.error(error.message);
      } else {
        setUploadError("An unexpected error occurred");
        setUploadError("Unable to update profile");
      }
    } finally {
      setUserLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    // Client-side validation
    if (!oldPassword || !newPassword || !repeatPassword) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    // Validate passwords
    if (newPassword !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Optional: Additional password strength validation
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          currentPassword: oldPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Password updated successfully!");

        setOldPassword("");
        setNewPassword("");
        setRepeatPassword("");

        router.refresh();
      } else {
        setError(data.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Password change error:", error);
      setError("An unexpected error occurred");
      toast.error("Unable to change password");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle image file selection
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      const isSquare = await isSquareImage(file);

      if (!isSquare) {
        toast.error("Image must be square (width must equal to height).");
        return null;
      }

      setImageFile(file);

      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto">
      {/* User Details Section */}
      <div className="flex flex-col items-center bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mt-20 w-full mb-6">
        {imagePreview ? (
          <div className="mt-2">
            <Image
              src={imagePreview}
              alt="Preview"
              width={100}
              height={100}
              className="rounded-full mb-4"
            />
          </div>
        ) : (
          <Image
            src={user.image}
            alt="User  Avatar"
            width={100}
            height={100}
            className="rounded-full mb-4"
          />
        )}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {user.name}
        </h2>
        <p className="text-md font-semibold text-gray-900 dark:text-gray-100">
          {user.email}
        </p>
        <form className="mt-4 w-full" onSubmit={updateUser} autoComplete="off">
          <div className="flex w-full items-center justify-center">
            <Label
              htmlFor="dropzone-file"
              className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <svg
                  className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 5MB) & aspect ratio: 1/1
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                disabled={userLoading}
              />
            </Label>
          </div>

          <div className="mt-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Username
            </label>
            <TextInput
              autoComplete="off"
              id="username"
              placeholder={user.name}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {uploadError && (
            <div className="text-red-500 text-sm">{uploadError}</div>
          )}
          <button
            type="submit"
            className={`mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center ${
              userLoading && "cursor-not-allowed"
            }`}
          >
            {userLoading ? (
              <>
                <LoadingRing size="sm" /> Updating user
              </>
            ) : (
              "Update User Details"
            )}
          </button>
        </form>
      </div>

      {/* Change Password Section */}
      <div className="flex flex-col items-center bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
          Change Password
        </h3>
        <form
          className="w-full"
          onSubmit={handlePasswordChange}
          autoComplete="off"
        >
          <div className="mt-4">
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Old Password
            </label>
            <input
              type="password"
              autoComplete="off"
              id="old-password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              New Password
            </label>
            <input
              type="password"
              autoComplete="off"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="repeat-password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Repeat Password
            </label>
            <input
              type="password"
              id="repeat-password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button
            type="submit"
            className="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <LoadingRing size="sm" className="mr-2" /> Changing password
              </>
            ) : (
              "Update Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
