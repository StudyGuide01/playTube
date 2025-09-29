import { FaHome, FaFire, FaPlayCircle, FaHistory, FaThumbsUp } from "react-icons/fa";
import { MdSubscriptions, MdOutlineWatchLater } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const sidebarItems = [
  { icon: <FaHome />, text: "Home" },
  { icon: <FaFire />, text: "Trending" },
    { icon: <FaFire />, text: "Shorts" },
  { icon: <MdSubscriptions />, text: "Subscriptions" },
  { icon: <FaPlayCircle />, text: "Library" },
  { icon: <FaHistory />, text: "History" },
  { icon: <MdOutlineWatchLater />, text: "Watch Later" },
  { icon: <FaThumbsUp />, text: "Liked Videos" },
];

const Sidebar = ({ open, selected, setSelected }) => {
    const navigate = useNavigate();
  return (
    <aside
      className={`${
        open ? "w-40" : "w-[50px]"
      } h-screen bg-white border-r shadow-sm fixed top-0 left-0 mt-[60px]`}
    >
      <div className="flex flex-col py-4">
        {sidebarItems.map((item, index) => (
          <button
            // onClick={() => setSelected(item.text);navigate(`/${item.text}`)}  
            onClick={() => {
  setSelected(item.text);
  navigate(`/${item.text}`);
}}
            key={index}
            className={`flex items-center gap-4 px-4 py-3 transition rounded-lg 
              ${
                selected === item.text
                  ? "text-white bg-black"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <span className="text-xl">{item.icon}</span>
            {open && (
              <span className="text-sm font-medium">{item.text}</span>
            )}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
