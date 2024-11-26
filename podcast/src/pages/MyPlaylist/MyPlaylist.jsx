import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSlider } from "../../app/slices/sliderSlice";

import SliderDiv from "../../components/SliderDiv/SliderDiv";
import Navbar from "./../../components/Navbar/Navbar";

import PlaylistBody from "../../components/MyPlaylist/PlaylistBody/PlaylistBody";
import { userSliderHandler } from "../../utils/constants";

const MyPlaylist = () => {
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

      <div className="grid grid-cols-12 ">
        <SliderDiv />

        <div
          className={`${
            isUserViewOpen ? "md:col-span-10" : "md:col-span-12"
          } col-span-12 text-white bg-black relative px-4 md:px-10  py-10 h-auto`}>
          <PlaylistBody />
        </div>
      </div>
    </div>
  );
};

export default MyPlaylist;
