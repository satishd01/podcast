import React from "react";
import { GoClockFill } from "react-icons/go";
import { IoMdShare } from "react-icons/io";
import { RiEdit2Fill } from "react-icons/ri";

import { libraryItems } from "../../../utils/constants";

import { MdKeyboardArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LibraryCard from "../LibraryCard/LibraryCard";

const LibraryDetails = () => {
  const navigate = useNavigate();
  const searchedText = useSelector((state) => state.search.searchedText);

  const handleNavigation = (item) => {
    navigate(`/${item.title.toLowerCase().replace(" ", "-")}`);
  };
  return (
    <>
      {searchedText ? (
        <div className="w-full md:h-[70vh] h-[50vh]">
          {libraryItems &&
            libraryItems
              .filter((item) =>
                item.title.toLowerCase().includes(searchedText.toLowerCase())
              )
              .map((item) => (
                <div key={item.id} onClick={() => handleNavigation(item.title)}>
                  <LibraryCard item={item} />
                </div>
              ))}
        </div>
      ) : (
        <>
          <p className="text-xl">Your Library</p>
          <ul className="flex items-center gap-4 mt-4 text-sm">
            <li className="rounded-lg border border-white px-2 py-1">
              Podcasts
            </li>
            <li className="rounded-lg border border-white px-2 py-1">
              Audio Books
            </li>
            <li className="rounded-lg border border-white px-2 py-1">
              Stories
            </li>
          </ul>

          {libraryItems &&
            libraryItems.map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  navigate(`/${item.title.toLowerCase().replace(" ", "-")}`)
                }>
                <LibraryCard item={item} />
              </div>
            ))}
        </>
      )}
    </>
  );
};

export default LibraryDetails;
