import React from "react";
import SuggestionCard from "../../Search/Suggestions/SuggestionCard";

const PodcastData = ({ podcasts }) => {
  return (
    <div className="w-full">
      <div className="flex gap-3 md:gap-16 items-center text-white md:text-base text-sm  md:mt-5 mt-3">
        <p>| Episodes |</p>
        <p>Reviews</p>
        <p>More like this</p>
      </div>

      <div className="my-5">
        <p className="text-xl mb-4">Podcast</p>
        {podcasts.slice(0, 4).map((pod) => (
          <div key={pod._id}>
            <SuggestionCard podcast={pod} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PodcastData;
