"use client";

import { Card, Button, Label, Modal, TextInput, Spinner } from "flowbite-react";
import { UsersTable } from "@/components/admin/user-table";
import { Suspense, useEffect, useState, useCallback } from "react";
import { MyFooter } from "@/components/footer";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Users, UserPlus, TrendingUp, Award, Mail, CheckCircle } from "lucide-react";

export default function AdminComponent() {
  const [users, setUsers] = useState([]);
  const [enrolUser, setEnrolUser] = useState(false);
  const [email, setEmail] = useState("");
  const [registering, setRegistering] = useState(false);

  const router = useRouter();

  function onCloseUserModal() {
    setEnrolUser(false);
    setEmail("");
  }

  const fetchUsers = useCallback(async () => {
    const usersResponse = await fetch(`/api/getallusers`, { method: "POST" });

    if (!usersResponse.ok) {
      toast.error("Failed to get users");
    }

    const data = await usersResponse.json();
    setUsers(data.users);

    if (!users) {
      toast.error("Failed to load users");
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  async function signUp() {
    setRegistering(true);
    const randomSuffix = Math.floor(Math.random() * 10000);
    const username = `user${randomSuffix}`;
    const password = "12345678";
    const image = "https://flowbite.com/docs/images/people/profile-picture-2.jpg";

    try {
      const userExistResponse = await fetch("/api/userexist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!userExistResponse.ok) {
        console.error("Failed to check user existence");
        return;
      }

      const userExistData = await userExistResponse.json();

      if (userExistData.exists) {
        toast.error("User already exists");
        return;
      }

      const signUpResponse = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          image,
        }),
      });

      if (!signUpResponse.ok) {
        toast.error("Failed to sign up user");
        return;
      }

      const emailResponse = await fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      if (!emailResponse.ok) {
        toast.error("Failed to send email");
        return;
      }

      toast.success("User enrolled successfully!");
      setRegistering(false);
      setEnrolUser(false);
      fetchUsers();
      router.refresh();
    } catch (error) {
      console.error("Error during sign-up:", error);
      toast.error("Failed to enroll user");
    } finally {
      setRegistering(false);
    }
  }

  const stats = [
    {
      icon: Users,
      label: "Total Users",
      value: users.length,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: TrendingUp,
      label: "Active This Month",
      value: Math.floor(users.length * 0.8),
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      icon: Award,
      label: "Course Completions",
      value: Math.floor(users.length * 0.6),
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      icon: Mail,
      label: "Email Campaigns",
      value: 12,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    }
  ];

  return (
    <>
      <Suspense>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center text-white"
              >
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                  Admin Dashboard
                </h1>
                <p className="text-xl text-blue-100">
                  Manage users, monitor progress, and grow your community
                </p>
              </motion.div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`${stat.bgColor} rounded-2xl p-6 border border-gray-200 dark:border-gray-700`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {stat.value.toLocaleString()}
                      </p>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Actions Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-blue-900/20 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    User Management
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Manage your student community and track their progress
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setEnrolUser(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center shadow-lg"
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  Add New User
                </motion.button>
              </div>
            </motion.div>

            {/* Users Table */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white dark:bg-blue-900/20 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Registered Users ({users.length})
                </h3>
              </div>
              
              {users.length > 0 ? (
                <UsersTable users={users} />
              ) : (
                <div className="p-12 text-center">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No Users Found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Start by adding your first user to the platform
                  </p>
                  <button
                    onClick={() => setEnrolUser(true)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add First User
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Add User Modal */}
        <Modal show={enrolUser} size="md" onClose={onCloseUserModal} popup>
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Enroll New User
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Add a new student to your platform
                </p>
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="User Email Address" />
                </div>
                <TextInput
                  id="email"
                  placeholder="student@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="w-full"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  The user will receive login credentials via email
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  color="gray"
                  onClick={onCloseUserModal}
                  className="flex-1"
                  disabled={registering}
                >
                  Cancel
                </Button>
                {registering ? (
                  <Button disabled className="flex-1">
                    <Spinner size="sm" className="mr-2" />
                    Enrolling...
                  </Button>
                ) : (
                  <Button onClick={signUp} className="flex-1">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Enroll User
                  </Button>
                )}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </Suspense>
    </>
  );
}