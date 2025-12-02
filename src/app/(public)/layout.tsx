'use client';

import Navigation from "@/components/organisms/Navigation";
import ProviderComponent from "@/stores/provider";

export default function PublicLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
       <ProviderComponent>
          <main className="bg-white w-full">
            <Navigation />
            <div className=" w-full">{children}</div>
          </main>
        </ProviderComponent>
  );
}