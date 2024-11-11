import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";

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
              ? "z-40  left-0 md:w-full w-6/12 md:mt-0 col-span-12 h-[100vh] transform transition-all duration-500 ease-in-out opacity-100"
              : "  left-[-100%] opacity-0 md:relative col-span-0 transition-all duration-500 ease-in-out"
          } md:block md:relative md:z-0`}>
          <div className="p-4">
            <p>Sidebar Content</p>
          </div>
        </div>

        <div
          className={`${
            isUserViewOpen ? "md:col-span-10" : "md:col-span-12"
          } col-span-12 text-white bg-black relative  h-[100vh]`}>
          <p>data</p>
        </div>
      </div>
    </>
  );
};

export default Home;
