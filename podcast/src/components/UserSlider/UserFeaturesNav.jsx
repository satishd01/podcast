import React from "react";
import { MdHome } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { BsCollectionPlayFill } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa6";
import { FaFileAudio } from "react-icons/fa";
import { GiBookCover } from "react-icons/gi";
import { FaHistory } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const UserFeaturesNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Function to apply active classes based on the current path
  const getNavItemClass = (path) => {
    return currentPath === path
      ? "bg-gray-200 text-black rounded-md mb-1"
      : "hover:bg-gray-200 hover:text-black mb-1";
  };

  return (
    <div className="md:my-8 my-5 flex flex-col justify-between px-3">
      <div
        className={`py-3 flex items-center gap-3 px-3 hover:rounded-lg cursor-pointer ${getNavItemClass(
          "/"
        )}`}>
        <MdHome className="text-xl" />
        <p>
          <Link to="/">Home</Link>
        </p>
      </div>
      <div
        className={`py-3 flex items-center gap-3 px-3 hover:rounded-lg cursor-pointer ${getNavItemClass(
          "/download"
        )}`}>
        <IoMdDownload className="text-xl" />
        <p>
          <Link to="/download">Download</Link>
        </p>
      </div>
      <div
        className={`py-3 flex items-center gap-3 px-3 hover:rounded-lg cursor-pointer ${getNavItemClass(
          "/library"
        )}`}>
        <BsCollectionPlayFill className="text-base" />
        <p>
          <Link to="/library">Library</Link>
        </p>
      </div>
      <div
        className={`py-3 flex items-center gap-3 px-3 hover:rounded-lg cursor-pointer ${getNavItemClass(
          "/podcast"
        )}`}>
        <FaMicrophone className="text-lg" />
        <p>
          <Link to="/podcast">Podcast</Link>
        </p>
      </div>
      <div
        className={`py-3 flex items-center gap-3 px-3 hover:rounded-lg cursor-pointer ${getNavItemClass(
          "/audio-book"
        )}`}>
        <FaFileAudio className="text-lg" />
        <p>
          <Link to="/audio-book">Audio Book</Link>
        </p>
      </div>
      <div
        className={`py-3 flex items-center gap-3 px-3 hover:rounded-lg cursor-pointer ${getNavItemClass(
          "/stories"
        )}`}>
        <GiBookCover className="text-lg" />
        <p>
          <Link to="/stories">Stories</Link>
        </p>
      </div>
      <div
        className={`py-3 flex items-center gap-3 px-3 hover:rounded-lg cursor-pointer ${getNavItemClass(
          "/history"
        )}`}>
        <FaHistory className="text-lg" />
        <p>
          <Link to="/history">Listening History</Link>
        </p>
      </div>
    </div>
  );
};

export default UserFeaturesNav;
