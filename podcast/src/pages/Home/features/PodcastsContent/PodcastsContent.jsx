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
    </>
  );
};

export default PodcastsContent;
