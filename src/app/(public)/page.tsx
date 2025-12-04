import Footer from "@/components/organisms/Footer";
import Landing from "@/components/organisms/Landing";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { apiClient } from "@/lib/api/api";
import RegionSetter from "@/components/RegionSetter";

export default async function Home() {
  const session = await getServerSession(authOptions);
  let region: "KARAWANG" | "SIDOARJO" = "KARAWANG"; // Default

  if (session?.user?.cityId) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://103.63.24.47:4000'}/kota/${session.user.cityId}`, {
        headers: {
          'Authorization': `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
           'ngrok-skip-browser-warning': 'true',
        },
        cache: 'no-store'
      });

      if (response.ok) {
        const cityData = await response.json();
        const cityName = (cityData.data?.name || cityData.name || "").toUpperCase();
        
        if (cityName.includes("SIDOARJO")) {
          region = "SIDOARJO";
        } else if (cityName.includes("KARAWANG")) {
          region = "KARAWANG";
        }
      }
    } catch (error) {
      console.error("Failed to fetch city for region setting:", error);
    }
  }

  return (
    <main className="font-sans mx-auto">
      <RegionSetter region={region} />
      <Landing />
      <Footer />
    </main>
  );
}
