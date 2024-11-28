import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSlider } from "../../app/slices/sliderSlice";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import SliderDiv from "../../components/SliderDiv/SliderDiv";
import {
  resizeHandler,
  scrollToTop,
  userSliderHandler,
} from "../../utils/constants";

import ShowCard from "../../components/Podcasts/LatestShows/ShowCard";
import podcasts from "../../utils/json/podcasts.json";

const AllLatestShows = () => {
  scrollToTop();
  const dispatch = useDispatch();

  const isUserViewOpen = useSelector((state) => state.slider.isSliderOpen);

  useEffect(() => {
    resizeHandler(dispatch, toggleSlider);
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
          } col-span-12 text-white bg-black relative h-auto px-4 md:px-10 py-10`}>
          <div className="flex items-center justify-between md:pr-0 pr-4">
            <p className="md:text-2xl text-xl">{"All Latest Shows"}</p>
          </div>
          <div className="my-5 flex flex-wrap  gap-4 md:gap-10 w-full ">
            {podcasts &&
              podcasts.map((show) => (
                <div key={show.id} className="flex-shrink-0 pb-3">
                  <ShowCard show={show} />
                </div>
              ))}
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AllLatestShows;
