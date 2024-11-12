import React from "react";
import { creatorNameLength } from "../../../utils/constants.";

const CreatorCard = ({ creator }) => {
  return (
    <>
      <div className="w-full">
        <img
          alt={creator?.name}
          src={creator?.imageUrl}
          className="md:w-40 md:h-40 h-32 w-32 rounded-md object-cover"
        />
        <p className="md:mt-2 mt-1 md:text-lg font-semibold text-sm">
          {creator.title}
        </p>
        <p className="md:text-sm text-gray-300 text-xs">
          {`${creator.type} . ${
            creator.name.length > creatorNameLength
              ? `${creator.name.slice(0, creatorNameLength)}...`
              : creator.name
          }`}
        </p>
      </div>
    </>
  );
};

export default CreatorCard;
