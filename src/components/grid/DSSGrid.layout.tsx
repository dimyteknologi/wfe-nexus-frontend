"use client";

interface GridLayoutProps {
  children: React.ReactNode;
}

const DSSGridLayout = ({ children }: GridLayoutProps) => {
  return <div className="grid grid-cols-1 gap-4 pb-8">{children}</div>;
};

export default DSSGridLayout;
