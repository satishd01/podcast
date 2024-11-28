import React, { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { GoClockFill } from "react-icons/go";
import { IoIosBookmark } from "react-icons/io";
import { IoPlay } from "react-icons/io5";
import { FaPause } from "react-icons/fa";
import { MdSkipPrevious, MdThumbsUpDown } from "react-icons/md";
import { RiForward15Fill, RiReplay15Fill } from "react-icons/ri";
import { TbPlaylist, TbRepeat } from "react-icons/tb";
import { MdSkipNext } from "react-icons/md"; // Import skip next icon
import { BiSkipPrevious } from "react-icons/bi"; // Import skip previous icon
import { useSelector } from "react-redux";
import { playerTitleLength } from "../../utils/constants";
import PlayerOptions from "./PlayerOptions/PlayerOptions";
import PlayNext from "./PlayNext/PlayNext";
import ProgressBar from "./ProgressBar";

const Player = () => {
  const [isPlayerOptionOpen, setIsPlayerOptionOpen] = useState(false);
  const [isPlayNextOpen, setIsPlayNextOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // Default is false (paused)
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [songs, setSongs] = useState([
    {
      name: "Podcast 1",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      imageUrl: "https://placehold.co/50",
    },
    {
      name: "Podcast 2",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      imageUrl: "https://placehold.co/50",
    },
    {
      name: "Podcast 3",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      imageUrl: "https://placehold.co/50",
    },
  ]);

  const audioRef = useRef(null);
  const activePlayer = useSelector((state) => state.activePlayer.activePlayer);

  useEffect(() => {
    if (audioRef.current) {
      const currentSong = songs[currentIndex];
      audioRef.current.src = currentSong.audioUrl;

      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration || 0);
      };
    }
  }, [currentIndex, songs]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  }, [speed]);

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
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const skipTime = (seconds) => {
    if (audioRef.current) {
      let newTime = audioRef.current.currentTime + seconds;
      newTime = Math.max(0, Math.min(newTime, duration));
      handleSeek(newTime);
    }
  };

  const toggleSpeed = () => {
    setSpeed((prevSpeed) => {
      switch (prevSpeed) {
        case 1:
          return 1.25;
        case 1.25:
          return 1.5;
        case 1.5:
          return 1.75;
        case 1.75:
          return 2;
        default:
          return 1;
      }
    });
  };

  const playNextSong = () => {
    if (currentIndex < songs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const playPreviousSong = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(songs.length - 1);
    }
  };

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [currentIndex]);

  return (
    activePlayer?.name && (
      <div className="bg-black z-30 py-4 sticky bottom-0 flex flex-col sm:flex-row justify-between text-white px-4">
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={playNextSong}
        />
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
          <img
            alt={songs[currentIndex].name}
            src={songs[currentIndex].imageUrl}
            className="rounded-md w-12 h-12 md:w-16 md:h-16"
          />
          <div className="text-sm">
            <p>
              {songs[currentIndex].name.length > playerTitleLength
                ? `${songs[currentIndex].name.slice(0, playerTitleLength)}....`
                : songs[currentIndex].name}
            </p>
            <div className="flex items-center gap-2">
              <GoClockFill className="text-white" />
              <p className="text-xs">
                {`${Math.floor((duration - currentTime) / 60)}:${
                  Math.floor((duration - currentTime) % 60) < 10
                    ? "0" + Math.floor((duration - currentTime) % 60)
                    : Math.floor((duration - currentTime) % 60)
                } Remaining`}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center md:justify-center gap-3 mb-4 sm:mb-0">
          <div className="flex items-center justify-center gap-5 md:gap-20 px-8">
            <IoIosBookmark className="text-xl" />
            <RiReplay15Fill
              className="text-xl cursor-pointer"
              onClick={() => skipTime(-15)}
            />
            <MdSkipPrevious
              className="text-white text-xl cursor-pointer"
              onClick={playPreviousSong}
            />

            <div
              className="md:p-4 p-2 rounded-full flex items-center justify-center bg-white cursor-pointer"
              onClick={togglePlayPause}>
              {isPlaying ? (
                <FaPause className="text-[#FF0000]" />
              ) : (
                <IoPlay className="text-[#FF0000]" />
              )}
            </div>
            <MdSkipNext
              className="text-white text-xl cursor-pointer"
              onClick={playNextSong}
            />
            <RiForward15Fill
              className="text-xl cursor-pointer"
              onClick={() => skipTime(15)}
            />
            <TbRepeat className="text-xl" />
          </div>
          <div className="w-full md:px-0">
            <ProgressBar
              duration={duration}
              currentTime={currentTime}
              onSeek={handleSeek}
              playbackSpeed={speed}
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-5 text-lg">
          <p className="text-[1rem]" onClick={toggleSpeed}>
            {speed}x
          </p>
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
