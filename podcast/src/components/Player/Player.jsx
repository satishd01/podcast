import React, { useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";
import PlayerOptions from "./PlayerOptions/PlayerOptions";
import PlayNext from "./PlayNext/PlayNext";
import ProgressBar from "./ProgressBar";
import { GoClockFill } from "react-icons/go";
import { IoIosBookmark } from "react-icons/io";
import { RiForward15Fill, RiReplay15Fill } from "react-icons/ri";
import { MdSkipNext, MdSkipPrevious, MdThumbsUpDown } from "react-icons/md";
import { FaHeart, FaPause } from "react-icons/fa";
import { IoPlay } from "react-icons/io5";
import { TbPlaylist, TbRepeat } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";

const Player = () => {
  const [isPlayerOptionOpen, setIsPlayerOptionOpen] = useState(false);
  const [isPlayNextOpen, setIsPlayNextOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [songs] = useState([
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
      const newTime = Math.max(
        0,
        Math.min(audioRef.current.currentTime + seconds, duration)
      );
      handleSeek(newTime);
    }
  };

  const toggleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 1.75, 2];
    const nextIndex = (speeds.indexOf(speed) + 1) % speeds.length;
    setSpeed(speeds[nextIndex]);
  };

  const playNextSong = () =>
    setCurrentIndex((prev) => (prev + 1) % songs.length);

  const playPreviousSong = () =>
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);

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
            <p>{songs[currentIndex].name}</p>
            <div className="flex items-center gap-2">
              <GoClockFill className="text-white" />
              <p className="text-xs">
                {`${Math.floor((duration - currentTime) / 60)}:${String(
                  Math.floor((duration - currentTime) % 60)
                ).padStart(2, "0")} Remaining`}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 mb-4 sm:mb-0">
          <div className="flex items-center gap-5 md:gap-20 px-8">
            <IoIosBookmark className="text-xl" />
            <RiReplay15Fill
              className="text-xl cursor-pointer"
              onClick={() => skipTime(-15)}
            />
            <MdSkipPrevious
              className="text-xl cursor-pointer"
              onClick={playPreviousSong}
            />
            <div
              className="p-2 rounded-full bg-white cursor-pointer"
              onClick={togglePlayPause}>
              {isPlaying ? (
                <FaPause className="text-red-600" />
              ) : (
                <IoPlay className="text-red-600" />
              )}
            </div>
            <MdSkipNext
              className="text-xl cursor-pointer"
              onClick={playNextSong}
            />
            <RiForward15Fill
              className="text-xl cursor-pointer"
              onClick={() => skipTime(15)}
            />
            <TbRepeat className="text-xl" />
          </div>
          <div className="w-full">
            <ProgressBar
              duration={duration}
              currentTime={currentTime}
              onSeek={handleSeek}
            />
          </div>
        </div>
        <div className="flex items-center justify-center md:gap-5 gap-10">
          <p onClick={toggleSpeed} className="cursor-pointer">
            {speed}x
          </p>
          <TbPlaylist
            className="cursor-pointer"
            onClick={() => setIsPlayNextOpen((prev) => !prev)}
          />
          <FaHeart />

          <MdThumbsUpDown />
          <BsThreeDotsVertical
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
