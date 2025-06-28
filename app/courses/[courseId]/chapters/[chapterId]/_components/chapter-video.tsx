"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Volume2, Maximize, RotateCcw, Loader } from "lucide-react";

export function ChapterVideo({
  videoUrl,
  title,
}: {
  videoUrl: string;
  title: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);

  const vidId = videoUrl?.slice(-11);

  if (!vidId) {
    return (
      <div className="w-full aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center rounded-lg">
        <div className="text-center text-white">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Video Not Available</h3>
          <p className="text-gray-400">This chapter doesn't have a video yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video bg-black overflow-hidden group">
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
          <div className="text-center text-white">
            <Loader className="w-8 h-8 animate-spin mx-auto mb-3" />
            <p className="text-sm">Loading video...</p>
          </div>
        </div>
      )}

      {/* Video Player */}
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${vidId}?autoplay=0&controls=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&enablejsapi=1`}
        allow="autoplay; fullscreen; picture-in-picture"
        title={title}
        allowFullScreen
        onLoad={() => setIsLoading(false)}
      />

      {/* Video Info Overlay */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <h3 className="text-white text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
        <div className="flex items-center space-x-4 text-white/80 text-sm">
          <div className="flex items-center">
            <Play className="w-4 h-4 mr-1" />
            <span>HD Quality</span>
          </div>
          <div className="flex items-center">
            <Volume2 className="w-4 h-4 mr-1" />
            <span>Audio Available</span>
          </div>
          <div className="flex items-center">
            <Maximize className="w-4 h-4 mr-1" />
            <span>Fullscreen</span>
          </div>
        </div>
      </motion.div> */}

      {/* Quality Badge */}
      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
        <span className="text-white text-xs font-medium">HD</span>
      </div>

      {/* Chapter Badge */}
      <div className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-sm rounded-lg px-3 py-1">
        <span className="text-white text-xs font-medium">Chapter Video</span>
      </div>
    </div>
  );
}