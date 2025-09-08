import Footer from "@/components/organisms/Footer";
import Hero from "@/components/organisms/Hero";
import Landing from "@/components/organisms/Landing";
import { Play } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="font-sans mx-auto">
      <Landing />
      <Footer />
    </main>
  );
}
