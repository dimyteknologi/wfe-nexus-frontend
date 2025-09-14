"use client";

import { Play, ArrowRight, CheckCircle, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const organization = [
  {
    id: 1,
    name: "Kementrian PPN/Bappenas",
    imgSrc: "./assets/logo-bappenas.svg",
  },
  { id: 2, name: "Kementrian ESDM", imgSrc: "./assets/logo-esdm.svg" },
  {
    id: 3,
    name: "Karawang",
    imgSrc: "./assets/logo-karawang.svg",
  },
  { id: 4, name: "Samosir", imgSrc: "./assets/logo-samosir.svg" },
  { id: 5, name: "Tanggamus", imgSrc: "./assets/logo-tanggamus.svg" },
];

const features = [
  {
    icon: "📊",
    title: "Advanced Analytics",
    description:
      "Leverage context and site analytics to gain deep insights into nexus interdependencies and impacts.",
  },
  {
    icon: "🌍",
    title: "Scenario Modeling",
    description:
      "Create and compare multiple scenarios to evaluate policy decisions under different conditions.",
  },
  {
    icon: "📈",
    title: "Real-time Simulation",
    description: "Simulation key indicators in real-time.",
  },
  {
    icon: "🤝",
    title: "Stakeholder Collaboration",
    description:
      "Enable seamless collaboration between multiple stakeholders with role-based access.",
  },
  {
    icon: "📑",
    title: "Comprehensive Reporting",
    description:
      "Generate detailed reports with visualizations in multiple formats.",
  },
  {
    icon: "🔒",
    title: "Data Security",
    description:
      "Enterprise-grade security with encryption and compliance with global data protection standards.",
  },
];

const flowProcess = [
  {
    step: "1",
    title: "Data Integration",
    description:
      "Connect your data sources or use our sample datasets to get started quickly.",
  },
  {
    step: "2",
    title: "Model Configuration",
    description:
      "Configure models based on your specific context and policy questions.",
  },
  {
    step: "3",
    title: "Analysis & Simulation",
    description:
      "Run simulations and analyze results through interactive visualizations.",
  },
  {
    step: "4",
    title: "Implementation",
    description: "Implement evidence-based policies with confidence.",
  },
];

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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
      {/* Hero Section */}
      <section className="pt-34 pb-20 px-6 bg-gradient-to-r from-green-50 to-blue-50 py-4 relative">
        <div className="container mx-auto p-4 flex flex-col md:flex-row items-center gap-8 justify-between relative z-10">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              WEF NEXUS{" "}
              <span className="text-green-600">Decision Support System</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Transforming Water-Energy-Food Nexus thinking into actionable
              insights and policies for sustainable development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="bg-gradient-to-r from-green-700 to-teal-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-green-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2">
                <Link href={"./dss-interface"} className="flex items-center">
                  Get Started <ArrowRight className="h-5 ml-1" />
                </Link>
              </button>
              <button className="border-2 bg-white border-green-700 text-green-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition-all duration-300 flex items-center justify-center gap-2 group">
                <Play className="h-5 transition-transform group-hover:scale-110" />
                <span>Watch Demo</span>
              </button>
            </div>
            <div className="mt-8 flex items-center">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="w-12 h-12 rounded-full bg-white border-2 border-white shadow-md"
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
            <div className="relative rounded-[15%] overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <img
                className="w-full h-auto object-cover "
                src="./assets/image-demo-1.svg"
                alt="WEF Nexus Dashboard Preview"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating elements */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg z-10 animate-float">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium">
                  Colaboration Simulation
                </span>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg z-10 animate-float animation-delay-2000">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">98%</div>
                <div className="text-xs text-gray-500">Active User</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto px-6 mt-24 relative z-10">
          <div className="flex flex-col items-center justify-items-center bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-md">
            <p className="text-center text-gray-500 mb-10 font-bold text-xl">
              Collaborated with government leading organizations
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 ">
              {organization.map((company) => (
                <div
                  key={company.id}
                  className="flex flex-col items-center justify-center gap-3 transition-transform hover:scale-110 duration-300"
                >
                  <div className="h-20 w-28 hover:grayscale-0 transition-all duration-500">
                    <img
                      className="w-full h-full object-contain"
                      src={company.imgSrc}
                      alt={company.name}
                    />
                  </div>
                  <p className="text-gray-500 text-sm text-center">
                    {company.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={sectionRef} className="relative opacity-90 mt-1">
        <img
          className="absolute w-full h-full opacity-10 object-cover -z-1"
          src="./assets/image-demo-2.svg"
          alt="background pattern"
        />
        <div className="container mx-auto py-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Powerful Features
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Everything You Need for Informed Decisions
            </h2>
            <p className="text-xl text-gray-600">
              Our platform provides comprehensive tools to analyze and optimize
              the Water-Food-Energy Nexus
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2 ${
                  isVisible ? "animate-fade-in" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-5xl mb-5">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-4 flex items-center text-green-700 font-medium">
                  <span className="text-sm">Learn more</span>
                  <ChevronRight className="h-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative opacity-90 mt-1">
        <img
          className="absolute w-full h-full opacity-10 object-cover -z-1"
          src="./assets/image-demo-3.svg"
          alt="background pattern"
        />

        <div className="container mx-auto px-6 py-20 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              How It Works
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              How WEF Nexus Works
            </h2>
            <p className="text-xl text-gray-600">
              A simple four-step process to transform your decision-making
            </p>
          </div>

          <div className="relative">
            {/* Connection line for desktop */}
            <div className="hidden md:block absolute left-0 right-0 top-16 h-1 bg-green-200"></div>

            <div className="grid md:grid-cols-4 gap-8 md:gap-4 relative">
              {flowProcess.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-20 h-20 border-4 border-white rounded-full bg-green-100 text-green-800 flex items-center justify-center text-2xl font-bold mb-6 relative z-10 shadow-lg group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-green-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container py-20 mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Decision-Making?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Join hundreds of organizations using WEF Nexus to create sustainable
            policies and practices
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-green-800 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2">
              Get Started <ArrowRight className="h-5" />
            </button>
            <button className="bg-green-800 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg">
              Contact us
            </button>
          </div>
        </div>
      </section>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default LandingPage;
