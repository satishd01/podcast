import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { GoClockFill } from "react-icons/go";
import { IoIosBookmark } from "react-icons/io";
import { IoPlay } from "react-icons/io5";
import { MdThumbsUpDown } from "react-icons/md";
import { RiForward15Fill, RiReplay15Fill } from "react-icons/ri";
import { TbPlaylist, TbRepeat } from "react-icons/tb";
import { playerTitleLength } from "../../utils/constants.";
import ProgressBar from "./ProgressBar";

const Player = () => {
  const data = {
    name: "The Desi crime Fiction Podcast episode",
    time: 15,
    imageUrl: "https://placehold.co/50",
  };

  return (
    <div className="bg-black py-4 sticky bottom-0 flex flex-col sm:flex-row justify-between text-white px-4">
      <div className="flex items-center gap-3 mb-4 sm:mb-0">
        <img
          alt={data.name}
          src={data.imageUrl}
          className="rounded-md w-12 h-12 md:w-16 md:h-16"
        />
        <div className="text-sm">
          <p>
            {data.name.length > playerTitleLength
              ? `${data.name.slice(0, playerTitleLength)}....`
              : data.name}
          </p>
          <div className="flex items-center gap-2">
            <GoClockFill className="text-white" />
            <p className="text-xs"> {`${data.time} Minutes of listening`}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center md:justify-center gap-3 mb-4 sm:mb-0">
        <div className="flex items-center justify-center gap-10 md:gap-20 px-8 ">
          <IoIosBookmark className="text-xl" />
          <RiReplay15Fill className="text-xl" />
          <div className="md:p-4 p-2 rounded-full flex items-center justify-center bg-white">
            <IoPlay className="text-[#FF0000]" />
          </div>
          <RiForward15Fill className="text-xl" />
          <TbRepeat className="text-xl" />
        </div>
        <div className="w-full md:px-0 px-10">
          <ProgressBar duration={200} />
        </div>
      </div>
      <div className="flex items-center gap-5 text-lg">
        <p className="text-[1rem]">1x</p>
        <TbPlaylist className="text-white" />
        <FaHeart className="text-white text-lg" />
        <div className="flex items-center gap-2">
          <MdThumbsUpDown className="text-white" />
          <p className="text-sm">Reviews</p>
        </div>
        <BsThreeDotsVertical className="text-white text-xl" />
      </div>
    </div>
  );
};

export default Player;
