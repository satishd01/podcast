import React from "react";
import genres from "../../../utils/json/genres.json";
import GenreCard from "./GenreCard";

const Genres = () => {
  return (
    <>
      <p className="text-white text-2xl md:px-5  mb-4">Genres</p>
      <div className="flex md:grid md:grid-cols-3 gap-6 md:px-5 overflow-x-auto md:overflow-visible">
        {genres &&
          genres.map((genre) => (
            <div
              key={genre._id}
              className="min-w-[300px] flex-shrink-0 md:min-w-0 pb-3">
              <GenreCard genre={genre} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Genres;
