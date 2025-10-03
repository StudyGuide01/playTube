import { FaVideo } from "react-icons/fa";
import { SiYoutubeshorts } from "react-icons/si";
import { FaOpenid } from "react-icons/fa";
import { MdPlaylistAddCircle } from "react-icons/md";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'

const options = [
  { id: "video", icon: <FaVideo />, title: "Upload Video" },
  { id: "short", icon: <SiYoutubeshorts />, title: "Create Shorts" },
  { id: "post", icon: <FaOpenid />, title: "Create Community Post" },
  { id: "playlist", icon: <MdPlaylistAddCircle />, title: "New Playlist" },
];

const CreatePage = () => {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null);

  const handleRoute = ()=>{
    const routes= {
      video:'/createvideo',
    }
    if(selected && routes[selected]){
      navigate(routes[selected]);
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-5 px-5">
        {options.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelected(item.id)}
            className={`flex flex-col items-center justify-center cursor-pointer py-5 rounded-lg ${selected === item.id ? "border-2 border-red-400" : "border border-black"}`}
          >
            <p className="font-bold">{item.id}</p>
            <span className="text-2xl my-2">{item.icon}</span>
            <p>{item.title}</p>
          </div>
        ))}
      </div>

      {/* Empty State (like YouTube's "Upload video") */}
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <VscGitPullRequestCreate size={50} className="text-gray-500 mb-4" />
       {
        !selected ? (
          <div>
             <h3 className="text-lg font-semibold">Create content on any device</h3>
        <p className="text-gray-600 max-w-md">
          Upload and record at home or on the go. Everything you make public
          will appear here.
        </p>
          </div>
        ) :(
          <div>
             <h3 className="text-lg font-semibold">Ready TO Create</h3>
      
         <p className="text-gray-600 max-w-md">
  Click below to start your <span className="font-extrabold text-black">{options.find((opt) => opt.id === selected)?.title.toLowerCase()}.</span>
</p>
.

          </div>
        )
       }
       {selected &&  <button onClick={handleRoute} className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          + Create
        </button>}
      </div>
    </>
  );
};

export default CreatePage;
