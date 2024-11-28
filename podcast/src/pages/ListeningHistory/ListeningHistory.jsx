import React, { useEffect, useState } from "react";
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

import { useNavigate } from "react-router-dom";
import History from "../../components/ListeningHistory/History";
import { BsSortDown, BsSortUpAlt } from "react-icons/bs";

const ListeningHistory = () => {
  const [toggleSort, setToggleSort] = useState(true);

  useEffect(() => {
    scrollToTop();
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          <div>
            <p className="text-2xl font-semibold mb-4">Listening history</p>
            <div className="flex items-center justify-between mb-10">
              <ul className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                <li className="rounded-lg border px-2 py-1">Podcasts</li>
                <li className="rounded-lg border px-2 py-1 whitespace-nowrap">
                  Audio Books
                </li>
                <li className="rounded-lg border px-2 py-1">Stories</li>
              </ul>
              <div
                className="flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
                onClick={() => setToggleSort((prev) => !prev)}>
                {toggleSort ? (
                  <BsSortUpAlt className="text-base sm:text-lg" />
                ) : (
                  <BsSortDown className="text-base sm:text-lg" />
                )}
                <p className="whitespace-nowrap">Sort by</p>
              </div>
            </div>
            <History />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ListeningHistory;
