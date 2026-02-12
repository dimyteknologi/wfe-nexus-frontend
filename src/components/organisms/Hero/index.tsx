"use client";

import { Play, ArrowRight } from "lucide-react";
import Link from "next/link";
import Button from "@/components/atoms/Button";

const Hero = () => {
  return (
    <section className="pt-36 pb-20 px-6 bg-gradient-to-r from-green-50 to-blue-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 justify-between">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            WEF NEXUS{" "}
            <span className="text-green-600">Decision Support System</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Transforming Water-Food-Energy Nexus thinking into actionable
            insights and policies for sustainable development.
          </p>
          <div className="flex flex-col justify-between md:justify-start sm:flex-row gap-4">
            <Link href="./context-specific">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight size={20} />}
                iconPosition="right"
              >
                Get Started
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              icon={<Play size={18} />}
              className="bg-white"
            >
              Watch Demo
            </Button>
          </div>
          <div className="mt-8 flex items-center">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-white shadow-md"
                ></div>
              ))}
            </div>
            <p className="ml-4 text-gray-600">
              Join <span className="font-semibold text-green-700">500+</span>{" "}
              organizations using our platform
            </p>
          </div>
        </div>

        <div className="md:w-1/2 relative">
          <div className="flex flex-col justify-between items-end gap-4">
            <div className="w-full lg:w-96 relative z-10 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <img
                src="./assets/image-demo-1.svg"
                alt="WEF Nexus Dashboard"
                className="w-full h-auto"
              />
            </div>
            <div className="w-full lg:w-96 relative z-10 self-start rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <img
                src="./assets/image-demo-2.svg"
                alt="Data Visualization"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
