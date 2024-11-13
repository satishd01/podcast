import React from "react";

const GenreCard = ({ genre }) => {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out w-full ">
      <img
        alt={genre.name}
        src={genre.imageUrl}
        className="w-full h-[200px] object-cover rounded-lg"
      />
      <div className="absolute bottom-3 left-5">
        <p className="text-white text-lg font-semibold">{genre.genre}</p>
      </div>
    </div>
  );
};

export default GenreCard;
