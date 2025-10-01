import React from 'react'
import { useSelector } from 'react-redux'
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
import useGetChannel from '../hooks/useGetChannel';
// import useGetCurrentsUser from '../hooks/useGetCurrentsUser';

const ViewChannel = () => {
      useGetChannel();
      // useGetCurrentsUser();
    const navigate = useNavigate()
  const { channel } = useSelector(store => store.channel);

  return (
    <div className="w-full flex flex-col">
      {/* Banner */}
      <div className="w-full h-[200px] bg-gray-200">
        <img
          src={channel?.banner}
          alt="channel banner"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Channel Info */}
      <div className="flex items-start gap-4 px-6 py-4 border-b">
        {/* Avatar */}
        <img
          src={channel?.avatar || "https://via.placeholder.com/150"}
          alt="avatar"
          className="w-[80px] h-[80px] rounded-full border"
        />

        {/* Info */}
        <div className="flex flex-col justify-center">
          <h2 className="text-xl font-bold">{channel?.owner?.email}</h2>
          <p className="text-gray-600">{channel?.description || "No description available"}</p>
          <span className="text-sm text-orange-500">{channel?.category}</span>
        </div>

        {/* Buttons (right side like YouTube) */}
        <div className="ml-auto flex gap-3">
          <button  onClick={() => navigate('/updateChannel')}  className="border border-gray-400 px-4 py-2 rounded-lg hover:bg-gray-100">
            Customize Channel
          </button>
          <button className="border border-gray-400 px-4 py-2 rounded-lg hover:bg-gray-100">
            Manage Videos
          </button>
        </div>
      </div>

      {/* Empty State (like YouTube's "Upload video") */}
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <VscGitPullRequestCreate size={50} className="text-gray-500 mb-4" />
        <h3 className="text-lg font-semibold">Create content on any device</h3>
        <p className="text-gray-600 max-w-md">
          Upload and record at home or on the go. Everything you make public will appear here.
        </p>
        <button onClick={()=>navigate('/create')} className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          + Create
        </button>
      </div>
    </div>
  );
};

export default ViewChannel;
