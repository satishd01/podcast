import React from "react";
import shows from "../../../utils/json//latestShows.json";
import ShowCard from "./ShowCard";

const LatestShows = () => {
  return (
    <>
      <div className="flex items-center justify-between md:mt-14 mt-8 md:pr-0 pr-4">
        <p className="md:text-2xl text-xl">Latest Shows</p>
        <p className="text-sm text-gray-400">See all</p>
      </div>
      <div className="my-5 overflow-x-auto flex space-x-4 w-full scrollbar-thin scrollbar-thumb-gray-400">
        {shows &&
          shows.map((show) => (
            <div key={show.id} className="flex-shrink-0">
              <ShowCard show={show} />
            </div>
          ))}
      </div>
    </>
  );
};

export default LatestShows;
