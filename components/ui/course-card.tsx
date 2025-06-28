import Link from "next/link";
import { BookOpenIcon } from "lucide-react";
import { IconBadge } from "./icon-badge";
import Image from "next/image";

// const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

type CourseCardProps = {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
};

export default function CourseCard({
  id,
  title,
  imageUrl,
  chaptersLength,
}: CourseCardProps) {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group overflow-hidden rounded-lg border p-3 transition hover:shadow-sm">
        <div className="relative h-full aspect-video w-full overflow-hidden rounded-md">
          <Image
            className="w-full h-full"
            src={imageUrl}
            width={200}
            height={100}
            alt={title}
          />
        </div>

        <div className="flex flex-col pt-2">
          <div className="line-clamp-2 text-lg font-medium transition group-hover:text-primary md:text-base">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">Affiliate Marketing</p>
          <div className="my-3 flex items-center gap-x-1 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpenIcon} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
