import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSlider } from "../../app/slices/sliderSlice";

import SliderDiv from "../../components/SliderDiv/SliderDiv";
import Navbar from "./../../components/Navbar/Navbar";
import { BsSortDown, BsSortUpAlt } from "react-icons/bs";

import { FaPlus } from "react-icons/fa6";

const MyPlaylist = () => {
  const [toggleSort, setToggleSort] = useState(true);

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
        <SliderDiv />

        <div
          className={`${
            isUserViewOpen ? "md:col-span-10" : "md:col-span-12"
          } col-span-12 text-white bg-black relative px-4 md:px-10  py-10 h-auto`}>
          <div className="flex items-center justify-between gap-7 mb-6">
            <p className="text-xl">Your Playlist</p>
            <div
              className="flex items-center md:text-base gap-3 text-sm"
              onClick={() => setToggleSort((prev) => !prev)}>
              {toggleSort ? (
                <BsSortUpAlt className="text-lg" />
              ) : (
                <BsSortDown className="text-lg" />
              )}
              <p className="md:text-base text-[8px] whitespace-nowrap">
                Sort by
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mb-5">
            <ul className="flex items-center md:gap-4 gap-2 md:text-sm text-[8px]">
              <li className="rounded-lg border border-white px-2 py-1">
                Podcasts
              </li>
              <li className="rounded-lg border border-white px-2 py-1 whitespace-nowrap">
                Audio Books
              </li>
              <li className="rounded-lg border border-white px-2 py-1">
                Stories
              </li>
            </ul>
            <div className="flex gap-3 text-sm items-center bg-white text-black  px-3 py-1 rounded-md">
              <FaPlus className="text-sm" />
              <p>Create playlist</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPlaylist;
