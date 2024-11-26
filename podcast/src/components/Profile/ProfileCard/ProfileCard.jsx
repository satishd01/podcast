import React, { useState } from "react";
import { user } from "../../../utils/constants";
import { GiBookCover } from "react-icons/gi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import EditProfile from "../EditProfile/EditProfile";

const ProfileCard = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { imageUrl, email, name, following } = user;

  return (
    <div className="p-4 rounded-lg relative">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
        <div className="relative" onClick={() => setIsEditOpen(true)}>
          <img src={imageUrl} alt={name} className="h-28 w-28 rounded-lg" />
          <FaEdit className="text-red-600 absolute right-[-8px] bottom-[-5px] text-lg cursor-pointer" />
        </div>

        <div className="text-center md:text-left">
          <p className="text-xl font-semibold">Profile</p>
          <p className="mt-2">{name}</p>
          <p className="text-sm text-gray-400 mt-1">{email}</p>
          <p className="text-sm text-gray-400 mt-1">{`${following} Following`}</p>
        </div>
      </div>
      <div className="flex items-center justify-between bg-[#2F2F2F] rounded-md mt-4 p-3">
        <div className="flex items-center gap-3">
          <div className="bg-black p-3 rounded-md border border-white">
            <GiBookCover className="text-2xl text-red-600" />
          </div>
          <div>
            <p className="text-sm">Current Plan</p>
            <p className="text-xs text-gray-400">Basic Plan</p>
          </div>
        </div>
        <MdOutlineKeyboardArrowRight className="text-xl text-gray-400" />
      </div>

      {isEditOpen && (
        <div
          className="absolute md:top-[30%] md:left-[50%] left-0 top-[10%] w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsEditOpen(false)}>
          <div
            className="bg-[#222222]  rounded-lg w-full"
            onClick={(e) => e.stopPropagation()}>
            <EditProfile setIsEditOpen={setIsEditOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
