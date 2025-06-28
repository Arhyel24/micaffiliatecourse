"use client";

import { CheckCircle, XCircle, ChevronsRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";

interface CourseProgressButtonProps {
  courseId: string;
  nextChapterId?: string | null;
}

export const CourseProgressButton = ({
  courseId,
  nextChapterId,
}: CourseProgressButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      router.push(`/courses/${courseId}/chapters/${nextChapterId}`);

      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const Icon = CheckCircle;
  const IconSuccess = ChevronsRight;

  return (
    <Button
      onClick={onClick}
      disabled={isLoading || !nextChapterId}
      type="button"
      variant="outline"
      className={`w-full md:w-auto 
        ${isLoading || !nextChapterId ? 'bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400' : 'bg-white text-black dark:bg-gray-800 dark:text-white'}
        border border-gray-300 dark:border-gray-600
        transition-colors duration-200 ease-in-out`}
    >
      {!nextChapterId ? <>Completed  <Icon className="ml-2 h-4 w-4" /></>:<> Next chapter <IconSuccess className="ml-2 h-4 w-4" /></>}
     
    </Button>
  );
};
