import React from "react";
import SmallUserCard from "../../../../components/smallUserCard";
import { AiFillPlusSquare } from "react-icons/ai";

const UserSlider = () => {
  return (
    <>
      <SmallUserCard />
      <div className="mx-5 px-3 bg-[#1F1F1F] shadow-lg rounded-md py-1 flex justify-between items-center">
        <AiFillPlusSquare className="text-xl" />
        <p className="text-sm">Add Your Content</p>
      </div>
    </>
  );
};

export default UserSlider;
