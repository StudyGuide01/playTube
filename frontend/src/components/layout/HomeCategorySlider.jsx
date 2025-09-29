import { useState } from "react";

const categories = [
  "All",
  "Music",
  "Gaming",
  "News",
  "Movies",
  "Sports",
  "Live",
  "Learning",
  "Fashion",
  "Comedy",
  "Technology",

  "Music",
  "Gaming",
  "News",
  "Movies",
  "Sports",
  "Live",
  "Learning",
  "Fashion",
  "Comedy",
  "Technology",
  
];

const CategorySlider = () => {
  const [selected, setSelected] = useState("All");

  return (
    <div className="w-full bg-white sticky top-0 z-40 border-b">
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 py-2">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => setSelected(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition 
              ${
                selected === cat
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySlider;
