import React, { useState } from "react";
import { BsSortDown, BsSortUpAlt } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import Playlists from "../Playlists/Playlists";
import PlaylistPodcasts from "../PlaylistPodcasts/PlaylistPodcasts";

const PlaylistBody = () => {
  const [toggleSort, setToggleSort] = useState(true);
  const [isCreatePlaylistOpen, setIsCreatePlaylistOpen] = useState(false);
  const [name, setName] = useState("");

  const openCreatePlaylist = () => {
    setIsCreatePlaylistOpen(true);
  };

  return (
    <>
      {/* Header Section */}
      <div className="flex items-center justify-between gap-5 mb-4">
        <p className="text-lg sm:text-xl font-semibold">Your Playlist</p>
        <div
          className="flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
          onClick={() => setToggleSort((prev) => !prev)}>
          {toggleSort ? (
            <BsSortUpAlt className="text-base sm:text-lg" />
          ) : (
            <BsSortDown className="text-base sm:text-lg" />
          )}
          <p className="whitespace-nowrap">Sort by</p>
        </div>
      </div>

      {/* Filter & Create Playlist Section */}
      <div className="flex items-center justify-between mb-4">
        <ul className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
          <li className="rounded-lg border px-2 py-1">Podcasts</li>
          <li className="rounded-lg border px-2 py-1 whitespace-nowrap">
            Audio Books
          </li>
          <li className="rounded-lg border px-2 py-1">Stories</li>
        </ul>
        <div
          className="flex items-center gap-2 sm:gap-3 bg-white text-black text-xs sm:text-sm px-3 py-1 rounded-md cursor-pointer mx-2 text-xs"
          onClick={openCreatePlaylist}>
          <FaPlus className="text-sm" />
          <p>Create playlist</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-6 sm:gap-16">
        {/* Left Section */}
        <div className="col-span-12 sm:col-span-5">
          <Playlists />
        </div>
        {/* Right Section */}
        <div className="col-span-12 sm:col-span-7">
          <p className="font-semibold mb-3">Motivation</p>
          <PlaylistPodcasts />
        </div>
      </div>

      {/* Modal */}
      {isCreatePlaylistOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#222222] w-[90%] sm:w-[50%] max-w-md py-5 px-4 rounded-lg">
            <p className="text-center font-semibold">Enter Playlist Name</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter here.."
              className="bg-[#151515] outline-none mt-3 px-3 py-2 rounded-md w-full"
            />
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setIsCreatePlaylistOpen(false)}
                className="px-4 py-2 rounded-md bg-gray-600 text-white">
                Close
              </button>
              <button className="px-4 py-2 rounded-md bg-red-500 text-white">
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlaylistBody;
