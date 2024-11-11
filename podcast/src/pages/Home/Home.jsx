import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import UserSlider from "./features/userSlider/userSlider";
import Footer from "../../components/Footer";

const Home = () => {
  const isUserViewOpen = useSelector((state) => state.slider.isSliderOpen);

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-12">
        <div
          className={`${
            isUserViewOpen ? "md:col-span-2" : "md:hidden"
          } absolute text-gray-50 bg-[#222222] ${
            isUserViewOpen
              ? "z-40  left-0 md:w-full w-6/12 md:mt-0 col-span-12 h-auto transform  "
              : "  md:relative col-span-0 "
          } md:block md:relative md:z-0`}>
          <UserSlider />
        </div>

        <div
          className={`${
            isUserViewOpen ? "md:col-span-10" : "md:col-span-12"
          } col-span-12 text-white bg-black relative  h-auto px-10 py-10`}>
          <p>data</p>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
