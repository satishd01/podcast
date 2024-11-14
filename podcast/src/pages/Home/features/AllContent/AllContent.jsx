import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSlider } from "../../app/slices/sliderSlice";
import Genres from "./../GenresPage/GenresPage";

const AllContent = () => {
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
      <Genres />
    </div>
  );
};

export default AllContent;
