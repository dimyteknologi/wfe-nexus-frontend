"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

interface NavItem {
  href: string;
  label: string;
  subItems?: NavItem[];
}

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navItems: NavItem[] = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    {
      href: "#",
      label: "DSS Interface",
      subItems: [
        { href: "/dss-interface", label: "Site Specific" },
        { href: "#", label: "Context Specific" },
      ],
    },
    { href: "#", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-2"
          : "bg-gradient-to-r from-green-50 to-blue-50 py-4"
      }`}
    >
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              {item.subItems ? (
                <>
                  <button
                    type="button"
                    className="text-gray-700 hover:text-green-700 transition-colors flex items-center"
                    onClick={() => handleDropdownToggle(item.label)}
                    aria-expanded={activeDropdown === item.label}
                  >
                    {item.label}
                    <svg
                      className="ml-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-700 hover:text-green-700 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
        {/* Auth Buttons */}
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <button className="text-gray-700 hover:text-green-700 transition-colors">
            Login
          </button>
          <button className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Sign Up
          </button>
        </div>

        {/* Logo Section */}
        <div className="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 relative">
              <Image
                src="/assets/logo-bappenas.svg"
                alt="Logo Bappenas"
                fill
                className="object-contain"
              />
            </div>
            <div className="w-32 h-14 relative">
              <Image
                src="/assets/logo-ukaid.webp"
                alt="Logo UKAid"
                fill
                className="object-contain"
              />
            </div>
            <div className="w-7 h-14 relative">
              <Image
                src="/assets/logo-undp.svg"
                alt="Logo UNDP"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
