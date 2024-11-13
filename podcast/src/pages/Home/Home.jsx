import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import UserSlider from "./features/UserSlider/UserSlider";
import Footer from "../../components/Footer/Footer";
import PodcastsContent from "./features/PodcastsContent/PodcastsContent";
import StoriesContent from "./features/StoriesContent/StoriesContent";
import AllContent from "./features/AllContent/AllContent";
import AudioBooksContent from "./features/AudioBooksContent/AudioBooksContent";
import Player from "../../components/Player/Player";
import { toggleSlider } from "../../app/slices/sliderSlice";

const Home = () => {
  const isUserViewOpen = useSelector((state) => state.slider.isSliderOpen);
  const activeTab = useSelector((state) => state.activeTab.activeTab);

  const dispatch = useDispatch();

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
    const isMobile = window.innerWidth < 640;
    if (isMobile && isUserViewOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isUserViewOpen]);

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
          } col-span-12 text-white bg-black relative h-auto px-4 md:px-10 py-10`}>
          <div className="mb-10">{renderContent()}</div>
          <Footer />
        </div>
      </div>
      <Player />
    </div>
  );
};

export default Home;
