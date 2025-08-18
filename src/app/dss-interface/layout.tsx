import Navigation from "@/components/organisms/Navigation";
import { StoreProvider } from "../StoreProvider";

export default function DSSLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <StoreProvider>{children}</StoreProvider>
    </section>
  );
}
