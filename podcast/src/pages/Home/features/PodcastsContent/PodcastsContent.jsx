import React from "react";
import TopCreators from "../../../../components/podcasts/TopCreators/TopCreators";
import LatestShows from "../../../../components/podcasts/LatestShows/LatestShows";
import PodcastList from "../../../../components/podcasts/podcastList/PodcastList";

const PodcastsContent = () => {
  return (
    <>
      <TopCreators />
      <LatestShows />
      <PodcastList />
      <div className="md:mt-44 mt-10">
        <TopCreators isTwoRows={true} />
      </div>
      <div className="md:mb-72 mb-10">
        <LatestShows />
      </div>
    </>
  );
};

export default PodcastsContent;
