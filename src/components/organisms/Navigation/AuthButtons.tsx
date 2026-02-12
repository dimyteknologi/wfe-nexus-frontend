"use client";

import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";
import Button from "@/components/atoms/Button";

interface AuthButtonsProps {
  status: string;
  onLogout: () => void;
  loginText: string;
  logoutText: string;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({
  status,
  onLogout,
  loginText,
  logoutText,
}) => {
  if (status === "authenticated") {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={onLogout}
        icon={<LogOut size={16} />}
        className="text-red-700 hover:bg-red-50"
      >
        {logoutText}
      </Button>
    );
  }

  return (
    <Link href="/login">
      <Button
        variant="ghost"
        size="sm"
        icon={<LogIn size={16} />}
        className="hover:bg-green-50"
      >
        {loginText}
      </Button>
    </Link>
  );
};

export default AuthButtons;
