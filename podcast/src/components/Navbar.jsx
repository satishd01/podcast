import React from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";

const Navbar = () => {
  return (
    <nav className="grid grid-cols-12 text-white">
      <div className="col-span-2 bg-[#222222] flex px-8 py-3 text-lg items-center">
        LOGO
      </div>
      <div className="col-span-10 bg-[#151515] flex justify-between items-center gap-16 px-14 py-2">
        <div className="flex w-full gap-4 justify-between items-center">
          <p className="text-center border border-white py-1  w-full rounded-md text-sm bg-black">
            All
          </p>
          <p className="text-center border border-white py-1  w-full rounded-md text-sm bg-black">
            Podcasts
          </p>
          <p className="text-center border border-white py-1  w-full rounded-md text-sm bg-black">
            Stories
          </p>
          <p className="text-center border border-white py-1  w-full rounded-md text-sm bg-black">
            Audio Book
          </p>
        </div>
        <div className="bg-black py-2 w-6/12 px-4 rounded-3xl flex justify-between items-center ">
          <p>Search</p>
          <CiSearch className="text-xl" />
        </div>
        <div className="text-2xl">
          <IoIosNotifications />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
