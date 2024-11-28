import React from "react";
import SuggestionCard from "../../Search/Suggestions/SuggestionCard";
import { useNavigate } from "react-router-dom";

const CreatorData = ({ podcasts }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <div className="my-5">
        <p className="text-xl mb-4">Podcast</p>
        {podcasts.slice(0, 4).map((pod) => (
          <div
            key={pod._id}
            onClick={() => navigate(`/podcast/${pod._id}`)}
            className="cursor-pointer">
            <SuggestionCard podcast={pod} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatorData;
