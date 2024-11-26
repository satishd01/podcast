import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSlider } from "../../app/slices/sliderSlice";
import UserSlider from "../Home/features/UserSlider/UserSlider";
import { FaHeart } from "react-icons/fa";

import Navbar from "./../../components/Navbar/Navbar";
import LikedList from "./../../components/LikedPodcasts/LikedList/LikedList";
import SliderDiv from "../../components/SliderDiv/SliderDiv";
import { userSliderHandler } from "../../utils/constants";

const LikedPodcasts = () => {
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
          } col-span-12 text-white bg-black relative   py-10 h-auto`}>
          <div className="flex items-center gap-7 px-4 md:px-10">
            <div className="p-12 rounded-md border border-white">
              <FaHeart className="text-5xl text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold">Your Likes</p>
              <p className="text-sm mt-2 text-gray-500">10 Likes</p>
            </div>
          </div>

          <LikedList />
        </div>
      </div>
    </div>
  );
};

export default LikedPodcasts;
