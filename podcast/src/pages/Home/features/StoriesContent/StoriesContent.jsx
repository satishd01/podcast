import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStories } from "../../../../apis/fetchStories";
// import { fetchTopStoryCreators } from "../../../../apis/fetchTopStoryCreators";
import { fetchTopPodcastCreators } from "../../../../apis/fetchTopPodcastCreators";
import { toggleSlider } from "../../../../app/slices/sliderSlice";
import Footer from "../../../../components/Footer/Footer";
import Navbar from "../../../../components/Navbar/Navbar";
import LatestShows from "../../../../components/Podcasts/LatestShows/LatestShows";
import StoryList from "../../../../components/Podcasts/Strorylist/Storylist";
import TopCreators from "../../../../components/Podcasts/TopCreators/TopCreators";
import SliderDiv from "../../../../components/SliderDiv/SliderDiv";
import {
  resizeHandler,
  scrollToTop,
  userSliderHandler,
} from "../../../../utils/constants";

const StoriesContent = () => {
  const [stories, setStories] = useState([]);
  const [topCreators, setTopCreators] = useState([]);

  const isUserViewOpen = useSelector((state) => state.slider.isSliderOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    scrollToTop();
    // fetchTopStoryCreators(setTopCreators);
    fetchTopPodcastCreators(setTopCreators);
    fetchStories(setStories);
  }, []);

  useEffect(() => {
    resizeHandler(dispatch, toggleSlider);
  }, [dispatch]);

  useEffect(() => {
    userSliderHandler(dispatch, toggleSlider, isUserViewOpen);
  }, [isUserViewOpen, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-12">
        <SliderDiv />

        <div
          className={`${
            isUserViewOpen ? "md:col-span-10" : "md:col-span-12"
          } col-span-12 text-white bg-black relative h-auto px-4 md:px-10 py-10`}>
          <TopCreators
            text={"Top Creators"}
            data={topCreators}
            page="creator"
          />
          <LatestShows text={"Latest Shows"} data={stories} page="story" />
          <StoryList text={"Stories"} data={stories} page="story" />
          {/* <div className="md:mt-44 mt-10">
            <TopCreators
              text={"Top Creators"}
              isTwoRows={true}
              data={topCreators}
              page="creator"
            />
          </div>
          <div className="md:mb-72 mb-10">
            <LatestShows text={"Latest Shows"} data={stories} page="story" />
          </div> */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default StoriesContent;