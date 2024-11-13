import React from "react";
import { GoClockFill } from "react-icons/go";
import { IoPlay } from "react-icons/io5";

import { IoMdShare } from "react-icons/io";
import { IoArrowDownCircleSharp } from "react-icons/io5";
import { AiFillPlusCircle } from "react-icons/ai";

const SuggestionCard = ({ podcast }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex gap-3 items-center">
        <img
          alt={podcast.name}
          src={podcast.imageUrl}
          className="rounded-lg w-12 h-12 md:w-16 md:h-16"
        />
        <div className="text-sm">
          <p>{podcast.name}</p>
          <p>{`Season ${podcast.season}`}</p>
          <div className="flex items-center gap-2">
            <GoClockFill className="text-white" />
            <p className="text-xs"> {`${podcast.time} Minutes of listening`}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-5 items-center text-white text-xl">
        <IoMdShare />
        <IoArrowDownCircleSharp />
        <AiFillPlusCircle />
      </div>

      <div className="md:p-2 p-2 rounded-full flex items-center justify-center bg-white">
        <IoPlay className="text-[#FF0000] " />
      </div>
    </div>
  );
};

export default SuggestionCard;
