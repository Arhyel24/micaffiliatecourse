"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Camera,
  Lock,
  Save,
  Eye,
  EyeOff,
  Upload,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import LoadingRing from "@/components/loading-ring";
import { isSquareImage } from "@/actions/is-sqaure";

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
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_IMGBB_APIKEY as string;
  const imgApiUrl = process.env.NEXT_PUBLIC_IMGBB_URL as string;

  const router = useRouter();

  const uploadToImgBB = async (file: File): Promise<string | null> => {
    if (!apiKey || !imgApiUrl) {
      setUploadError("Image upload service is not configured");
      return null;
    }

    if (!file) {
      setUploadError("No file selected");
      return null;
    }

    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      toast.error("File size exceeds 5MB limit");
      return null;
    }

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
      const updatePayload: {
        email: string;
        username: string;
        imageUrl?: string;
      } = {
        email: user.email,
        username: username.trim() || user.name,
      };

      if (imageFile) {
        const imgUrl = await uploadToImgBB(imageFile);
        if (imgUrl) {
          updatePayload.imageUrl = imgUrl;
        } else {
          toast.error("Image upload failed, but will update other details");
        }
      }

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
        router.refresh();
      } else {
        setUploadError(data.message || "Failed to update profile");
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      console.error("User update error:", error);

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

    if (!oldPassword || !newPassword || !repeatPassword) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    if (newPassword !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

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

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Profile Settings
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Manage your account information and security settings
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Profile Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
          >
            <div className="flex items-center mb-6">
              <User className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Profile Information
              </h2>
            </div>

            {/* Profile Picture */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-600 mb-4">
                  <Image
                    src={imagePreview || user.image}
                    alt="Profile"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-4 right-0 bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors">
                  <Camera className="w-4 h-4 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {user.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
            </div>

            <form onSubmit={updateUser} className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Profile Picture
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-blue-500 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    PNG, JPG, GIF up to 5MB (Square images only)
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                    disabled={userLoading}
                  />
                  <label
                    htmlFor="image-upload"
                    className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                  >
                    Choose File
                  </label>
                </div>
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  placeholder={user.name}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  disabled={userLoading}
                />
              </div>

              {uploadError && (
                <div className="flex items-center p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-red-700 dark:text-red-400 text-sm">
                    {uploadError}
                  </span>
                </div>
              )}

              <motion.button
                whileHover={{ scale: userLoading ? 1 : 1.02 }}
                whileTap={{ scale: userLoading ? 1 : 0.98 }}
                type="submit"
                disabled={userLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg 
                         hover:from-blue-700 hover:to-purple-700 transition-all duration-300 
                         disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {userLoading ? (
                  <>
                    <LoadingRing size="sm" />
                    <span className="ml-2">Updating...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Update Profile
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Password Change */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
          >
            <div className="flex items-center mb-6">
              <Lock className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Change Password
              </h2>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-6">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={isLoading}
                  >
                    {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={isLoading}
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showRepeatPassword ? "text" : "password"}
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={isLoading}
                  >
                    {showRepeatPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-red-700 dark:text-red-400 text-sm">
                    {error}
                  </span>
                </div>
              )}

              <motion.button
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-3 px-4 rounded-lg 
                         hover:from-green-700 hover:to-blue-700 transition-all duration-300 
                         disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <LoadingRing size="sm" />
                    <span className="ml-2">Updating Password...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Update Password
                  </>
                )}
              </motion.button>
            </form>

            {/* Password Requirements */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">
                Password Requirements:
              </h4>
              <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                <li>• At least 8 characters long</li>
                <li>• Contains uppercase and lowercase letters</li>
                <li>• Contains at least one number</li>
                <li>• Contains at least one special character</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
