import React from "react";

const AddPlaylist = ({ name, setName, setIsCreatePlaylistOpen }) => {
  return (
    <div className="absolute top-20 flex items-center justify-center z-50 w-[100%] md:w-[100%]">
      <div className="bg-[#222222]  max-w-md py-5 px-4 rounded-lg w-[100%] md:w-[100%]">
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
            className="px-3 py-1 rounded-md bg-gray-600 text-white">
            Close
          </button>
          <button className="px-3 py-1 rounded-md bg-gray-200 text-black">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPlaylist;
