"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-2" : "bg-green-50 py-4"}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="p-2 flex justify-between gap-8 items-center">
          <div className="w-14">
            <img src="./assets/logo-bappenas.svg" alt="Logo" />
          </div>
          <div className="w-14">
            <img src="./assets/logo-esdm.svg" alt="Logo" />
          </div>
          <div className="w-7">
            <img src="./assets/logo-undp.svg" alt="Logo" />
          </div>
        </div>

        <div className="hidden md:flex space-x-10">
          <Link
            href="./"
            className="text-gray-700 hover:text-green-700 transition-colors"
          >
            Home
          </Link>
          <Link
            href="./about"
            className="text-gray-700 hover:text-green-700 transition-colors"
          >
            About
          </Link>
          <Link
            href="./dss-interface"
            className="text-gray-700 hover:text-green-700 transition-colors"
          >
            DSS Interface
          </Link>
          <Link
            href="./contact"
            className="text-gray-700 hover:text-green-700 transition-colors"
          >
            Contact
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-gray-700 hover:text-green-700 transition-colors">
            Login
          </button>
          <button className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
