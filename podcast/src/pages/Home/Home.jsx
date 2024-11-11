import React, { useState } from "react";
import Navbar from "../../components/Navbar";

const Home = () => {
  const [isUserViewOpen, setIsUserViewOpen] = useState(true);

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-12 h-[100vh]">
        <div className="col-span-2 text-gray-50 bg-[#222222]">
          <div className={`w-full ${isUserViewOpen ? "block" : "hidden"}`}>
            <p>non</p>
          </div>
        </div>
        <div className="col-span-10 bg-black"></div>
      </div>
    </>
  );
};

export default Home;
