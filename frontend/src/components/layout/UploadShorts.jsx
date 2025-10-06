import { useState, useRef } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { uploadShort } from "../../redux/shortSlice";
import { useNavigate } from "react-router-dom";

const UploadShorts = () => {
  const inputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const {channel} = useSelector((store)=>store.channel);
  const [formInput, setFormInput] = useState({
    title: '',
    description: '',
    tags: '',
    shortFile: null
  });
  const [loading,setLoading] = useState(false);

  const handleClickBox = (ref) => {
    if (ref?.current) {
      ref.current.click();
    }
  };

  const handleShort = (e) => {
    setFormInput({ ...formInput, shortFile: e.target.files[0] });
  };

  const handleChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const formData = new FormData();
    formData.append('title', formInput.title);
    formData.append('description', formInput.description);
    formData.append('tags', formInput.tags);
    if (formInput.shortFile) formData.append('shortFile', formInput.shortFile);
    if (channel) formData.append('channelId', channel._id);

      //  Dispatch async upload action
  dispatch(uploadShort(formData))
  alert('your short is uploaded in background after upload message will be show')
  navigate('/');


    // const result = await axios.post(
    //   'http://localhost:8000/api/v1/short/create-short',
    //   formData,
    //   { withCredentials: true }
    // );

 

    // console.log(result.data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Upload Shorts
        </h2>

        {/* Upload Box */}
        <div
          onClick={() => handleClickBox(inputRef)}
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-xl p-8 cursor-pointer hover:border-blue-500 transition-all"
        >
          <IoCloudUploadOutline className="text-5xl text-gray-600 mb-2" />
          <p className="text-gray-500 text-sm">{formInput?.shortFile ? 'short selected' : 'Click to upload your short video'}</p>
          <input
            type="file"
            name="shortFile"
            accept="video/*"
            className="hidden"
            ref={inputRef}
            onChange={handleShort}
          />
        </div>

     

        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            value={formInput.title}
            onChange={handleChange}
            type="text"
            name="title"
            placeholder="Enter video title"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            value={formInput.description}
            onChange={handleChange}
            rows="3"
            name="description"
            placeholder="Write a short description..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
          ></textarea>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Tags</label>
          <input
            value={formInput.tags}
            onChange={handleChange}
            type="text"
            name="tags"
            placeholder="e.g. travel, vlog, comedy"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
            {loading ?'loading....' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default UploadShorts;
