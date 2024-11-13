import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import podcasts from "../../utils/json/podcasts.json";
import Player from "../../components/Player/Player";
import OtherFooter from "../../components/OtherFooter/OtherFooter";
import UserSlider from "../Home/features/UserSlider/UserSlider";
import Navbar from "../../components/Navbar/Navbar";
import { toggleSlider } from "../../app/slices/sliderSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoMdShare } from "react-icons/io";
import { IoArrowDownCircleSharp } from "react-icons/io5";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaBell } from "react-icons/fa";
import SuggestionCard from "../../components/Search/Suggestions/SuggestionCard";
import TopCreators from "../../components/Podcasts/TopCreators/TopCreators";
import LatestShows from "../../components/Podcasts/LatestShows/LatestShows";
import Footer from "../../components/Footer/Footer";

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
          {" "}
          <div className="grid grid-cols-12 md:px-5 gap-10">
            <div className="col-span-5">
              <img
                alt={podcast.name}
                src={podcast.imageUrl}
                className="md:w-[400px] w-[200px] rounded-xl"
              />
            </div>
            <div className="col-span-7">
              <p className="md:text-3xl text-xl font-semibold">
                {podcast.studio}
              </p>
              <p className="md:text-2xl text-xl md:mt-4 mt-2 font-light">
                {podcast.name}
              </p>
              <p className="md:text-lg text-sm font-light">{`Total ${podcast.episodes} episodes`}</p>

              <p className="md:text-sm text-sm md:mt-8 mt-4 font-light">
                {podcast.description}
              </p>
              <div className="flex gap-4 md:gap-5 items-center text-white text-xl md:mt-5 mt-4">
                <button className="px-4 py-1 rounded-lg text-sm md:text-[15px] bg-white text-black font-semibold">
                  Follow
                </button>
                <FaBell className="text-lg" />
                <IoMdShare />
                <IoArrowDownCircleSharp />
                <AiFillPlusCircle />
              </div>

              <div className="flex gap-3 md:gap-16 items-center text-white md:text-base text-sm  md:mt-5 mt-3">
                <p>| Episodes |</p>
                <p>Reviews</p>
                <p>More like this</p>
              </div>

              <div className="my-5">
                <p className="text-xl mb-4">Podcast</p>

                <div className="overflow-x-auto md:overflow-x-hidden">
                  <div className="flex md:block md:space-x-0 space-x-20 w-full">
                    {podcasts.slice(0, 4).map((pod) => (
                      <SuggestionCard key={pod._id} podcast={pod} />
                    ))}
                  </div>
                </div>
              </div>
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
