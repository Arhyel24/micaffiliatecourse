export function ChapterVideo({
  videoUrl,
  title,
}: {
  videoUrl: string;
  title: string;
}) {
  const vidId = videoUrl?.slice(-11);

  if (!vidId) {
    return null;
  }

  return (
    <div className="w-full shadow-lg rounded-lg overflow-hidden">
      <iframe
        className="w-full aspect-video"
        src={`https://www.youtube.com/embed/${vidId}?autoplay=1&controls=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3`}
        allow="autoplay; fullscreen"
        title={title}
        allowFullScreen
      />
    </div>
  );
}
