import React, { useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleSlider } from "../../app/slices/sliderSlice";
import UserSlider from "../Home/features/UserSlider/UserSlider";
import { IoDownload } from "react-icons/io5";

import Navbar from "./../../components/Navbar/Navbar";

const DownloadedPodcasts = () => {
  const dispatch = useDispatch();

  const isUserViewOpen = useSelector((state) => state.slider.isSliderOpen);

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
        const scrollThreshold = 200;
        if (isUserViewOpen && isMobile && window.scrollY > scrollThreshold) {
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
          } col-span-12 text-white bg-black relative   py-10 h-auto`}>
          <div className="flex items-center gap-7 px-4 md:px-10">
            <div className="p-12 rounded-md border border-white">
              <IoDownload className="text-5xl text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold">Your Downloads</p>
              <p className="text-sm mt-2 text-gray-500">10 Downloads</p>
            </div>
          </div>

          {/* <LikedList /> */}
        </div>
      </div>
    </div>
  );
};

export default DownloadedPodcasts;
