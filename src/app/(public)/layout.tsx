'use client';

import Navigation from "@/components/organisms/Navigation";
import ProviderComponent from "@/stores/provider";
import { SessionProvider } from "next-auth/react";

export default function PublicLayoutClient({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <SessionProvider session={session}>
      <ProviderComponent>
        <main className="bg-white w-full">
          <Navigation />
          <div className="w-full">
            {children}
          </div>
        </main>
      </ProviderComponent>
    </SessionProvider>
  );
}