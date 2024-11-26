import React from "react";
import { FaHeart } from "react-icons/fa";
import { IoPlay } from "react-icons/io5";

const ShowCard = ({ show }) => {
  return (
    <>
      <div className="relative shadow-lg hover:shadow-xl transform hover:scale-90 transition duration-300 ease-in-out ">
        <FaHeart className="absolute right-3 top-3 text-[#FF0000]" />
        <img
          alt={show.creatorName}
          src={show.imageUrl}
          className="md:w-72 md:h-72 h-56 w-56 rounded-xl object-cover"
        />
        <div className="flex justify-center px-3">
          <div className=" md:w-64   w-56  absolute bottom-4 bg-[#2D272773] px-4 py-3 flex items-center justify-between rounded-md opacity-70">
            <div>
              <p>{show.creatorName}</p>
              <p className="text-xs">{show.genre}</p>
            </div>
            <div className="md:p-3 p-2 rounded-full bg-white">
              <IoPlay className="text-[#FF0000]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowCard;
