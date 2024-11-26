import React from "react";

const CreatorImage = ({ creator }) => {
  console.log("creator", creator);
  return (
    <div className="col-span-5">
      <img
        alt={creator?.name}
        src={creator?.imageUrl}
        className="md:w-[400px] w-[200px] rounded-xl"
      />
    </div>
  );
};

export default CreatorImage;
