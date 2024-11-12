import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const SmallUserCard = ({
  name = "Rohan Patil",
  email = "rohan@gmail.com",
  imageUrl = "https://placehold.co/50",
}) => {
  return (
    <div
      aria-label="User profile slider"
      className="w-full py-4 px-3 flex items-center justify-between rounded-md  shadow-md">
      <img
        alt={`${name}'s profile`}
        src={imageUrl}
        className="h-12 w-12 md:h-14 md:w-14 rounded-md object-cover"
      />
      <div className="flex flex-col ml-3 text-left">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-gray-500">{email}</p>
      </div>
      <MdOutlineKeyboardArrowRight className="text-xl text-gray-500 hidden md:block" />
    </div>
  );
};

export default SmallUserCard;
