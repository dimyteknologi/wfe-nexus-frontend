import { Play } from "lucide-react";
import Link from "next/link";

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
  { id: 5, name: "Sanggamus", imgSrc: "./assets/logo-lampung.png" },
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
  return (
    <>
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
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-6">
          <p className="text-center text-gray-500 mb-8">
            Colaborated by goverment leading organizations
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
            {organization.map((company) => (
              <div
                key={company.id}
                className="flex flex-col items-center justify-center gap-2"
              >
                <div className="h-24 w-32">
                  <img
                    className="w-full h-full object-contain"
                    src={company.imgSrc}
                    alt={company.name}
                  />
                </div>
                <p className="text-gray-400 text-sm">{company.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Powerful Features for Informed Decisions
            </h2>
            <p className="text-xl text-gray-600">
              Our platform provides comprehensive tools to analyze and optimize
              the Water-Food-Energy Nexus
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              How WFE Nexus Works
            </h2>
            <p className="text-xl text-gray-600">
              A simple four-step process to transform your decision-making
            </p>
          </div>

          <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-8">
            {flowProcess.map((item, index) => (
              <div
                key={index}
                className="flex-1 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-2xl font-bold mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-green-800 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Decision-Making?
          </h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Join hundreds of organizations using WFE Nexus to create sustainable
            policies and practices
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-green-800 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-100 transition-colors">
              Get Started
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors">
              Contact us
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
