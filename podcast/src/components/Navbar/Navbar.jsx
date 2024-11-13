import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { HiMenu } from "react-icons/hi";
import { IoIosNotifications } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleActiveTab } from "../../app/slices/activeTabSlice";
import { toggleSlider } from "../../app/slices/sliderSlice";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activeTab = useSelector((state) => state.activeTab.activeTab);
  const slider = useSelector((state) => state.slider.isSliderOpen);

  const handleIsUserViewOpen = () => {
    dispatch(toggleSlider(slider ? false : true));
  };

  const handleToggleActiveTab = (tab) => {
    dispatch(toggleActiveTab(tab));
  };

  return (
    <nav className="grid grid-cols-12 text-white select-none">
      <div className="md:col-span-2 col-span-3 md:bg-[#131313] bg-[#100E0E] flex px-8 py-3 text-2xl items-center cursor-pointer">
        <p onClick={handleIsUserViewOpen} className="font-semibold ">
          Logo
        </p>
      </div>

      <div className="md:col-span-10 col-span-9 md:hidden bg-[#100E0E] flex justify-end items-center px-4 py-3">
        {isMenuOpen ? (
          <RxCross2
            className="text-3xl cursor-pointer transform transition-all duration-300 ease-in-out"
            onClick={() => setIsMenuOpen(false)}
          />
        ) : (
          <HiMenu
            className="text-3xl cursor-pointer transform transition-all duration-300 ease-in-out"
            onClick={() => setIsMenuOpen(true)}
          />
        )}
      </div>

      <div
        className={`md:col-span-10 col-span-12 bg-[#100E0E] ${
          isMenuOpen ? "block" : "hidden"
        } md:grid md:grid-cols-12 flex-col justify-between items-center gap-16 px-10 py-2`}>
        <div className="flex md:col-span-8 md:flex-row flex-col w-full gap-4 justify-between items-center">
          {["All", "Podcasts", "Stories", "Audio Book"].map((item) => (
            <p
              key={item}
              onClick={() => handleToggleActiveTab(item)}
              className={`text-center border border-white py-1 w-full rounded-md text-sm cursor-pointer ${
                item === activeTab
                  ? "bg-gray-200 text-black"
                  : " bg-black hover:bg-gray-200 hover:text-black"
              }`}>
              {item}
            </p>
          ))}
        </div>

        <div className="md:col-span-4 flex items-center gap-10 justify-between w-full">
          <div
            className="bg-black py-2 w-full md:mt-0 mt-3 px-4 rounded-3xl flex justify-between items-center cursor-pointer"
            onClick={() => navigate("/search")}>
            <p>Search</p>
            <CiSearch className="text-xl " />
          </div>

          <div className="text-2xl md:mt-0 mt-3 flex justify-end cursor-pointer">
            <IoIosNotifications />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
