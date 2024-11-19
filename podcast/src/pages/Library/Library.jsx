import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSlider } from "../../app/slices/sliderSlice";
import UserSlider from "../Home/features/UserSlider/UserSlider";
import { FaHeart } from "react-icons/fa";

import SearchNav from "../../components/Search/SearchNav/SearchNav";

import podcasts from "../../utils/json/podcasts.json";
import SuggestionCard from "../../components/Search/Suggestions/SuggestionCard";
import LibraryDetails from "../../components/Library/LibraryDetails/LibraryDetails";

const Library = () => {
  const dispatch = useDispatch();

  const searchedText = useSelector((state) => state.search.searchedText);

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
      if (isUserViewOpen && isMobile) {
        dispatch(toggleSlider(false));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isUserViewOpen, dispatch]);

  return (
    <div>
      <SearchNav isNoNavigation={true} />
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
          } col-span-12 text-white bg-black relative  px-4 md:px-10 py-10 h-auto`}>
          {!searchedText && (
            <div className="w-[40%] py-3 flex items-center gap-5  bg-gradient-to-l from-black to-red-600 rounded-lg">
              <div className="p-4 bg-black inline-block mx-4 rounded-md border border-white">
                <FaHeart className="text-red-600 text-xl" />
              </div>
              <p className="text-xl">Liked Podcasts</p>
            </div>
          )}

          <div
            className={`md:grid ${
              searchedText ? "md:grid-cols-1" : "md:grid-cols-2"
            } mt-5`}>
            <div className="md:col-span-1">
              <LibraryDetails />
            </div>
            {!searchedText && (
              <div className="md:col-span-1 md:mt-0  mt-4 w-full">
                {podcasts.slice(0, 4).map((pod) => (
                  <div key={pod._id}>
                    <SuggestionCard podcast={pod} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
