"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useTranslation } from "@/hooks/useTranslation";
import { NavItem } from "@/types/data";
import LanguageToggle from "@/components/atoms/LanguageToggle";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import AuthButtons from "./AuthButtons";
import { useAppSelector, useAppDispatch } from "@/stores/root-reducer";
import { logout } from "@/stores/slicers/auth/AuthSlice";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { status: sessionStatus } = useSession();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { t } = useTranslation();

  const status =
    isAuthenticated || sessionStatus === "authenticated"
      ? "authenticated"
      : sessionStatus;

  const navItems: NavItem[] = [
    { href: "/", label: t.navigation.home },
    { href: "/about", label: t.navigation.about },
    {
      href: "#",
      label: t.navigation.dssInterface,
      subItems: [
        ...(status === "authenticated"
          ? [{ href: "/site-specific", label: t.navigation.siteSpecific }]
          : []),
        { href: "/context-specific", label: t.navigation.contextSpecific },
      ],
    },
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

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    dispatch(logout());
    await signOut({ callbackUrl: window.location.origin });
  };

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
            : "bg-gradient-to-r from-green-50 to-blue-50 py-5"
          }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/assets/nexus-logo.png"
              alt="Nexus Logo"
              width={120}
              height={40}
              className="object-contain"
            />
          </Link>

          <DesktopNav
            navItems={navItems}
            activeDropdown={activeDropdown}
            onDropdownToggle={handleDropdownToggle}
            onClose={closeAllMenus}
            dropdownRef={dropdownRef}
          />

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center space-x-3">
              <LanguageToggle />
              <AuthButtons
                status={status}
                onLogout={handleLogout}
                loginText={t.navigation.login}
                logoutText={t.navigation.logout}
              />
            </div>

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

      <MobileNav
        isOpen={mobileMenuOpen}
        navItems={navItems}
        activeDropdown={activeDropdown}
        status={status}
        loginText={t.navigation.login}
        logoutText={t.navigation.logout}
        onClose={closeAllMenus}
        onDropdownToggle={handleDropdownToggle}
        onLogout={handleLogout}
        mobileMenuRef={mobileMenuRef}
      />
    </>
  );
};

export default Navigation;
