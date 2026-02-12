"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { NavItem } from "@/types/data";

interface DesktopNavProps {
  navItems: NavItem[];
  activeDropdown: string | null;
  onDropdownToggle: (label: string) => void;
  onClose: () => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}

const DesktopNav: React.FC<DesktopNavProps> = ({
  navItems,
  activeDropdown,
  onDropdownToggle,
  onClose,
  dropdownRef,
}) => {
  return (
    <div className="hidden md:flex space-x-6" ref={dropdownRef}>
      {navItems.map((item) => (
        <div key={item.label} className="relative group">
          {item.subItems ? (
            <>
              <button
                type="button"
                className="text-gray-700 hover:text-green-600 transition-colors flex justify-center items-center gap-1 py-2 font-medium"
                onClick={() => onDropdownToggle(item.label)}
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
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100 animate-fade-in">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      className="px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200 flex items-center"
                      onClick={onClose}
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
  );
};

export default DesktopNav;
