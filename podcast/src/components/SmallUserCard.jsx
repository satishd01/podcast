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
      className="w-full py-6 px-3 flex items-center justify-between  rounded-md ">
      <img
        alt={`${name}'s profile`}
        src={imageUrl}
        className="h-14 w-14 rounded-md object-cover"
      />
      <div className="flex flex-col text-left">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-gray-500">{email}</p>
      </div>
      <MdOutlineKeyboardArrowRight className="text-xl text-gray-500" />
    </div>
  );
};
export default SmallUserCard;
