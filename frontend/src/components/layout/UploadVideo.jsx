import axios from "axios";
import React, { useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { showCustomAlert } from "../commen/CustomAlert";
import { useNavigate } from "react-router-dom"; // ✅ Correct hook
import { useSelector } from "react-redux";

const UploadVideo = () => {
  const videoInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);
  const { channel } = useSelector((store) => store.channel);
  console.log(channel);

  const [loading, setLoading] = useState(false);
  const [formInput, setFormInput] = useState({
    title: "",
    description: "",
    tags: "",
    video: null,
    thumbnail: null,
  });

  const navigate = useNavigate(); // ✅ Correct navigate hook

  // Click handler for opening file input
  const handleBoxClick = (ref) => {
    if (ref.current) {
      ref.current.click();
    }
  };

  // Handle video change
  const handleVideo = (e) => {
    setFormInput({
      ...formInput,
      video: e.target.files[0],
    });
  };

  // Handle thumbnail change
  const handleThumbnail = (e) => {
    setFormInput({
      ...formInput,
      thumbnail: e.target.files[0],
    });
  };

  // Handle text inputs
  const handleChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", formInput.title);
    formData.append("description", formInput.description);

    // ✅ Corrected tags
    if (formInput.tags.trim()) {
      formData.append(
        "tags",
        JSON.stringify(formInput.tags.split(",").map((tag) => tag.trim()))
      );
    }

    formData.append("video", formInput.video);
    formData.append("thumbnail", formInput.thumbnail);
    formData.append("channelId", channel?._id);

    try {
      const result = await axios.post(
        "http://localhost:8000/api/v1/video/create-video",
        formData,
        { withCredentials: true }
      );

      console.log(result.data);
      showCustomAlert(result.data?.message);

      setLoading(false);
      navigate("/"); // ✅ Correct redirect
    } catch (error) {
      console.log(error);
      showCustomAlert(error.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Upload Video
        </h2>

        {/* Form */}
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Video Upload */}
          <div
            onClick={() => handleBoxClick(videoInputRef)}
            className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-10 cursor-pointer hover:border-indigo-500 transition"
          >
            <FiUploadCloud className="text-4xl text-indigo-500 mb-2" />
            <p className="text-gray-600 font-medium">
              {formInput.video ? formInput.video.name : "Upload Video"}
            </p>
            <input
              type="file"
              name="video"
              ref={videoInputRef}
              accept="video/*"
              className="hidden"
              onChange={handleVideo}
            />
          </div>

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-2"
            >
              Video Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formInput.title}
              onChange={handleChange}
              placeholder="Enter video title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formInput.description}
              onChange={handleChange}
              placeholder="Enter video description"
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500"
            />
          </div>

          {/* Tags */}
          <div>
            <label
              htmlFor="tags"
              className="block text-gray-700 font-medium mb-2"
            >
              Tags
            </label>
            <input
              type="text"
              name="tags"
              id="tags"
              value={formInput.tags}
              onChange={handleChange}
              placeholder="Enter video tags (comma separated)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500"
            />
          </div>

          {/* Thumbnail Upload */}
          <div
            onClick={() => handleBoxClick(thumbnailInputRef)}
            className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-10 cursor-pointer hover:border-indigo-500 transition relative"
          >
            {formInput.thumbnail ? (
              <img
                src={URL.createObjectURL(formInput.thumbnail)}
                alt="thumbnail"
                className="w-full h-48 object-cover rounded-lg"
              />
            ) : (
              <>
                <FiUploadCloud className="text-4xl text-indigo-500 mb-2" />
                <p className="text-gray-600 font-medium">Upload Thumbnail</p>
              </>
            )}

            <input
              type="file"
              name="thumbnail"
              ref={thumbnailInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleThumbnail}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition shadow-md"
            disabled={loading}
          >
            {loading ? "Loading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadVideo;
