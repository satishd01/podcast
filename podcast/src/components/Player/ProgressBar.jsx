import React, { useState, useEffect } from "react";

const ProgressBar = ({ duration, currentTime, onSeek, playbackSpeed }) => {
  // Adjust the progress calculation based on the playback speed
  const adjustedCurrentTime = currentTime * playbackSpeed; // Modify the time based on speed
  const progress = (adjustedCurrentTime / duration) * 100;

  // Handle click on the progress bar (desktop or mobile)
  const handleProgressClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const offsetX = e.clientX
      ? e.clientX - rect.left
      : e.touches[0].clientX - rect.left;
    const newTime = (offsetX / rect.width) * duration;
    onSeek(newTime); // Seek to the clicked position
  };

  // Handle dragging the progress bar
  const [isDragging, setIsDragging] = useState(false);
  const handleDragStart = (e) => {
    e.preventDefault(); // Prevent default behavior (like text selection)
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrag = (e) => {
    if (isDragging) {
      const rect = e.target.getBoundingClientRect();
      const offsetX = e.clientX
        ? e.clientX - rect.left
        : e.touches[0].clientX - rect.left;
      const newTime = (offsetX / rect.width) * duration;
      onSeek(newTime); // Seek to the dragged position
    }
  };

  useEffect(() => {
    // Ensure progress doesn't go over 100%
    if (progress > 100) {
      onSeek(duration); // Prevent seeking past the end of the track
    }
  }, [adjustedCurrentTime, progress, duration, onSeek]);

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "white",
        height: "4px",
        borderRadius: "2px",
        overflow: "hidden",
        cursor: "pointer",
      }}
      onClick={handleProgressClick} // Click to seek
      onMouseDown={handleDragStart} // Mouse down to start dragging
      onMouseUp={handleDragEnd} // Mouse up to stop dragging
      onMouseMove={handleDrag} // Mouse move to drag
      onTouchStart={handleDragStart} // Touch start to start dragging on mobile
      onTouchEnd={handleDragEnd} // Touch end to stop dragging on mobile
      onTouchMove={handleDrag} // Touch move to drag on mobile
    >
      <div
        style={{
          width: `${Math.min(progress, 100)}%`, // Limit the width to 100%
          backgroundColor: "red",
          height: "100%",
          transition: "width 0.2s linear",
        }}
      />
    </div>
  );
};

export default ProgressBar;
