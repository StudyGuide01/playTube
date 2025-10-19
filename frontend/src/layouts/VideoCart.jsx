import React from "react";
import { useNavigate } from "react-router-dom";

const VideoCart = ({
  id,
  thumbnail,
  duration,
  channelLogo,
  title,
  channelName,
  views,
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/video/${id}`)}
      className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Thumbnail + Duration Overlay */}
      <div className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-40 object-cover"
        />
        <span className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
          {duration}
        </span>
      </div>

      {/* Channel Info + Details */}
      <div className="p-3 flex items-start space-x-3">
        <img
          src={channelLogo}
          alt={`${channelName} logo`}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h2 className="font-semibold text-sm line-clamp-2">{title}</h2>
          <p className="text-gray-500 text-xs">{channelName}</p>
          <p className="text-gray-400 text-xs">{views} views</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCart;
