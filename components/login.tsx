"use client";
import { Spinner, Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    try {
      if (!email || !password) {
        throw new Error("Please fill all the fields");
      }

      const emailRegex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        throw new Error("Invalid email address");
      }

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });


      if (!res || res.error) {
        throw new Error("Invalid email or password");
      }

      router.replace("/");
    } catch (error) {
      setError((error as Error).message || "An unexpected error occurred");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="absolute inset-0 bg-cover bg-center background-pattern opacity-10 dark:opacity-20"></div>
      <div className="relative z-10 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-sm mx-auto w-full">
        <h1 className="text-2xl text-center font-semibold mb-2 text-gray-900 dark:text-white">
          Welcome back!
        </h1>
        <p className="mb-4 text-gray-600 dark:text-gray-300 text-center">
          We are really happy to see you again!
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="example@123.com"
            name="email"
            className="w-full px-4 py-2 border rounded-md 
          text-gray-900 dark:text-white 
          bg-white dark:bg-gray-700 
          border-gray-300 dark:border-gray-600 
          focus:ring-blue-500 dark:focus:ring-blue-600 
          focus:border-blue-500 dark:focus:border-blue-600"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="**********"
            name="password"
            className="w-full px-4 py-2 border rounded-md 
          text-gray-900 dark:text-white 
          bg-white dark:bg-gray-700 
          border-gray-300 dark:border-gray-600 
          focus:ring-blue-500 dark:focus:ring-blue-600 
          focus:border-blue-500 dark:focus:border-blue-600"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Alert color="failure" icon={HiInformationCircle}>
              {error}
            </Alert>
          )}
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 
          focus:ring-4 focus:ring-blue-300 
          font-medium rounded-lg text-sm px-5 py-2.5 
          text-center me-2 
          dark:bg-blue-600 dark:hover:bg-blue-700 
          dark:focus:ring-blue-800 
          flex items-center justify-center"
          >
            {loading ? (
              <div className="flex gap-2 justify-center items-center">
                <Spinner aria-label="Small spinner example" size="sm" />
                Logging In...
              </div>
            ) : (
              "Login"
            )}
          </button>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
            Forgot your password?{" "}
            <a
              href="/forgot-password"
              className="text-blue-500 dark:text-blue-400 hover:underline"
            >
              Reset Here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
