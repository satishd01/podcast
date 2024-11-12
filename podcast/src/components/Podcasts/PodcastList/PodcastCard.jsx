import React from "react";
import { GoClockFill } from "react-icons/go";
import { IoPlay } from "react-icons/io5";

const PodcastCard = ({ podcast }) => {
  return (
    <div className="flex items-center gap-3">
      <img
        alt={podcast.name}
        src={podcast.imageUrl}
        className="rounded-md w-12 h-12 md:w-16 md:h-16"
      />
      <div className="text-sm ">
        <p className="whitespace-nowrap">{podcast.name}</p>
        <div className="flex items-end gap-2">
          <GoClockFill className="text-white" />
          <p className="text-xs whitespace-nowrap">
            {`${podcast.time} Minutes of listening`}
          </p>
          <div className="md:p-3 p-2 rounded-full flex items-center justify-center bg-white">
            <IoPlay className="text-[#FF0000]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastCard;
