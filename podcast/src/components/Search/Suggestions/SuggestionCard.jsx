import React from "react";
import { GoClockFill } from "react-icons/go";
import { IoPlay } from "react-icons/io5";
import { IoMdShare } from "react-icons/io";
import { IoArrowDownCircleSharp } from "react-icons/io5";
import { AiFillPlusCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setActivePlayer } from "../../../app/slices/activePlayerSlice";

const SuggestionCard = ({ podcast }) => {
  const dispatch = useDispatch();

  const handlePlayer = () => {
    dispatch(setActivePlayer(podcast));
  };
  return (
    <div className="flex items-center gap-4 justify-between  rounded-lg mb-4">
      <div className="flex items-center gap-2">
        <img
          alt={podcast.name}
          src={podcast.imageUrl}
          className="rounded-lg w-12 h-12 sm:w-16 sm:h-16"
        />
        <div className="text-xs sm:text-sm text-white">
          <p className="font-semibold whitespace-nowrap">{podcast.name}</p>
          <p className="text-gray-300 whitespace-nowrap">{`Season ${podcast.season}`}</p>
          <div className="flex items-center gap-1 text-gray-400">
            <GoClockFill />
            <p className="whitespace-nowrap">{`${podcast.time} min`}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-1 sm:gap-3 items-center text-white text-lg sm:text-xl">
        <IoMdShare />
        <IoArrowDownCircleSharp />
        <AiFillPlusCircle />
      </div>

      <div
        className="p-2 rounded-full flex items-center justify-center bg-white cursor-pointer"
        onClick={handlePlayer}>
        <IoPlay className="text-[#FF0000]" />
      </div>
    </div>
  );
};

export default SuggestionCard;
