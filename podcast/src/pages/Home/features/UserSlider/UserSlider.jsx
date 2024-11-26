import React from "react";
import SmallUserCard from "../../../../components/UserSlider/SmallUserCard";
import { AiFillPlusSquare } from "react-icons/ai";
import UserFeaturesNav from "../../../../components/UserSlider/UserFeaturesNav";
import { IoLogOut } from "react-icons/io5";

const UserSlider = () => {
  return (
    <div className="bg-[#131313] pb-5 z-50">
      <SmallUserCard />
      <div className="mx-5 px-3 bg-[#1F1F1F] shadow-lg rounded-md py-1 flex justify-between items-center hover:bg-gray-200 hover:rounded-lg hover:text-black cursor-pointer">
        <AiFillPlusSquare className="text-xl" />
        <p className="md:text-sm text-xs whitespace-nowrap">Add Your Content</p>
      </div>
      <UserFeaturesNav />
      <div className=" md:mt-20 mt-10  text-center flex justify-center items-center">
        <div className="flex items-center gap-2 border border-white px-4 py-1 rounded-md cursor-pointer hover:bg-gray-200 hover:text-black">
          <IoLogOut className="text-xl" />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default UserSlider;
