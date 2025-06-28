import mongoose, { Document, Model, Schema, Types } from "mongoose";

// Interfaces
export interface IChapter extends Document {
  title: string;
  description?: string | null;
  videoUrl?: string | null;
  courseId: Types.ObjectId;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICourse extends Document {
  title: string | null;
  description?: string | null;
  imageUrl?: string | null;
  chapters: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Chapter schema
const chapterSchema = new Schema<IChapter>(
  {
    title: {
      type: String,
      required: [true, "Chapter title is required"],
      minlength: [1, "Title must be at least 1 character long"],
    },
    description: {
      type: String,
      default: null,
    },
    videoUrl: {
      type: String,
      default: null,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    order: {
      type: Number,
      required: [true, "Chapter order is required"],
      min: [1, "Order must be at least 1"],
    },
  },
  { timestamps: true }
);

// Course schema
const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: [true, "Course title is required."],
    },
    description: {
      type: String,
      default: null,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    chapters: [
      {
        type: Schema.Types.ObjectId,
        ref: "Chapter",
      },
    ],
  },
  { timestamps: true }
);

// Models
const Chapter: Model<IChapter> =
  mongoose.models.Chapter || mongoose.model<IChapter>("Chapter", chapterSchema);

const Course: Model<ICourse> =
  mongoose.models.Course || mongoose.model<ICourse>("Course", courseSchema);

// Export both
export { Course, Chapter };
