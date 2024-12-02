import React from "react";
import {
  creatorNameLength,
  creatorTitleLength,
} from "../../../utils/constants";

const CreatorCard = ({ creator }) => {
  return (
    <>
      <div>
        <img
          alt={creator?.creatorName}
          src={creator?.image}
          className="md:w-40 md:h-40 h-32 w-32 rounded-md object-cover shadow-lg hover:shadow-xl transform hover:scale-90 transition duration-300 ease-in-out"
        />
        <p className="md:mt-2 mt-1 md:text-lg font-semibold text-sm">
          {`${
            creator?.showTitle?.length > creatorTitleLength
              ? `${creator.showTitle?.slice(0, creatorTitleLength)}...`
              : creator.showTitle
          }`}
        </p>
        <p className="md:text-sm text-gray-300 text-xs pb-3">
          {`${creator?.creatorType} . ${
            creator?.creatorName?.length > creatorNameLength
              ? `${creator?.creatorName?.slice(0, creatorNameLength)}...`
              : creator?.creatorName
          }`}
        </p>
      </div>
    </>
  );
};

export default CreatorCard;
