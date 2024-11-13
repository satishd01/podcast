import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaBell } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { IoArrowDownCircleSharp } from "react-icons/io5";

const PodcastInfo = ({ podcast }) => {
  return (
    <>
      <p className="md:text-3xl text-xl font-semibold">{podcast.studio}</p>
      <p className="md:text-2xl text-xl md:mt-4 mt-2 font-light">
        {podcast.name}
      </p>
      <p className="md:text-lg text-sm font-light">{`Total ${podcast.episodes} episodes`}</p>

      <p className="md:text-sm text-sm md:mt-8 mt-4 font-light">
        {podcast.description}
      </p>
      <div className="flex gap-4 md:gap-5 items-center text-white text-xl md:mt-5 mt-4">
        <button className="px-4 py-1 rounded-lg text-sm md:text-[15px] bg-white text-black font-semibold">
          Follow
        </button>
        <FaBell className="text-lg" />
        <IoMdShare />
        <IoArrowDownCircleSharp />
        <AiFillPlusCircle />
      </div>
    </>
  );
};

export default PodcastInfo;
