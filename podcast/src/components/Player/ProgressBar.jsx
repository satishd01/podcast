import { useState, useEffect } from "react";

const ProgressBar = ({ duration }) => {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentTime < duration) {
        setCurrentTime((prevTime) => prevTime + 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTime, duration]);

  const progress = (currentTime / duration) * 100;

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "white",
        height: "4px",
        borderRadius: "2px",
        overflow: "hidden",
      }}>
      <div
        style={{
          width: `${progress}%`,
          backgroundColor: "red",
          height: "100%",
          transition: "width 0.5s linear",
        }}
      />
    </div>
  );
};

export default ProgressBar;
