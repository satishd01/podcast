import React from "react";
import {
  creatorNameLength,
  creatorTitleLength,
} from "../../../utils/constants";

const CreatorCard = ({ info }) => {
  return (
    <>
      <div>
        <img
          alt={info?.creatorName || info?.show_title}
          src={info?.image}
          className="md:w-40 md:h-40 h-32 w-32 rounded-md object-cover shadow-lg hover:shadow-xl transform hover:scale-90 transition duration-300 ease-in-out"
        />
        <p className="md:mt-2 mt-1 md:text-lg font-semibold text-sm">
          {`${
            (info?.showTitle || info?.show_title)?.length > creatorTitleLength
              ? `${(info?.showTitle || info?.show_title)?.slice(
                  0,
                  creatorTitleLength
                )}...`
              : info?.showTitle || info?.show_title
          }`}
        </p>
        <p className="md:text-sm text-gray-300 text-xs pb-3">
          {`${info?.creatorType || info?.genre} . ${
            (info?.creatorName || info?.creator_name)?.length >
            creatorNameLength
              ? `${(info?.creatorName || info?.creator_name)?.slice(
                  0,
                  creatorNameLength
                )}...`
              : info?.creatorName || info?.creator_name
          }`}
        </p>
      </div>
    </>
  );
};

export default CreatorCard;
