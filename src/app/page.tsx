import Footer from "@/components/organisms/Footer";
import Hero from "@/components/organisms/Hero";
import Navigation from "@/components/organisms/Navigation";

export default async function Home() {
  return (
    <main className="font-sans h-screen">
      <Navigation />
      <Hero />
      <Footer />
    </main>
  );
}
