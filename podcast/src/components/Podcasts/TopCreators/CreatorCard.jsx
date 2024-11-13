import React from "react";
import {
  creatorNameLength,
  creatorTitleLength,
} from "../../../utils/constants.";

const CreatorCard = ({ creator }) => {
  return (
    <>
      <div>
        <img
          alt={creator?.name}
          src={creator?.imageUrl}
          className="md:w-40 md:h-40 h-32 w-32 rounded-md object-cover shadow-lg hover:shadow-xl transform hover:scale-90"
        />
        <p className="md:mt-2 mt-1 md:text-lg font-semibold text-sm">
          {`${
            creator.title.length > creatorTitleLength
              ? `${creator.title.slice(0, creatorTitleLength)}...`
              : creator.title
          }`}
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
