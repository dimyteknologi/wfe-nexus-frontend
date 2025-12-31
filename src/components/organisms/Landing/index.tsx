"use client";

import {
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import Button from "@/components/atoms/Button";
import FeatureCard from "@/components/molecules/FeatureCard";
import StepCard from "@/components/molecules/StepCard";
import OrganizationLogo from "@/components/molecules/OrganizationLogo";
import SectionHeading from "@/components/molecules/SectionHeading";
import { ORGANIZATIONS } from "@/constants/organizations";
import { LANDING_FEATURES } from "@/constants/features";
import { FLOW_PROCESS } from "@/constants/flowProcess";
import "@/styles/animations.css";

const LandingPage = () => {
  const { t } = useTranslation();
  const { landing } = t;
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const features = LANDING_FEATURES(t);
  const flowProcess = FLOW_PROCESS(t);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <>
      <section className="pt-34 pb-20 px-6 bg-gradient-to-r from-green-50 to-blue-50 py-4 relative">
        <div className="container mx-auto p-4 flex flex-col md:flex-row items-center gap-8 justify-between relative z-10">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              {landing.hero.title1}
            </h1>
            <h1 className="text-5xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight text-green-600">
              {landing.hero.title2}
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {landing.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="./context-specific">
                <Button 
                  variant="primary" 
                  size="lg"
                  icon={<ArrowRight className="h-5 w-5" />}
                  iconPosition="right"
                >
                  {landing.hero.cta}
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center">
              <div className="flex -space-x-3">
                {ORGANIZATIONS.map((item) => (
                  <OrganizationLogo
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    imgSrc={item.imgSrc}
                    size="sm"
                  />
                ))}
              </div>
              <p className="ml-4 text-gray-600">
                {landing.hero.joinText}{" "}
                <span className="font-semibold text-green-700">
                  {landing.hero.joinCount}
                </span>{" "}
                {landing.hero.joinSuffix}
              </p>
            </div>
          </div>

          <div className="md:w-1/2 relative">
            <div className="relative rounded-[15%] overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <img
                className="w-full h-auto object-cover "
                src="./assets/image-demo-1.svg"
                alt="WEF Nexus Dashboard Preview"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="absolute top-6 left-6 w-48 h-3 bg-green-400/70 rounded-full animate-pulse"></div>
              <div className="absolute top-14 left-6 w-32 h-3 bg-blue-400/70 rounded-full animate-pulse animation-delay-1000"></div>
              <div className="absolute top-22 left-6 w-40 h-3 bg-teal-400/70 rounded-full animate-pulse animation-delay-2000"></div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg z-10 animate-float">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium">
                  {landing.hero.collaboration}
                </span>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg z-10 animate-float animation-delay-2000">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">98%</div>
                <div className="text-xs text-gray-500">
                  {landing.hero.activeUser}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto px-6 mt-24 relative z-10">
          <div className="flex flex-col items-center justify-items-center bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-md">
            <p className="text-center text-gray-500 mb-10 font-bold text-xl">
              {landing.hero.collaboratedWith}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 ">
              {ORGANIZATIONS.map((company) => (
                <OrganizationLogo
                  key={company.id}
                  id={company.id}
                  name={company.name}
                  imgSrc={company.imgSrc}
                  showName={true}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={sectionRef} className="relative opacity-90 mt-1">
        <img
          className="absolute w-full h-full opacity-10 object-cover -z-1"
          src="./assets/image-demo-3.svg"
          alt="background pattern"
        />
        <div className="container mx-auto py-20">
          <SectionHeading
            badge={landing.features.badge}
            badgeVariant="success"
            title={landing.features.title}
            subtitle={landing.features.subtitle}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                color={feature.color}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-green-50 to-blue-50 relative opacity-90">
        <img
          className="absolute w-full h-full opacity-10 object-cover -z-1"
          src="./assets/image-demo-2.svg"
          alt="background pattern"
        />
        <div className="container mx-auto pt-20 px-6">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              badge={landing.howItWorks.badge}
              badgeVariant="success"
              title={landing.howItWorks.title}
              subtitle={landing.howItWorks.subtitle}
            />

            <div className="relative">
              <div className="hidden lg:block absolute left-0 right-0 top-20 h-1">
                <div className="h-full w-full bg-green-600 rounded-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-green-300 rounded-full animate-progress-line"></div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                {flowProcess.map((item, index) => (
                  <StepCard
                    key={index}
                    step={item.step}
                    title={item.title}
                    description={item.description}
                    icon={item.icon}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container py-20 mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            {landing.cta.title}
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            {landing.cta.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="./context-specific">
              <Button 
                variant="outline" 
                size="lg"
                icon={<ArrowRight className="h-5 w-5" />}
                iconPosition="right"
                className="bg-white"
              >
                {landing.cta.button}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
