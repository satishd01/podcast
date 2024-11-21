import React from "react";

import podcasts from "../../../utils/json/podcasts.json";
import { IoPlay } from "react-icons/io5";
import { playerTitleLength } from "../../../utils/constants";

const PlaylistPodcasts = () => {
  return (
    <div className="mt-4">
      {podcasts &&
        podcasts.slice(0, 5).map((pod) => (
          <div
            key={pod.id}
            className="grid grid-cols-12 items-center gap-4 sm:gap-8 mb-3">
            {/* Podcast Thumbnail */}
            <div className="col-span-2 flex justify-center">
              <img
                alt={pod.name}
                src={pod.imageUrl}
                className="rounded-md w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16"
              />
            </div>
            {/* Podcast Details */}
            <div className="col-span-8">
              <p className="text-sm sm:text-base font-semibold truncate">
                {pod.name.length > playerTitleLength
                  ? `${pod.name.slice(0, playerTitleLength)}....`
                  : pod.name}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 truncate">
                {pod.description.length > playerTitleLength
                  ? `${pod.description.slice(0, playerTitleLength)}....`
                  : pod.description}
              </p>
            </div>
            {/* Play Button */}
            <div className="col-span-2 flex justify-end">
              <button className="p-2 sm:p-3 rounded-full flex items-center justify-center bg-white shadow-md">
                <IoPlay className="text-red-500 text-lg sm:text-xl" />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PlaylistPodcasts;
