"use client";

interface GridLayoutProps {
  children: React.ReactNode;
}

export function DSSGridLayout({ children }: GridLayoutProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
      {children}
    </div>
  );
}
