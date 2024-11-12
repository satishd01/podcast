import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import UserSlider from "./features/userSlider/userSlider";
import Footer from "../../components/Footer/Footer";
import PodcastsContent from "./features/PodcastsContent/PodcastsContent";
import StoriesContent from "./features/StoriesContent/StoriesContent";
import AllContent from "./features/AllContent/AllContent";
import AudioBooksContent from "./features/AudioBooksContent/AudioBooksContent";

const Home = () => {
  const isUserViewOpen = useSelector((state) => state.slider.isSliderOpen);
  const activeTab = useSelector((state) => state.activeTab.activeTab);

  const renderContent = () => {
    switch (activeTab) {
      case "Podcasts":
        return <PodcastsContent />;
      case "Stories":
        return <StoriesContent />;
      case "Audio Book":
        return <AudioBooksContent />;
      default:
        return <AllContent />;
    }
  };

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-12">
        <div
          className={`${
            isUserViewOpen ? "md:col-span-2" : "md:hidden"
          } absolute text-gray-50 bg-black ${
            isUserViewOpen
              ? "z-40  left-0 md:w-full w-6/12 md:mt-0 col-span-12 h-auto transform  "
              : "  md:relative col-span-0 "
          } md:block md:relative md:z-0`}>
          <UserSlider />
        </div>

        <div
          className={`${
            isUserViewOpen ? "md:col-span-10" : "md:col-span-12"
          } col-span-12 text-white bg-black relative  h-auto px-4 md:px-10 py-10`}>
          <div className="mb-10">{renderContent()}</div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
