import React from "react";
import UserSlider from "../../pages/Home/features/UserSlider/UserSlider";

const SliderDiv = ({ isUserViewOpen }) => {
  return (
    <div
      className={`${
        isUserViewOpen ? "md:col-span-2" : "md:hidden"
      } absolute text-gray-50 bg-black ${
        isUserViewOpen
          ? "z-40 left-0 md:w-full w-8/12 md:mt-0 col-span-12 h-auto transform"
          : "md:relative col-span-0"
      } md:block md:relative md:z-0`}>
      <UserSlider />
    </div>
  );
};

export default SliderDiv;
