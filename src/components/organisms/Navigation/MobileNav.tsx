"use client";

import Link from "next/link";
import Image from "next/image";
import { X, ChevronDown, LogIn, LogOut } from "lucide-react";
import { NavItem } from "@/types/data";
import LanguageToggle from "@/components/atoms/LanguageToggle";

interface MobileNavProps {
  isOpen: boolean;
  navItems: NavItem[];
  activeDropdown: string | null;
  status: string;
  loginText: string;
  logoutText: string;
  onClose: () => void;
  onDropdownToggle: (label: string) => void;
  onLogout: () => void;
  mobileMenuRef: React.RefObject<HTMLDivElement | null>;
}

const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  navItems,
  activeDropdown,
  status,
  loginText,
  logoutText,
  onClose,
  onDropdownToggle,
  onLogout,
  mobileMenuRef,
}) => {
  return (
    <>
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-2xl transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <Link href="/" className="flex items-center space-x-2" onClick={onClose}>
              <Image
                src="/assets/nexus-logo.png"
                alt="Nexus Logo"
                width={120}
                height={40}
                className="object-contain"
              />
            </Link>
            <button
              className="p-1 rounded-md text-gray-500 hover:text-gray-700"
              onClick={onClose}
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
                        onClick={() => onDropdownToggle(item.label)}
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
                              onClick={onClose}
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
                      onClick={onClose}
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
              <div className="flex justify-center mb-4">
                <LanguageToggle />
              </div>

              {status === "authenticated" ? (
                <button
                  onClick={onLogout}
                  className="w-full flex items-center justify-center gap-2 text-gray-700 py-3 border border-gray-300 rounded-lg hover:border-red-600 hover:text-red-700 transition-colors"
                >
                  <LogOut size={18} />
                  {logoutText}
                </button>
              ) : (
                <Link href="/login" onClick={onClose}>
                  <div className="w-full flex items-center justify-center gap-2 text-gray-700 py-3 border border-gray-300 rounded-lg hover:border-green-600 hover:text-green-700 transition-colors">
                    <LogIn size={18} />
                    {loginText}
                  </div>
                </Link>
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

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={onClose}
        ></div>
      )}
    </>
  );
};

export default MobileNav;
