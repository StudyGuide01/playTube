import React, { useEffect, useRef, useState } from 'react';
import { FaBackward, FaForward, FaPause, FaPlay } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const PlayVideo = () => {
  const videoRef = useRef(null);
  const { id } = useParams();
  const [showControl, setShowControl] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [video, setVideo] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [channel, setChannel] = useState('');
  const { allVideos } = useSelector((store) => store.content);

  const totalSeconds = Math.floor(videoRef.current?.duration || 0);

const hours = Math.floor(totalSeconds / 3600);
const minutes = Math.floor((totalSeconds % 3600) / 60);
const seconds = Math.floor(totalSeconds % 60);

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
              muted
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
    {hours > 0
      ? `${format(hours)}:${format(minutes)}:${format(seconds)}`
      : `${format(minutes)}:${format(seconds)}`
    }
  </p>

                </div>

                <div>Right div</div>
              </div>
            </div>
          </div>

          {/* Video Info (Static for now) */}
          <div className="mt-5">
            <h2 className="text-lg font-semibold">{video?.title || 'Video Title'}</h2>
            <p className="text-gray-400 text-sm mt-1">{channel?.name || 'Channel Name'}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayVideo;
