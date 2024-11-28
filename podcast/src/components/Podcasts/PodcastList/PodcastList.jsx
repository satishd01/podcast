import React from "react";
import podcasts from "../../../utils/json/podcasts.json";
import PodcastCard from "./PodcastCard.jsx";

const PodcastList = ({ text }) => {
  return (
    <>
      <div className="flex items-center justify-between md:mt-14 mt-8 md:pr-0 pr-4">
        <p className="md:text-2xl text-xl">{text}</p>
        <p className="text-sm text-gray-400">See all</p>
      </div>
      <div className="overflow-x-auto  w-full mt-6">
        <div className="grid grid-rows-3 grid-flow-col md:gap-x-10 gap-x-5  auto-cols-[270px] md:auto-cols-[300px] scrollbar-thin scrollbar-thumb-gray-400">
          {podcasts.map((podcast, index) => (
            <div key={index} className="flex-shrink-0 pb-3">
              <PodcastCard podcast={podcast} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PodcastList;
