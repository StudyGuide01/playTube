import React from "react";
import AllVideoPage from "../components/layout/AllVideoPage";

const ContentMenage = () => {
  return (
    <div className="w-full bg-[#0f0f0f] text-white min-h-screen px-4 sm:px-6 md:px-10 py-6">
      {/* ===================== VIDEOS SECTION ===================== */}
      <section className="mb-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl md:text-2xl font-semibold uppercase tracking-wide">
            Videos
          </h1>
          <button className="text-sm text-blue-400 hover:underline transition">
            View All
          </button>
        </div>

        {/* All Videos (Dynamic Grid from AllVideoPage) */}
        <div className="bg-transparent">
          <AllVideoPage />
        </div>
      </section>

      {/* ===================== SHORTS SECTION ===================== */}
      <section>
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/07/YouTube_short_logo.svg"
              alt="shorts"
              className="w-6 h-6"
            />
            <h1 className="text-xl md:text-2xl font-semibold tracking-wide">
              Shorts
            </h1>
          </div>
          <button className="text-sm text-blue-400 hover:underline transition">
            View All
          </button>
        </div>

        {/* Shorts Horizontal Scroll */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="min-w-[180px] aspect-[9/16] rounded-xl overflow-hidden bg-[#1f1f1f] relative group hover:scale-105 transition-transform duration-300"
            >
              <img
                src={`https://picsum.photos/200/300?random=${i}`}
                alt={`short-${i}`}
                className="w-full h-full object-cover"
              />
              {/* Hover Text */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-medium truncate">Amazing Short #{i + 1}</p>
                <p className="text-gray-400">1.2M views</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ContentMenage;
