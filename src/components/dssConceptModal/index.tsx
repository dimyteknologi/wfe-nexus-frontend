"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface DSSConceptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DSSConceptModal: React.FC<DSSConceptModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, title: "ABOUT WEF NEXUS" },
    { id: 1, title: "RELATED ASSUMPTION" },
    { id: 2, title: "SCENARIO BUILDING" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
      <div className="bg-white w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 rounded-2xl p-6 my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white py-2">
          <h3 className="font-bold text-lg">DSS Concept</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <section className="container mx-auto px-6 py-4">
          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap justify-center mb-8 border-b border-gray-200"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-2 text-base font-medium transition-colors ${activeTab === tab.id ? "text-green-800 border-b-2 border-green-800" : "text-gray-500 hover:text-green-700"}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.title}
              </button>
            ))}
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {activeTab === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-green-800 mb-6">
                    About WFE Nexus
                  </h2>
                  <p className="text-lg text-gray-700 mb-6">
                    The{" "}
                    <span className="font-bold">
                      Decision Support System (DSS) Tool
                    </span>{" "}
                    is developed through an{" "}
                    <span className="font-bold">
                      interlinkages-based approach
                    </span>
                    , emphasizing the interactions among the water–food–energy
                    sectors under dynamic social and economic conditions as key
                    drivers of regional development performance.
                  </p>

                  <div className="">
                    <p className="text-lg text-gray-700 mb-6">
                      Using a systems thinking perspective and system dynamics
                      modeling approach (Forester, 1961; Vennix, 1996; Senge,
                      2000; Sterman, 2000; Morecroft, 2015), the DSS Tool is
                      designed to illustrate the impacts of demand scenarios for
                      the economic sector (industry and services), agriculture
                      production (rice, livestock, and inland fisheries), and
                      population growth on the local capacity to meet water,
                      food, and energy needs. It also incorporates
                      sector-specific scenarios such as the development of
                      recharge areas for water production (artificial ponds,
                      conservation measures), solar PV deployment, and
                      agricultural productivity improvements, with the aim of
                      enhancing local water, energy, and food resilience in the
                      future. The conceptual framework of the sectoral
                      interlinkages within the DSS Tool is illustrated as
                      follows:
                    </p>
                  </div>
                  <img src={"./assets/concept-diagram.png"} />

                  <h3 className="text-2xl font-semibold text-green-800 mb-4">
                    Implementation in Indonesia
                  </h3>
                  <p className="text-lg text-gray-700 mb-6">
                    Using a systems thinking perspective and system dynamics
                    modeling approach (Forester, 1961; Vennix, 1996; Senge,
                    2000; Sterman, 2000; Morecroft, 2015), the DSS Tool is
                    designed to illustrate the impacts of demand scenarios for
                    the economic sector (industry and services), agriculture
                    production (rice, livestock, and inland fisheries), and
                    population growth on the local capacity to meet water, food,
                    and energy needs. It also incorporates sector-specific
                    scenarios such as the development of recharge areas for
                    water production (artificial ponds, conservation measures),
                    solar PV deployment, and agricultural productivity
                    improvements, with the aim of enhancing local water, energy,
                    and food resilience in the future. The conceptual framework
                    of the sectoral interlinkages within the DSS Tool is
                    illustrated as follows:
                  </p>

                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h4 className="text-xl font-semibold mb-4">
                      Key Indicators:
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <svg
                            className="w-5 h-5 text-green-600 mt-1 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>Food security index</span>
                        </li>
                        <li className="flex items-start">
                          <svg
                            className="w-5 h-5 text-green-600 mt-1 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>Growth of agriculture GDP</span>
                        </li>
                        <li className="flex items-start">
                          <svg
                            className="w-5 h-5 text-green-600 mt-1 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>Water security index</span>
                        </li>
                      </ul>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <svg
                            className="w-5 h-5 text-green-600 mt-1 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>Water storage capacity</span>
                        </li>
                        <li className="flex items-start">
                          <svg
                            className="w-5 h-5 text-green-600 mt-1 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>Urban household access to drinking water</span>
                        </li>
                        <li className="flex items-start">
                          <svg
                            className="w-5 h-5 text-green-600 mt-1 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>Water quality index</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DSSConceptModal;
