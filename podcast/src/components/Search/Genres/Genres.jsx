import React from "react";
import genres from "../../../utils/json/genres.json";
import GenreCard from "./GenreCard";

const Genres = () => {
  return (
    <>
      <p className="text-white text-2xl px-5 mb-4">Genres</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-5">
        {genres &&
          genres.map((genre) => <GenreCard genre={genre} key={genre._id} />)}
      </div>
    </>
  );
};

export default Genres;
