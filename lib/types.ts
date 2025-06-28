export interface ChapterType {
  _id: string;
  title: string;
  description?: string | null;
  videoUrl?: string | null;
  order: number;
}

export interface CourseType {
  id: string;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  chapters: ChapterType[];
}