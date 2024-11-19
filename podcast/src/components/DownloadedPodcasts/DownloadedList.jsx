import React, { useEffect, useState } from "react";

import { BsSortDown, BsSortUpAlt } from "react-icons/bs";

import podcasts from "../../utils/json/podcasts.json";
import DownloadedCard from "./DownloadedCard/DownloadedCard";

const DownloadedList = () => {
  const [toggleSort, setToggleSort] = useState(true);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (toggleSort) {
      const sorted = [...podcasts].sort(
        (a, b) => Number(a.time) - Number(b.time)
      );
      setData(sorted);
      console.log(sorted);
    } else {
      const sorted = [...podcasts].sort(
        (a, b) => Number(b.time) - Number(a.time)
      );
      setData(sorted);
    }
  }, [toggleSort]);

  return (
    <div className="bg-[#101010] py-4 md:mx-2 mt-5 md:px-8 px-4">
      <div className="flex items-center justify-between mb-5">
        <ul className="flex items-center md:gap-4 gap-2 md:text-sm text-[10px]">
          <li className="rounded-lg border border-white px-2 py-1">Podcasts</li>
          <li className="rounded-lg border border-white px-2 py-1 whitespace-nowrap">
            Audio Books
          </li>
          <li className="rounded-lg border border-white px-2 py-1">Stories</li>
        </ul>
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

      {data &&
        data.map((pod) => (
          <div key={pod._id} className="border-b py-3">
            <DownloadedCard podcast={pod} />
          </div>
        ))}
    </div>
  );
};

export default DownloadedList;
