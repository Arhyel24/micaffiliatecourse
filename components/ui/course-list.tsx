import CourseCard from "./course-card";

export default function CoursesList({ items }) {
  // console.log("items in course", items);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
        {items.map((course) => (
          <CourseCard
            key={course._id}
            id={course._id}
            title={course.title}
            imageUrl={course.imageUrl}
            chaptersLength={course.chapters.length}
          />
        ))}
      </div>

      {items.length === 0 && (
        <div className="mt-10 text-center text-sm text-muted-foreground">
          No courses found!
        </div>
      )}
    </div>
  );
}
