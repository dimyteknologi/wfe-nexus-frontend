import Footer from "@/components/organisms/Footer";
import Hero from "@/components/organisms/Hero";
import Landing from "@/components/organisms/Landing";

export default async function Home() {
  return (
    <main className="font-sans mx-auto">
      <Hero />
      <Landing />
      <Footer />
    </main>
  );
}
