import React, { useEffect, useRef, useState } from 'react';
import { FaBackward, FaExpand, FaForward, FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const PlayVideo = () => {
  const videoRef = useRef(null);
  const { id } = useParams();
  const {currentUser} = useSelector((store)=>store.auth);
  const [showControl, setShowControl] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [video, setVideo] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [channel, setChannel] = useState('');
  const { allVideos } = useSelector((store) => store.content);
  const [mute,setMute] = useState(false);
  const [volum,setVolume] = useState(1);
  const [subscirbe,setSubscribe] = useState(false);
  

useEffect(() => {
  if (channel?.subscribers?.includes(currentUser?._id)) {
    setSubscribe(true);
  } else {
    setSubscribe(false);
  }
}, [channel, currentUser]);

  const totalSeconds = Math.floor(videoRef.current?.duration || 0);

const hours = Math.floor(totalSeconds / 3600);
const minutes = Math.floor((totalSeconds % 3600) / 60);
const seconds = Math.floor(totalSeconds % 60);


//for show vidoe running time 
const currentSeconds = Math.floor(videoRef.current?.currentTime || 0);
// Current Time formatting
const currentHours = Math.floor(currentSeconds / 3600);
const currentMinutes = Math.floor((currentSeconds % 3600) / 60);
const currentRemainingSeconds = currentSeconds % 60;


// format 0 padding (e.g. 03:07)
const format = (n) => String(n).padStart(2, '0');
 

  // handleUpdateTime
  const handleUpdateTime = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    setDuration(videoRef.current.duration);
    setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
  };

  // get current video
  useEffect(() => {
    if (!allVideos) return;

    const currentVideo = allVideos?.find((v) => v._id === id);
    if (currentVideo) {
      setVideo(currentVideo);
      setChannel(currentVideo.channel);
    }
  });

  const hanleSeek = (e) => {
    if (!videoRef.current) return;
    const seekTime = (e.target.value / 100) * duration;
    
    videoRef.current.currentTime = seekTime;

    setProgress(e.target.value);
  };

  const toggle = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
  };

  const skipForword = () => {
    if (videoRef.current) videoRef.current.currentTime += 10;
  };

  const skipBackword = () => {
    if (videoRef.current) videoRef.current.currentTime -= 10;
  };

  const handleVolume = (e)=>{
    const vol = parseFloat(e.target.value);

    setVolume(vol);
    setMute(vol === 0);
    if(videoRef.current) videoRef.current.volum = vol;
  }

  const hadndleMute = ()=>{
    if(!videoRef.current) return;
    setMute(!mute);
    videoRef.current.muted = !mute;
  }

  // handleFullScreen 
  const handleFullScreen = (e)=>{
    if(!videoRef.current) return;
    if(videoRef.current.requestFullscreen){
      videoRef.current.requestFullscreen();
    }
  }



 const handleSubscribe = async () => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/v1/channel/subscribe/${channel._id}`,
      {},
      { withCredentials: true }
    );
   
    // Backend returns updated channel data
    const updatedChannel = response.data.channel;
    setSubscribe(updatedChannel.subscribers.includes(currentUser?._id));
 
  } catch (error) {
    console.log("Subscribe error:", error);
  }
};

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
        <div className="w-full max-w-5xl">
          {/* Video Player */}
          <div
            className="relative w-full aspect-video bg-[#0f0f0f] rounded-2xl overflow-hidden shadow-lg border border-gray-800"
            onMouseEnter={() => setShowControl(true)}
            onMouseLeave={() => setShowControl(false)}
          >
            <video
              src={video?.videoUrl}
              className="w-full h-full object-contain bg-black"
              controls={false}
              autoPlay
              ref={videoRef}
              // muted
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onTimeUpdate={handleUpdateTime}
            />

            {/* Bottom Controls */}
            <div
              className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 transition-opacity duration-300 ${
                showControl ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Progress Bar */}
              <input
                type="range"
                min={0}
                max={100}
                onChange={hanleSeek}
                value={progress}
                className="w-full accent-red-600 h-1 mb-3"
              />

              {/* Playback Buttons */}
              <div className="flex items-center justify-center space-x-6">
                <button
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition"
                  onClick={skipBackword}
                >
                  <FaBackward size={18} />
                </button>

                <button
                  className="p-4 bg-white/10 hover:bg-white/20 rounded-full transition"
                  onClick={toggle}
                >
                  {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                </button>

                <button
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition"
                  onClick={skipForword}
                >
                  <FaForward size={18} />
                </button>
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                       <button
                  className="p-4 bg-white/10 hover:bg-white/20 rounded-full transition"
                  onClick={toggle}
                >
                  {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                </button>
                <p>Sound</p>
                <p>
 {currentHours > 0
      ? `${format(currentHours)}:${format(currentMinutes)}:${format(currentRemainingSeconds)}`
      : `${format(currentMinutes)}:${format(currentRemainingSeconds)}`
    }
  /   {hours > 0
      ? `${format(hours)}:${format(minutes)}:${format(seconds)}`
      : `${format(minutes)}:${format(seconds)}`
    }
  </p>

                </div>

                <div className='flex items-center gap-3'>
                  <button onClick={hadndleMute}>{mute ? <FaVolumeMute/> : <FaVolumeUp/>}</button>

<input type="range" value={mute ? 0 : volum} onChange={handleVolume} className='w-16 accent-orange-500 sm:w-24' min={0}  max={1} step={0.1}/>
               
               <button onClick={handleFullScreen}><FaExpand/></button>
                </div>
              </div>
            </div>
          </div>

          {/* Video Info (Static for now) */}
          <div className="mt-5">
            <h2 className="text-lg font-semibold">{video?.title || 'Video Title'}</h2>
            <p className="text-gray-400 text-sm mt-1">{channel?.name || 'Channel Name'}</p>
          </div>

          <div>
       {/* {channel?._id !== currentUser?.channel && <button onClick= {handleSubscribe}>Subscribe  </button>} */}
       {channel?._id !== currentUser?.channel && (
  <button onClick={handleSubscribe}>
    {subscirbe ? "Subscribed" : "Subscribe"}
  </button>
)}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayVideo;



//ab or kiya karna he 
// 1. suggested vidoe section right side me 
// 2. jo suggested video he use bhi click karne par playVideo component par bhejna he 
//3. fir uske niche user ka changell logo uska title like, unlike , vidoe ko dikhana he 
// 4. fir vidoe ke niche ka jitna bhi part hota he 

//5. subscripber ki functionality explain 4:47:50 time vidoe time 
// 6. subscripber ke liye controller ( parameterh : channelId, userId,subscriber se pull or push lgana add or remove ) apne data ke ander chekk karna he ke jis user apn ko click kiya he wo apna subscriber he ya nahi time:4:51:30