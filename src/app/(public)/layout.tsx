'use client';

import Navigation from "@/components/organisms/Navigation";

export default function PublicLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-white w-full">
      <Navigation />
      <div className="w-full">
        {children}
      </div>
    </main>
  );
}