import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VideoCart from "../../layouts/VideoCart";

// ✅ Utility function: Get duration of a video file from URL
const getVideoDuration = async (url) => {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.crossOrigin = "anonymous"; // important for CORS-enabled URLs
    video.src = url;
    video.load(); // ✅ force metadata load

    video.onloadedmetadata = () => {
      const totalSeconds = Math.floor(video.duration);
      console.log("✅ Metadata loaded for:", url, "Duration:", video.duration);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      resolve(`${minutes}:${seconds.toString().padStart(2, "0")}`);
    };

    video.onerror = (err) => {
      console.warn("⚠️ Metadata error for:", url, err);
      resolve("0:00");
    };
  });
};

const AllVideoPage = () => {
  const { allVideos } = useSelector((store) => store.content);
  const [duration, setDuration] = useState({});

  console.log("🎬 allVideos from Redux:", allVideos);

  // useEffect(() => {
  //   const fetchDurations = async () => {
  //     //  FIX: allVideos is an array, not an object
  //     if (Array.isArray(allVideos) && allVideos.length > 0) {

  //       const durations = {};

  //       for (const video of allVideos) {
  //         const formatted = await getVideoDuration(video?.videoUrl);
  //         durations[video._id] = formatted;
  //       }
  //       setDuration(durations);
  //     }
  //   };

  //   fetchDurations();
  // }, [allVideos]);

  useEffect(() => {
  const fetchDurations = async () => {
    if (Array.isArray(allVideos) && allVideos.length > 0) {
      const durations = {};

      for (const video of allVideos) {
        if (!video || !video.videoUrl || !video._id) continue; // 🛡️ skip invalid items
        const formatted = await getVideoDuration(video.videoUrl);
        durations[video._id] = formatted;
      }

      setDuration(durations);
    }
  };

  fetchDurations();
}, [allVideos]);

  return (
    <div className="p-4">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
       {Array.isArray(allVideos) && allVideos.length > 0 ? (
  allVideos
    .filter((v) => v && v._id) //  skip invalid entries
    .map((video) => (
      <VideoCart
        key={video._id}
        id={video._id}
        thumbnail={video.thumbnail}
        duration={duration[video._id] || "0:00"}
        title={video.title}
        channelLogo={video?.channel?.avatar}
        channelName={video?.channel?.name}
        views={video.views}
      />
    ))
) : (
  <p className="text-gray-500">No videos found.</p>
)}

      </div>
    </div>
  );
};

export default AllVideoPage;
