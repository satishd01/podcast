import React, { useEffect, useState } from "react";
import { BsSortDown, BsSortUpAlt } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import Playlists from "./../Playlists/Playlists";
import PlaylistPodcasts from "../PlaylistPodcasts/PlaylistPodcasts";
import { playlistData } from "../../../utils/constants";

const PlaylistBody = () => {
  const [toggleSort, setToggleSort] = useState(true);
  const [isCreatePlaylistOpen, setIsCreatePlaylistOpen] = useState(false);
  const [name, setName] = useState("");

  const openCreatePlaylist = () => {
    setIsCreatePlaylistOpen(true);
  };

  return (
    <>
      <div className="flex items-center justify-between gap-7 mb-6">
        <p className="text-xl">Your Playlist</p>
        <div
          className="flex items-center md:text-base gap-3 text-sm"
          onClick={() => setToggleSort((prev) => !prev)}>
          {toggleSort ? (
            <BsSortUpAlt className="text-lg" />
          ) : (
            <BsSortDown className="text-lg" />
          )}
          <p className="md:text-base text-[10px] whitespace-nowrap">Sort by</p>
        </div>
      </div>
      <div className="flex items-center justify-between mb-5">
        <ul className="flex items-center md:gap-4 gap-2 md:text-sm text-[10px]">
          <li className="rounded-lg border border-white px-2 py-1">Podcasts</li>
          <li className="rounded-lg border border-white px-2 py-1 whitespace-nowrap">
            Audio Books
          </li>
          <li className="rounded-lg border border-white px-2 py-1">Stories</li>
        </ul>
        <div
          className="flex cursor-pointer gap-3 text-[10px] md:text-sm items-center bg-white text-black  px-3 py-1 rounded-md"
          onClick={openCreatePlaylist}>
          <FaPlus className="text-sm" />
          <p>Create playlist</p>
        </div>
      </div>

      <div className="grid grid-cols-12 md:gap-16">
        <div className="col-span-12 md:col-span-5">
          <Playlists />
        </div>
        <div className="col-span-12 md:col-span-7">
          <p>Motivation</p>
          <PlaylistPodcasts />
        </div>
      </div>

      {isCreatePlaylistOpen && (
        <div className=" py-5 px-4 w-[30%] absolute left-[30%] top-[20%] bg-[#222222] rounded-lg">
          <p className="text-center">Enter Playlist Name</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter here.."
            className="bg-[#151515] outline-none mt-3 px-3 py-2 rounded-md w-full "
          />
          <div className="flex justify-end gap-3 items-center mt-3">
            <p
              onClick={() => setIsCreatePlaylistOpen(false)}
              className="cursor-pointer">
              Close
            </p>
            <p className="cursor-pointer">Done</p>
          </div>
        </div>
      )}
    </>
  );
};

export default PlaylistBody;
