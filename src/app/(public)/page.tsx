import Footer from "@/components/organisms/Footer";
import Landing from "@/components/organisms/Landing";

export default async function Home() {
  return (
    <main className="font-sans mx-auto">
      <Landing />
      <Footer />
    </main>
  );
}
