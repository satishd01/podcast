import React from "react";
import image from "../images/footerImage.png";

const Footer = () => {
  return (
    <>
      <div>
        <img alt="footer" src={image} className="w-full" />
      </div>
      <div className="mx-4 md:mx-16 pt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-y-4 text-center md:text-left">
        {/* Logo Section */}
        <div className="md:col-span-3">
          <p className="text-3xl">LOGO</p>
        </div>

        {/* Social Links Section */}
        <div className="md:col-span-2 flex flex-col space-y-2">
          <p className="text-lg font-semibold">Our Social</p>
          <p>Instagram</p>
          <p>Spotify</p>
          <p>Facebook</p>
        </div>

        {/* Useful Links Section */}
        <div className="md:col-span-2 flex flex-col space-y-2">
          <p className="text-lg font-semibold">Useful Links</p>
          <p>Privacy Policy</p>
          <p>Terms & Conditions</p>
          <p>Support</p>
        </div>

        {/* Subscription Section */}
        <div className="md:col-span-2 flex flex-col space-y-2">
          <p className="text-lg font-semibold">Subscription</p>
          <p>Basic</p>
          <p>Premium</p>
          <p>Platinum</p>
        </div>

        {/* Partnership Section */}
        <div className="md:col-span-3 flex flex-col items-center md:items-start">
          <p className="text-lg">Want to partner with us?</p>
          <button className="px-4 py-2 bg-gray-50 text-black rounded-md mt-4">
            List your content
          </button>
        </div>
      </div>
    </>
  );
};

export default Footer;
