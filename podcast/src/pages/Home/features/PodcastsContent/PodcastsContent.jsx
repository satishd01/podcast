import React from "react";
import TopCreators from "../../../../components/Podcasts/TopCreators/TopCreators";
import LatestShows from "../../../../components/Podcasts/LatestShows/LatestShows";
import PodcastList from "../../../../components/Podcasts/PodcastList/PodcastList";

const PodcastsContent = () => {
  return (
    <>
      <TopCreators />
      <LatestShows />
      <PodcastList />
      <div className="md:mt-44 mt-10">
        <TopCreators text={"Top Creators"} isTwoRows={true} />
      </div>
      <div className="md:mb-72 mb-10">
        <LatestShows />
      </div>
    </>
  );
};

export default PodcastsContent;
