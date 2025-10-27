import React from "react";

const ShortCard = ({ shortUrl, title, channelName, avatar, views, id }) => {
  return (
    <div className="bg-[#181818] rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer">
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={shortUrl}
          alt={title}
          className="w-full aspect-[9/16] object-cover"
        />
        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
          0:59
        </span>
      </div>

      {/* Info Section */}
      <div className="p-3 flex items-start space-x-3">
        {/* Avatar */}
        <img
          src={avatar || "https://via.placeholder.com/50"} // ✅ fallback
          alt={channelName}
          className="w-8 h-8 rounded-full"
        />

        {/* Details */}
        <div>
          <h2 className="text-white text-sm font-medium line-clamp-2">
            {title || "Untitled Short"}
          </h2>
          <p className="text-gray-400 text-xs mt-1">
            {channelName || "Unknown Channel"}
          </p>
          <p className="text-gray-500 text-xs">{views || "0 views"}</p>
        </div>
      </div>
    </div>
  );
};

export default ShortCard;
