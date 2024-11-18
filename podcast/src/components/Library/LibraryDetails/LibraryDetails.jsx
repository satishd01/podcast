import React from "react";
import { FaHeart } from "react-icons/fa";
import { GoClockFill } from "react-icons/go";
import { IoMdShare } from "react-icons/io";
import { RiEdit2Fill } from "react-icons/ri";
import { IoDownloadSharp } from "react-icons/io5";

import { MdKeyboardArrowRight } from "react-icons/md";
import { GiBookCover } from "react-icons/gi";

const LibraryDetails = () => {
  return (
    <>
      <p className="text-xl">Your Library</p>
      <ul className="flex items-center gap-4 mt-4 text-sm">
        <li className="rounded-lg border border-white px-2 py-1">Podcasts</li>
        <li className="rounded-lg border border-white px-2 py-1">
          Audio Books
        </li>
        <li className="rounded-lg border border-white px-2 py-1">Stories</li>
      </ul>
      <div className="grid grid-cols-12 gap-4  items-center mt-4 w-full">
        <div className="flex items-center gap-3 col-span-6">
          <div className="border border-white p-4 rounded-md">
            <FaHeart className="text-red-600 text-xl" />
          </div>
          <div>
            <p>Liked Podcasts</p>
            <div className="flex items-center gap-2 ">
              <GoClockFill className="text-red-600" />
              <p className="text-xs">60 mins</p>
            </div>
          </div>
        </div>
        <div className="col-span-3 text-lg flex gap-3 items-center justify-end">
          <IoMdShare />
          <RiEdit2Fill />
        </div>
        <div className="col-span-3 text-2xl flex justify-end md:pr-5">
          <MdKeyboardArrowRight />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4  items-center mt-4 w-full">
        <div className="flex items-center gap-3 col-span-6">
          <div className="border border-white p-4 rounded-md">
            <IoDownloadSharp className="text-red-600 text-xl" />
          </div>
          <div>
            <p>Downloaded Podcasts</p>
            <div className="flex items-center gap-2 ">
              <GoClockFill className="text-red-600" />
              <p className="text-xs">60 mins</p>
            </div>
          </div>
        </div>
        <div className="col-span-3 text-lg flex gap-3 items-center justify-end">
          <IoMdShare />
          <RiEdit2Fill />
        </div>
        <div className="col-span-3 text-2xl flex justify-end md:pr-5">
          <MdKeyboardArrowRight />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4  items-center mt-4 w-full">
        <div className="flex items-center gap-3 col-span-6">
          <div className="border border-white p-4 rounded-md">
            <GiBookCover className="text-red-600 text-xl" />
          </div>
          <div>
            <p>My Playlists</p>
            <div className="flex items-center gap-2 ">
              <GoClockFill className="text-red-600" />
              <p className="text-xs">60 mins</p>
            </div>
          </div>
        </div>
        <div className="col-span-3 text-lg flex gap-3 items-center justify-end">
          <IoMdShare />
          <RiEdit2Fill />
        </div>
        <div className="col-span-3 text-2xl flex justify-end md:pr-5">
          <MdKeyboardArrowRight />
        </div>
      </div>
    </>
  );
};

export default LibraryDetails;
