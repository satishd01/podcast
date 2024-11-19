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
            key={pod.key}
            className="grid grid-cols-12 items-center gap-8 mb-3">
            <div className="col-span-2">
              <img
                alt={pod.name}
                src={pod.imageUrl}
                className="rounded-md w-12 h-12 md:w-16 md:h-16"
              />
            </div>
            <div className="col-span-8">
              <p>
                {pod.name.length > playerTitleLength
                  ? `${pod.name.slice(0, playerTitleLength)}....`
                  : pod.name}
              </p>
              <p className="text-sm">
                {pod.description.length > playerTitleLength
                  ? `${pod.description.slice(0, playerTitleLength)}....`
                  : pod.description}
              </p>
            </div>
            <div className="col-span-2 ">
              <div className="inline-block">
                <div className="md:p-4 p-2 rounded-full flex items-center justify-center bg-white">
                  <IoPlay className="text-[#FF0000]" />
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PlaylistPodcasts;
