import React from "react";
import { IoPlay } from "react-icons/io5";

const Player = () => {
  return (
    <div className="bg-black border border-white py-4 sticky bottom-0 flex justify-center">
      <div className="md:p-3 p-2 rounded-full bg-white">
        <IoPlay className="text-[#FF0000]" />
      </div>
    </div>
  );
};

export default Player;
