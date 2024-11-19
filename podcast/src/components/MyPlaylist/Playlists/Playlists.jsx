import React from "react";
import { playlist } from "../../../utils/constants";
import { GiBookCover } from "react-icons/gi";

import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Playlists = () => {
  return (
    <>
      {playlist &&
        playlist.map((pod) => (
          <div
            key={pod.id}
            className="flex items-center justify-between bg-[#2F2F2F] mb-4 rounded-md">
            <div className="flex items-center gap-4">
              <div className="bg-black p-4 rounded-md border border-white">
                <GiBookCover className="text-2xl text-red-600" />
              </div>
              <div className="text-sm">
                <p>{pod.name}</p>
                <p className="text-xs">{`${pod.episodes} episodes`}</p>
              </div>
            </div>
            <MdOutlineKeyboardArrowRight className="mr-4 text-xl" />
          </div>
        ))}
    </>
  );
};

export default Playlists;
