import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSlider } from "../../../../app/slices/sliderSlice";
import Footer from "../../../../components/Footer/Footer";
import Navbar from "../../../../components/Navbar/Navbar";
import UserSlider from "../../../Home/features/UserSlider/UserSlider";
import SliderDiv from "../../../../components/SliderDiv/SliderDiv";

const StoriesContent = () => {
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
       <SliderDiv  /> 

        <div
          className={`${
            isUserViewOpen ? "md:col-span-10" : "md:col-span-12"
          } col-span-12 text-white bg-black relative h-auto px-4 md:px-10 py-10`}>
          <p>Stories</p>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default StoriesContent;
