import { useState } from "react";
const ProgressBar = ({ duration, currentTime, onSeek }) => {
  const progress = (currentTime / duration) * 100;

  // Handle click on the progress bar
  const handleProgressClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newTime = (offsetX / rect.width) * duration;
    onSeek(newTime); // Seek to the clicked position
  };

  // Handle dragging the progress bar
  const [isDragging, setIsDragging] = useState(false);
  const handleDragStart = (e) => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrag = (e) => {
    if (isDragging) {
      const rect = e.target.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const newTime = (offsetX / rect.width) * duration;
      onSeek(newTime); // Seek to the dragged position
    }
  };

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
      onClick={handleProgressClick}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseMove={handleDrag}>
      <div
        style={{
          width: `${progress}%`,
          backgroundColor: "red",
          height: "100%",
          transition: "width 0.2s linear",
        }}
      />
    </div>
  );
};

export default ProgressBar;
