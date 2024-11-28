import React from "react";
import history from "../../utils/json/listeningHistory.json";

import { FaUser } from "react-icons/fa";
import { IoPlay } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

const History = () => {
  return (
    <div>
      {Object.entries(history).map(([day, podcasts]) => (
        <div key={day}>
          <h2 className="text-xl my-4">{day}</h2>
          {podcasts.map((podcast, index) => (
            <div key={index} className="flex justify-between items-center mb-3">
              <div className="flex gap-4 md:gap-10 items-center mb-3">
                <img
                  src={"https://placehold.co/50"}
                  alt={podcast.title}
                  className="rounded-md w-12 h-12 md:w-16 md:h-16"
                />
                <div>
                  <h3>{podcast.title}</h3>
                  <p className="text-sm font-light mt-2 flex items-center gap-3">
                    <FaUser /> {podcast.host}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="md:p-3 p-2 rounded-full flex items-center justify-center bg-white">
                  <IoPlay className="text-[#FF0000]" />
                </div>
                <BsThreeDotsVertical className="text-white text-xl cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default History;
