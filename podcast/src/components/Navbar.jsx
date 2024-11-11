import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { HiMenu } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="grid grid-cols-12  text-white">
      <div className="md:col-span-2 col-span-3 bg-[#222222] flex px-8 py-3 text-lg items-center">
        LOGO
      </div>

      <div className="md:col-span-10 col-span-9 md:hidden bg-[#151515] flex justify-end items-center px-4 py-3">
        {isMenuOpen ? (
          <RxCross2 className="text-3xl" onClick={() => setIsMenuOpen(false)} />
        ) : (
          <HiMenu className="text-3xl" onClick={() => setIsMenuOpen(true)} />
        )}
      </div>

      <div
        className={`md:col-span-10 col-span-12 bg-[#151515] ${
          isMenuOpen ? "block" : "hidden"
        } md:grid md:grid-cols-12 flex-col justify-between items-center gap-16 px-14  py-2`}>
        <div className="flex md:col-span-8 md:flex-row flex-col w-full gap-4 justify-between items-center">
          {["All", "Podcasts", "Stories", "Audio Book"].map((item) => (
            <p
              key={item}
              className="text-center border border-white py-1 w-full rounded-md text-sm bg-black">
              {item}
            </p>
          ))}
        </div>

        <div className="md:col-span-4 flex items-center gap-10 justify-between w-full">
          <div className="bg-black py-2  w-full md:mt-0 mt-3 px-4 rounded-3xl flex justify-between items-center">
            <p>Search</p>
            <CiSearch className="text-xl" />
          </div>

          <div className="text-2xl  md:mt-0 mt-3 flex justify-end">
            <IoIosNotifications />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
