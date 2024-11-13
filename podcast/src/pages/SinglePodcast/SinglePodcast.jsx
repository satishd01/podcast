import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { toggleSlider } from "../../app/slices/sliderSlice";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Player from "../../components/Player/Player";
import LatestShows from "../../components/Podcasts/LatestShows/LatestShows";
import TopCreators from "../../components/Podcasts/TopCreators/TopCreators";
import PodcastData from "../../components/SinglePodcast/PodcastData/PodcastData";
import PodcastImage from "../../components/SinglePodcast/PodcastImage/PodcastImage";
import PodcastInfo from "../../components/SinglePodcast/PodcastInfo/PodcastInfo";
import podcasts from "../../utils/json/podcasts.json";
import UserSlider from "../Home/features/UserSlider/UserSlider";

const SinglePodcast = () => {
  const params = useParams();

  const podcast = podcasts.find((pod) => pod._id === params.podId);
  const isUserViewOpen = useSelector((state) => state.slider.isSliderOpen);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        dispatch(toggleSlider(false));
      } else {
        dispatch(toggleSlider(true));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.innerWidth < 640;
      if (isUserViewOpen && isMobile) {
        dispatch(toggleSlider(false));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isUserViewOpen, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-12">
        <div
          className={`${
            isUserViewOpen ? "md:col-span-2" : "md:hidden"
          } absolute text-gray-50 bg-black ${
            isUserViewOpen
              ? "z-40 left-0 md:w-full w-6/12 md:mt-0 col-span-12 h-auto transform"
              : "md:relative col-span-0"
          } md:block md:relative md:z-0`}>
          <UserSlider />
        </div>

        <div
          className={`${
            isUserViewOpen ? "md:col-span-10" : "md:col-span-12"
          } col-span-12 text-white bg-black relative h-auto px-4 md:px-5 py-10`}>
          <div className="grid grid-cols-12 md:px-5 md:gap-10 gap-3">
            <PodcastImage podcast={podcast} />
            <div className="col-span-12 md:col-span-7">
              <PodcastInfo podcast={podcast} />

              <PodcastData podcasts={podcasts} />
            </div>
          </div>
          <div>
            <TopCreators text={"Recommended Podcast"} isTwoRows={true} />
          </div>
          <div>
            <LatestShows />
            <LatestShows />
          </div>
          <Footer />
        </div>
      </div>
      <Player />
    </div>
  );
};

export default SinglePodcast;
