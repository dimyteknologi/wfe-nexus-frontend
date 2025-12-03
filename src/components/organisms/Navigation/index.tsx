"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ChevronDown, Menu, X, LogIn, LogOut, User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

interface NavItem {
  href: string;
  label: string;
  subItems?: NavItem[];
}

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();

  const navItems: NavItem[] = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    {
      href: "#",
      label: "DSS Interface",
      subItems: [
        { href: "/site-specific", label: "Site Specific" },
        { href: "/context-specific", label: "Context Specific" },
      ],
    },
    // { href: "#", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
      if (
        mobileMenuRef.current &&
        mobileMenuOpen &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const closeAllMenus = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
            : "bg-gradient-to-r from-green-50 to-blue-50 py-5"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-green-700">Nexus Logo</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6" ref={dropdownRef}>
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.subItems ? (
                  <>
                    <button
                      type="button"
                      className="text-gray-700 hover:text-green-600 transition-colors flex justify-center items-center gap-1 py-2 font-medium"
                      onClick={() => handleDropdownToggle(item.label)}
                      aria-expanded={activeDropdown === item.label}
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {activeDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100 animate-fadeIn">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className=" px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200 flex items-center"
                            onClick={closeAllMenus}
                          >
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3"></div>
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-green-600 transition-colors py-2 font-medium block"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center space-x-3">
              {status === "authenticated" ? (
                <>
                  {/* <Link
                    href="/admin"
                    className="text-gray-700 hover:text-green-700 transition-colors flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-green-50"
                  >
                    <User size={16} />
                    {session?.user?.name || "Profile"}
                  </Link> */}
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-red-700 transition-colors flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-red-50"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-green-700 transition-colors flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-green-50"
                  >
                    <LogIn size={16} />
                    Login
                  </Link>
                  {/* <button className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-5 py-2.5 rounded-lg hover:from-green-700 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg">
                    Sign Up
                  </button> */}
                </>
              )}
            </div>

            {/* Partner Logos */}
            <div className="hidden lg:flex items-center space-x-5 ml-4 pl-4 border-l border-gray-200">
              <div className="w-12 h-12 relative opacity-80 hover:opacity-100 transition-opacity">
                <Image
                  src="/assets/logo-bappenas.svg"
                  alt="Logo Bappenas"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="w-28 h-12 relative opacity-80 hover:opacity-100 transition-opacity">
                <Image
                  src="/assets/logo-ukaid.webp"
                  alt="Logo UKAid"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="w-8 h-12 relative opacity-80 hover:opacity-100 transition-opacity">
                <Image
                  src="/assets/logo-undp.svg"
                  alt="Logo UNDP"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-2xl transform transition-transform duration-500 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <Link
              href="/"
              className="flex items-center space-x-2"
              onClick={closeAllMenus}
            >
              <span className="text-xl font-bold text-green-700">Nexus</span>
            </Link>
            <button
              className="p-1 rounded-md text-gray-500 hover:text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-grow">
            <div className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <div key={item.label} className="border-b border-gray-100 pb-4">
                  {item.subItems ? (
                    <>
                      <button
                        type="button"
                        className="w-full text-left text-gray-700 py-2 flex justify-between items-center font-medium text-lg"
                        onClick={() => handleDropdownToggle(item.label)}
                        aria-expanded={activeDropdown === item.label}
                      >
                        {item.label}
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-300 ${
                            activeDropdown === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {activeDropdown === item.label && (
                        <div className="pl-5 mt-2 space-y-3">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              className="block py-2 text-gray-600 hover:text-green-700 transition-colors"
                              onClick={closeAllMenus}
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
                      className="block text-gray-700 py-2 hover:text-green-700 transition-colors font-medium text-lg"
                      onClick={closeAllMenus}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {status === "authenticated" ? (
                <>
                  {/* <Link href="/admin" onClick={closeAllMenus}>
                    <div className="w-full flex items-center justify-center gap-2 text-gray-700 py-3 border border-gray-300 rounded-lg hover:border-green-600 hover:text-green-700 transition-colors">
                      <User size={18} />
                      {session?.user?.name || "Profile"}
                    </div>
                  </Link> */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 text-gray-700 py-3 border border-gray-300 rounded-lg hover:border-red-600 hover:text-red-700 transition-colors"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={closeAllMenus}>
                    <div className="w-full flex items-center justify-center gap-2 text-gray-700 py-3 border border-gray-300 rounded-lg hover:border-green-600 hover:text-green-700 transition-colors">
                      <LogIn size={18} />
                      Login
                    </div>
                  </Link>
                  {/* <button className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-lg hover:from-green-700 hover:to-teal-700 transition-all duration-300 shadow-md">
                    Sign Up
                  </button> */}
                </>
              )}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">In partnership with:</p>
            <div className="flex justify-center space-x-6">
              <div className="w-12 h-12 relative opacity-70">
                <Image
                  src="/assets/logo-bappenas.svg"
                  alt="Logo Bappenas"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="w-28 h-12 relative opacity-70">
                <Image
                  src="/assets/logo-ukaid.webp"
                  alt="Logo UKAid"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="w-8 h-12 relative opacity-70">
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
      </div>

      {/* Backdrop for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navigation;
