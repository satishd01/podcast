import React, { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { GoClockFill } from "react-icons/go";
import { IoIosBookmark } from "react-icons/io";
import { IoPlay } from "react-icons/io5";
import { FaPause } from "react-icons/fa6";
import { MdThumbsUpDown } from "react-icons/md";
import { RiForward15Fill, RiReplay15Fill } from "react-icons/ri";
import { TbPlaylist, TbRepeat } from "react-icons/tb";
import { useSelector } from "react-redux";
import { playerTitleLength } from "../../utils/constants";
import PlayerOptions from "./PlayerOptions/PlayerOptions";
import PlayNext from "./PlayNext/PlayNext";
import ProgressBar from "./ProgressBar";

const Player = () => {
  const [isPlayerOptionOpen, setIsPlayerOptionOpen] = useState(false);
  const [isPlayNextOpen, setIsPlayNextOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // Current time of audio
  const [duration, setDuration] = useState(0); // Total duration of the audio

  const audioRef = useRef(null);
  const activePlayer = useSelector((state) => state.activePlayer.activePlayer);

  useEffect(() => {
    if (!activePlayer) return;

    const fetchAudio = async () => {
      const audioUrl =
        activePlayer?.audioUrl ||
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

      if (audioRef.current) {
        audioRef.current.src = audioUrl;

        // Load metadata to fetch duration
        audioRef.current.onloadedmetadata = () => {
          setDuration(audioRef.current.duration || 0); // Set total duration of the audio
        };
      }
    };

    fetchAudio();
  }, [activePlayer]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime); // Update current time
    }
  };

  const handleSeek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time; // Set the audio playback position
      setCurrentTime(time);
    }
  };

  const skipTime = (seconds) => {
    if (audioRef.current) {
      let newTime = audioRef.current.currentTime + seconds;
      newTime = Math.max(0, Math.min(newTime, duration)); // Clamp to 0 and duration
      handleSeek(newTime);
    }
  };

  return (
    activePlayer?.name && (
      <div className="bg-black z-30 py-4 sticky bottom-0 flex flex-col sm:flex-row justify-between text-white px-4">
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
          <img
            alt={activePlayer.name}
            src={activePlayer.imageUrl}
            className="rounded-md w-12 h-12 md:w-16 md:h-16"
          />
          <div className="text-sm">
            <p>
              {activePlayer.name.length > playerTitleLength
                ? `${activePlayer.name.slice(0, playerTitleLength)}....`
                : activePlayer.name}
            </p>
            <div className="flex items-center gap-2">
              <GoClockFill className="text-white" />
              <p className="text-xs">
                {`${Math.floor(duration / 60)}:${
                  Math.floor(duration % 60) < 10
                    ? "0" + Math.floor(duration % 60)
                    : Math.floor(duration % 60)
                } Total`}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center md:justify-center gap-3 mb-4 sm:mb-0">
          <div className="flex items-center justify-center gap-10 md:gap-20 px-8 ">
            <IoIosBookmark className="text-xl" />
            <RiReplay15Fill
              className="text-xl cursor-pointer"
              onClick={() => skipTime(-15)} // Skip backward 15 seconds
            />
            <div
              className="md:p-4 p-2 rounded-full flex items-center justify-center bg-white cursor-pointer"
              onClick={togglePlayPause}>
              {isPlaying ? (
                <FaPause className="text-[#FF0000]" /> // Pause icon
              ) : (
                <IoPlay className="text-[#FF0000]" /> // Play icon
              )}
            </div>
            <RiForward15Fill
              className="text-xl cursor-pointer"
              onClick={() => skipTime(15)} // Skip forward 15 seconds
            />
            <TbRepeat className="text-xl" />
          </div>
          <div className="w-full md:px-0">
            <ProgressBar
              duration={duration}
              currentTime={currentTime}
              onSeek={handleSeek}
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-5 text-lg">
          <p className="text-[1rem]">1x</p>
          <TbPlaylist
            className="text-white cursor-pointer"
            onClick={() => setIsPlayNextOpen((prev) => !prev)}
          />
          <FaHeart className="text-white text-lg" />
          <div className="flex items-center gap-2">
            <MdThumbsUpDown className="text-white" />
            <p className="text-sm">Reviews</p>
          </div>
          <BsThreeDotsVertical
            className="text-white text-xl cursor-pointer"
            onClick={() => setIsPlayerOptionOpen((prev) => !prev)}
          />
        </div>
        {isPlayNextOpen && <PlayNext />}
        {isPlayerOptionOpen && <PlayerOptions />}
      </div>
    )
  );
};

export default Player;
