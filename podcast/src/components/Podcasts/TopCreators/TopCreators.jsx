import React from "react";
import creators from "../../../utils/json/topCreators.json";
import CreatorCard from "./CreatorCard";
import { useNavigate } from "react-router-dom";

const TopCreators = ({ isTwoRows, text, noSeeAll }) => {
  const navigate = useNavigate();

  const rowCount = isTwoRows ? Math.ceil(creators.length / 2) : creators.length;
  const firstRowCreators = creators?.slice(0, rowCount);
  const secondRowCreators = creators?.slice(rowCount);

  return (
    <>
      <div className="flex items-center justify-between md:pr-0 pr-4">
        <p className="md:text-2xl text-xl">{text}</p>
        <p
          className="text-sm text-gray-400"
          onClick={() => navigate(`/all-top-creators`)}>
          {noSeeAll ? "" : "See all"}
        </p>
      </div>

      <div className="my-5 overflow-x-auto flex space-x-4 w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-hidden">
        {firstRowCreators.map((creator) => (
          <div
            key={creator.id}
            className="flex-shrink-0 cursor-pointer"
            onClick={() => navigate(`/creator/${creator.id}`)}>
            <CreatorCard creator={creator} />
          </div>
        ))}
      </div>

      {isTwoRows && (
        <div className="my-5 overflow-x-auto flex space-x-4 w-full scrollbar-thumb-gray-400 scrollbar-hidden">
          {secondRowCreators.map((creator) => (
            <div
              key={creator.id}
              className="flex-shrink-0 cursor-pointer"
              onClick={() => navigate(`/creator/${creator.id}`)}>
              <CreatorCard creator={creator} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TopCreators;
