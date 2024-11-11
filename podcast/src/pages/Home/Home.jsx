import React, { useState } from "react";
import Navbar from "../../components/Navbar";

const Home = () => {
  const [isUserViewOpen, setIsUserViewOpen] = useState(false);

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-12 h-[100vh]">
        <div
          className={`col-span-2 text-gray-50 bg-[#222222] ${
            isUserViewOpen ? "fixed inset-0 z-40 w-6/12" : "hidden col-span-0"
          } md:block md:relative md:z-0`}>
          <div className="p-4">
            <p>Sidebar Content</p>
          </div>
        </div>

        <div className={`md:col-span-10 col-span-12 bg-black relative`}>
          {!isUserViewOpen && (
            <button
              onClick={() => setIsUserViewOpen(true)}
              className="md:hidden p-2 bg-gray-700 rounded m-4">
              Open Sidebar
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
