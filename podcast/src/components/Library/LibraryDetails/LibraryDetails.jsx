import React from "react";

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
      
    </>
  );
};

export default LibraryDetails;
