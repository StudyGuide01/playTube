import React from "react";
import { useSelector } from "react-redux";
import ShortCard from "./ShortCard";

const AllShortPage = () => {
  const { allShorts } = useSelector((store) => store.content);
  console.log(allShorts);

  return (
    <div className="px-6 py-8 bg-black min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-white">Shorts</h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {allShorts && allShorts.length > 0 ? (
          allShorts.map((short) => (
            <ShortCard
              key={short._id}
              id={short._id}
              shortUrl={short.shortUrl}
              title={short.title}
              channelName={short?.channel?.name}
              avatar={short?.channel?.avatar}  
              views={short.views}
            />
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center">
            No Shorts Available
          </p>
        )}
      </div>
    </div>
  );
};

export default AllShortPage;
