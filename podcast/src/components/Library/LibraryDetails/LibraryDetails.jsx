import React from "react";
import { GoClockFill } from "react-icons/go";
import { IoMdShare } from "react-icons/io";
import { RiEdit2Fill } from "react-icons/ri";

import { libraryItems } from "../../../utils/constants";

import { MdKeyboardArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LibraryDetails = () => {
  const navigate = useNavigate();
  const searchedText = useSelector((state) => state.search.searchedText);

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
                <div
                  key={item.id}
                  onClick={() =>
                    navigate(`${item.title.toLowerCase().replace(" ", "-")}`)
                  }
                  className="grid grid-cols-12 gap-4  items-center mt-4 w-full cursor-pointer">
                  <div className="flex items-center gap-3 col-span-6">
                    <div className="border border-white p-4 rounded-md">
                      <item.icon className="text-red-600 text-xl" />
                    </div>
                    <div>
                      <p>{item.title}</p>
                      <div className="flex items-center gap-2 ">
                        <GoClockFill className="text-red-600" />
                        <p className="text-xs">{item.duration} mins</p>
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
                }
                className="grid grid-cols-12 gap-4  items-center mt-4 w-full cursor-pointer">
                <div className="flex items-center gap-3 col-span-6">
                  <div className="border border-white p-4 rounded-md">
                    <item.icon className="text-red-600 text-xl" />
                  </div>
                  <div>
                    <p>{item.title}</p>
                    <div className="flex items-center gap-2 ">
                      <GoClockFill className="text-red-600" />
                      <p className="text-xs">{item.duration} mins</p>
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
            ))}
        </>
      )}
    </>
  );
};

export default LibraryDetails;
