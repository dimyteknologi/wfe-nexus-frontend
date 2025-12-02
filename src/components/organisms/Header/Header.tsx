"use client";

interface HeaderProps {
  children: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <div className="mb-8 pt-8 flex flex-col items-center sticky top-0 z-10 backdrop-blur-md bg-white/70 supports-[backdrop-filter]:bg-white/50 border-b border-gray-200 pb-4">
      <div className="relative">{children}</div>
    </div>
  );
}
