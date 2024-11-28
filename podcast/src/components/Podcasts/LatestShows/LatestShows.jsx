import React from "react";
import shows from "../../../utils/json/podcasts.json";
import ShowCard from "./ShowCard";

const LatestShows = ({ isTwoRows = false, text }) => {
  const rowCount = isTwoRows ? Math.ceil(shows.length / 2) : shows.length;
  const firstRowShows = shows?.slice(0, rowCount);
  const secondRowShows = shows?.slice(rowCount);

  return (
    <>
      <div className="flex items-center justify-between md:mt-14 mt-8 md:pr-0 pr-4">
        <p className="md:text-2xl text-xl">{text}</p>
        <p className="text-sm text-gray-400">See all</p>
      </div>

      <div className="my-5 overflow-x-auto flex space-x-4 w-full scrollbar-thin scrollbar-thumb-gray-400">
        {firstRowShows &&
          firstRowShows.map((show) => (
            <div key={show.id} className="flex-shrink-0 pb-3">
              <ShowCard show={show} />
            </div>
          ))}
      </div>

      {isTwoRows && (
        <div className="my-5 overflow-x-auto flex space-x-4 w-full scrollbar-thin scrollbar-thumb-gray-400">
          {secondRowShows &&
            secondRowShows.map((show) => (
              <div key={show.id} className="flex-shrink-0 pb-3">
                <ShowCard show={show} />
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default LatestShows;
