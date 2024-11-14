import React from "react";
import { TbCircleXFilled } from "react-icons/tb";
import { HiMenuAlt4 } from "react-icons/hi";

const PlayNext = () => {
  const data = [
    {
      id: "1",
      name: "jcksbjckbjs;dbs",
      episode: "1",
      imageUrl: "https://placehold.co/50",
    },
    {
      id: "2",
      name: "jcksbjckbjs;dbs",
      episode: "1",
      imageUrl: "https://placehold.co/50",
    },
    {
      id: "2",
      name: "jcksbjckbjs;dbs",
      episode: "1",
      imageUrl: "https://placehold.co/50",
    },
    {
      id: "2",
      name: "jcksbjckbjs;dbs",
      episode: "1",
      imageUrl: "https://placehold.co/50",
    },
    {
      id: "2",
      name: "jcksbjckbjs;dbs",
      episode: "1",
      imageUrl: "https://placehold.co/50",
    },
    // Additional dummy data...
  ];

  return (
    <div className="absolute w-full md:top-[-20rem] top-[-13rem] py-4">
      <div className="grid grid-cols-12 items-center pr-8 md:pr-12">
        <div className="md:col-span-2"></div>
        <div className="md:col-span-10 col-span-12 bg-[#222222] rounded-lg px-5 py-4 min-h-[310px] max-h-[310px] overflow-y-auto">
          <p className="text-xl mb-5">Playing Next</p>

          {data.map((play) => (
            <div
              key={play.id}
              className="flex items-center justify-between text-white mb-2">
              <div className="flex items-center gap-3 w-full">
                <TbCircleXFilled className="text-xl" />
                <img
                  alt={play.name}
                  src={play.imageUrl}
                  className="rounded-md w-12 h-12 md:w-16 md:h-16"
                />
                <p className="truncate w-32 md:w-48">{`${play.name} episode ${play.episode}`}</p>
              </div>
              <HiMenuAlt4 className="text-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayNext;
