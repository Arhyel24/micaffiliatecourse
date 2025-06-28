import mongoose from "mongoose";
import { Course } from "./models/Course";
import connectDB from "./lib/connectDataBase";

// Function to create a course with chapters
const createCourseWithChapters = async () => {
  const newCourse = new Course({
    title: "Introduction to Programming",

    description: "A comprehensive course on programming fundamentals.",
    imageUrl: "http://example.com/image.png",
    chapter: [
      {
        title: "Chapter 1: Basics of Programming",
        description:
          "Learn the basics of programming, including variables and data types.",
        videoUrl: "http://example.com/chapter1.mp4",
      },
      {
        title: "Chapter 2: Control Structures",
        description:
          "Understand control structures like loops and conditionals.",
        videoUrl: "http://example.com/chapter2.mp4",
      },
      {
        title: "Chapter 3: Functions and Scope",
        description: "Dive into functions and variable scope in programming.",
        videoUrl: "http://example.com/chapter3.mp4",
      },
    ],
  });

  try {
    const savedCourse = await newCourse.save();
    console.log("Course created successfully:", savedCourse);
  } catch (error) {
    console.error("Error creating course:", error);
  }
};

// Main function to execute the script
const main = async () => {
  await connectDB();
  await createCourseWithChapters();
  mongoose.connection.close(); // Close the connection after the operation
};

main();
