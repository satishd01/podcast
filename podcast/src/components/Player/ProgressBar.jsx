import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const ProgressBar = ({ duration, currentTime, onSeek }) => {
  const handleChange = (value) => {
    onSeek(value);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  return (
    <div className="w-full">
      <Slider
        min={0}
        max={duration}
        value={currentTime}
        onChange={handleChange}
        trackStyle={{ backgroundColor: "red", height: "4px" }}
        railStyle={{ backgroundColor: "gray", height: "4px" }}
        handleStyle={{
          display: "none",
        }}
      />
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
