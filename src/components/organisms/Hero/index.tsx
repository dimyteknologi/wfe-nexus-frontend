import { Play } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="pt-36 pb-20 px-6 bg-gradient-to-r from-green-50 to-blue-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            WEF NEXUS{" "}
            <span className="text-green-700">Decision Support System</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Transforming Water-Food-Energy Nexus thinking into actionable
            insights and policies for sustainable development.
          </p>
          <div className="flex flex-col justify-between md:justify-start sm:flex-row gap-4">
            <button className="bg-green-800 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg">
              <Link href={"./dss-interface"}>Get Started</Link>
            </button>
            <button className="border-2 border-green-800 text-green-800 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors flex items-center justify-center">
              <Play className="h-4" />
              <p>Watch Demo</p>
            </button>
          </div>
          <div className="mt-8 flex items-center">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="w-10 h-10 rounded-full bg-green-200 border-2 border-white"
                ></div>
              ))}
            </div>
            <p className="ml-4 text-gray-600">
              Join <span className="font-semibold">500+</span> organizations
              using our platform
            </p>
          </div>
        </div>

        <div className="md:w-1/2 relative">
          <div className="flex flex-col justify-between items-end gap-4">
            <div className="w-full lg:w-96 relative z-10 rounded-xl overflow-hidden">
              <img src={"./assets/image-demo-1.svg"} alt="image-1" />
            </div>
            <div className="w-full lg:w-96 relative z-10 self-start rounded-xl overflow-hidden">
              <img src={"./assets/image-demo-2.svg"} alt="image-2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
