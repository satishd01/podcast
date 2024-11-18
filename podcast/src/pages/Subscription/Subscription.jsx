import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSlider } from "../../app/slices/sliderSlice";
import Navbar from "../../components/Navbar/Navbar";
import UserSlider from "../Home/features/UserSlider/UserSlider";

import Footer from "./../../components/Footer/Footer";
import SubscriptionPlans from "../../components/Subscription/SubscriptionPlans/SubscriptionPlans";

import subsBg from "../../images/subsBG.png";

const Subscription = () => {
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
          } col-span-12 text-white bg-black relative h-auto px-4 md:px-10 py-10`}>
          <div className=" flex flex-col justify-center items-center mb-5">
            <div className="flex md:flex-row flex-col   md:items-end items-center gap-3">
              <p className="md:text-4xl text-xl font-semibold">
                Get 7 Days Free trial
              </p>
              <p className="md:text-xl text-sm"> ( For new users ) </p>
            </div>
            <p className="md:text-xl text-sm mt-3">
              {" "}
              ( Discount for students 10% and 20% off on yearly plans ){" "}
            </p>
          </div>
          <div className="relative w-full">
            <img
              alt="subscription background"
              src={subsBg}
              className="absolute md:block hidden top-0 left-0 w-full h-full object-cover z-0"
            />

            <div className="relative z-10 ">
              <SubscriptionPlans />
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Subscription;
