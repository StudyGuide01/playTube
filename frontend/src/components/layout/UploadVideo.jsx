import React from "react";

const UploadVideo = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Upload Your Video
        </h2>

        <form className="flex flex-col gap-6">
          {/* Video Title */}
          <div className="flex flex-col">
            <label htmlFor="title" className="text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter Video Title..."
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label htmlFor="description" className="text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              placeholder="Enter Video Description..."
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 resize-none h-32"
            />
          </div>

          {/* Video File */}
          <div className="flex flex-col">
            <label htmlFor="video" className="text-gray-700 font-medium mb-2">
              Select Upload Video
            </label>
            <input
              type="file"
              accept="video/*"
              className="px-4 py-3 border border-gray-300 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Thumbnail */}
          <div className="flex flex-col">
            <label htmlFor="thumbnail" className="text-gray-700 font-medium mb-2">
              Thumbnail
            </label>
            <input
              type="file"
              accept="image/*"
              className="px-4 py-3 border border-gray-300 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg transition"
          >
            Upload Video
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadVideo;
