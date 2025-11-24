"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronRight,
  BookOpen,
  BarChart3,
  Lightbulb,
} from "lucide-react";

interface DSSConceptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DSSConceptModal: React.FC<DSSConceptModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const tabs = [
    { id: 0, title: "ABOUT", icon: <BookOpen size={16} /> },
    { id: 1, title: "RELATED ASSUMPTION", icon: <Lightbulb size={16} /> },
    { id: 2, title: "SCENARIO BUILDING", icon: <BarChart3 size={16} /> },
  ];

  const demandList = [
    "Water demand per capita [liters/capita/day]",
    "Water demand per unit of industrial production [m³/billion IDR]",
    "Water demand for agricultural land [mm/day/ha]",
    "Water demand for inland fisheries [mm/day/ha]",
    "Water demand for livestock [mm/day/head]",
    "Water demand for urban land [% of domestic demand]",
    "Rate of agricultural and forest land conversion [%/year]",
    "Food demand per capita [kg/capita/year]",
    "Energy demand per capita [kWh/capita/year]",
    "Rice shrinkage ratio from unhulled rice (GKG) [%]",
    "Energy intensity for the economy [kWh/billion IDR]",
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 overflow-y-auto p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
              <h3 className="font-bold text-2xl bg-gradient-to-r text-green-700 bg-clip-text ">
                Decision Support System Concept
              </h3>
              <button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="Close modal"
              >
                <X size={24} className="text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
              {/* Sidebar Navigation */}
              <div className="w-full md:w-64 bg-gray-50 p-4 border-r border-gray-200">
                <div className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg"
                          : "text-gray-600 hover:bg-gray-100 hover:text-green-700"
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <span className="mr-3">{tab.icon}</span>
                      <span className="font-medium">{tab.title}</span>
                      <ChevronRight
                        size={16}
                        className={`ml-auto transition-transform ${activeTab === tab.id ? "rotate-90" : ""}`}
                      />
                    </button>
                  ))}
                </div>

                {/* <div className="mt-6 p-4 bg-white rounded-xl border border-green-100 shadow-sm">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                    <Download size={16} className="mr-2" />
                    Resources
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Download additional materials
                  </p>
                  <button className="w-full py-2 px-4 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors flex items-center justify-center">
                    Download Concept PDF{" "}
                    <ArrowRight size={14} className="ml-2" />
                  </button>
                </div> */}
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-4xl mx-auto"
                  >
                    {activeTab === 0 && (
                      <div className="space-y-8">
                        <div className="bg-white rounded-2xl p-8">
                          <motion.h2
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl font-bold text-green-800 mb-6 pb-2 border-b border-green-100"
                          >
                            About the DSS Tool
                          </motion.h2>

                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-gray-700 mb-6 leading-relaxed"
                          >
                            The{" "}
                            <span className="font-bold text-green-700">
                              Decision Support System (DSS) Tool
                            </span>{" "}
                            is developed through an{" "}
                            <span className="font-bold text-blue-600">
                              interlinkages-based approach
                            </span>
                            , emphasizing the interactions among the
                            water–food–energy sectors under dynamic social and
                            economic conditions as key drivers of regional
                            development performance.
                          </motion.p>

                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-gray-700 mb-6 leading-relaxed"
                          >
                            Using a
                            <span className="font-bold text-blue-600">
                              {" "}
                              systems thinking perspective
                            </span>{" "}
                            and{" "}
                            <span className="font-bold text-blue-600">
                              {" "}
                              system dynamics modeling approach{" "}
                            </span>{" "}
                            (Forester, 1961; Vennix, 1996; Senge, 2000; Sterman,
                            2000; Morecroft, 2015), the DSS Tool is designed to
                            illustrate the impacts of demand scenarios for the
                            economic sector (industry and services), agriculture
                            production (rice, livestock, and inland fisheries),
                            and population growth on the local capacity to meet
                            water, food, and energy needs.
                          </motion.p>

                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-gray-700 mb-6 leading-relaxed"
                          >
                            It also incorporates sector-specific scenarios such
                            as the development{" "}
                            <span className="font-bold text-blue-600">
                              of recharge areas for water production (artificial
                              ponds, conservation measures), solar PV
                              deployment,
                            </span>{" "}
                            and{" "}
                            <span className="font-bold text-blue-600">
                              agricultural productivity improvements
                            </span>
                            , with the aim of enhancing local water, energy, and
                            food resilience in the future.
                          </motion.p>

                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-gray-700 mb-2 leading-relaxed"
                          >
                            The conceptual framework of the sectoral
                            interlinkages within the DSS Tool is illustrated as
                            follows:
                          </motion.p>

                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="relative mb-8 rounded-xl overflow-hidden border border-gray-200 shadow-md"
                          >
                            <Image
                              className="w-full h-auto"
                              src="/assets/concept-diagram.png"
                              alt="DSS Conceptual Framework"
                              width={1200}
                              height={800}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                              <span className="text-white text-sm">
                                Conceptual framework of sectoral interlinkages
                              </span>
                            </div>
                          </motion.div>

                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-lg text-gray-700 mb-8 leading-relaxed"
                          >
                            The diagram above illustrates the{" "}
                            <span className="font-bold text-blue-600">
                              interconnected dynamics
                            </span>{" "}
                            within the
                            <span className="font-bold text-green-700">
                              Water–Energy–Food (WEF) Nexus
                            </span>
                            , emphasizing the feedback relationships between
                            resource availability, consumption, and production.
                            Each component influences the others through{" "}
                            <span className="font-bold text-blue-600">
                              reinforcing
                            </span>{" "}
                            and{" "}
                            <span className="font-bold text-blue-600">
                              balancing loops
                            </span>
                            , shaping sustainability outcomes over time. The
                            modules including:
                          </motion.p>

                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-gray-700 mb-2 leading-relaxed"
                          >
                            Several assumptions related to resource needs
                            (water, energy, food) within a region include:
                          </motion.p>

                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-6 space-y-4"
                          >
                            <div className="text-gray-700 leading-relaxed">
                              <h3 className="font-bold text-lg mb-1">
                                1. Food Module
                              </h3>
                              <p>
                                <span className="font-semibold text-blue-600">
                                  Components:
                                </span>{" "}
                                Local food production (rice, livestock, fish,
                                etc.), food availability, Self-Sufficiency Level
                                (SSL), and Availability per Person (APP).
                              </p>
                              <p>
                                <span className="font-semibold text-green-600">
                                  Dependencies:
                                </span>{" "}
                                Food production depends on water availability
                                for irrigation and energy for pumping,
                                processing, and transportation.
                              </p>
                            </div>

                            <div className="text-gray-700 leading-relaxed">
                              <h3 className="font-bold text-lg mb-1">
                                2. Water Module
                              </h3>
                              <p>
                                <span className="font-semibold text-blue-600">
                                  Components:
                                </span>{" "}
                                Water storage, irrigation supply, domestic and
                                industrial demand.
                              </p>
                              <p>
                                <span className="font-semibold text-green-600">
                                  Linkages:
                                </span>{" "}
                                Water supply gives availability for economy and
                                population to grow.
                              </p>
                            </div>

                            <div className="text-gray-700 leading-relaxed">
                              <h3 className="font-bold text-lg mb-1">
                                3. Energy Module
                              </h3>
                              <p>
                                <span className="font-semibold text-blue-600">
                                  Components:
                                </span>{" "}
                                Energy supply (including renewables),
                                consumption by agricultural and water sectors.
                              </p>
                              <p>
                                <span className="font-semibold text-green-600">
                                  Interactions:
                                </span>{" "}
                                Energy generation often requires water (e.g.,
                                hydropower, cooling systems), creating
                                interdependencies across modules.
                              </p>
                            </div>

                            <div className="text-gray-700 leading-relaxed">
                              <h3 className="font-bold text-lg mb-1">
                                4. Economy Module
                              </h3>
                              <p>
                                <span className="font-semibold text-blue-600">
                                  Components:
                                </span>{" "}
                                GDRP for manufacture, agriculture, and others.
                              </p>
                              <p>
                                <span className="font-semibold text-green-600">
                                  Interactions:
                                </span>{" "}
                                As driver for resources (food, water, energy)
                                demand and feedback in terms of availability for
                                growing economy.
                              </p>
                            </div>

                            <div className="text-gray-700 leading-relaxed">
                              <h3 className="font-bold text-lg mb-1">
                                5. Population Module
                              </h3>
                              <p>
                                <span className="font-semibold text-blue-600">
                                  Components:
                                </span>{" "}
                                Population and its growth.
                              </p>
                              <p>
                                <span className="font-semibold text-green-600">
                                  Interactions:
                                </span>{" "}
                                As driver for resources (food, water, energy)
                                demand for population and feedback in terms of
                                availability for growing economy that affect the
                                population growth.
                              </p>
                            </div>
                          </motion.div>

                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-gray-700 mb-2 leading-relaxed"
                          >
                            The interaction among the sectors will form the loop
                            between each module, including:
                          </motion.p>

                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="bg-gray-50 p-6 rounded-xl mb-6 border border-gray-200"
                          >
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr>
                                    <th className="px-6 py-4 text-left font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-indigo-500">
                                      Loop
                                    </th>
                                    <th className="px-6 py-4 text-left font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-indigo-500">
                                      Involved Module
                                    </th>
                                    <th className="px-6 py-4 text-left font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-indigo-500">
                                      Description
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                  {/* Loop B1 */}
                                  <tr className="hover:bg-indigo-50 transition-colors duration-150">
                                    <td className="px-6 py-4 font-bold text-indigo-800">
                                      B1
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                      Economy ➔ Water ➔ Economy
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 leading-relaxed">
                                      GDRP affects water demand; water supply in
                                      turn affects the economy`s capacity to
                                      grow.
                                    </td>
                                  </tr>

                                  {/* Loop B2 */}
                                  <tr className="hover:bg-indigo-50 transition-colors duration-150">
                                    <td className="px-6 py-4 font-bold text-indigo-800">
                                      B2
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                      Economy ➔ Energy ➔ Economy
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 leading-relaxed">
                                      GDRP affects energy demand; energy supply
                                      in turn affects the economy`s capacity to
                                      grow.
                                    </td>
                                  </tr>

                                  {/* Loop B3 */}
                                  <tr className="hover:bg-indigo-50 transition-colors duration-150">
                                    <td className="px-6 py-4 font-bold text-indigo-800">
                                      B3
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                      Food ➔ Water ➔ Food
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 leading-relaxed">
                                      Food production volume affects water
                                      demand for irrigation; water supply
                                      affects food production capacity.
                                    </td>
                                  </tr>

                                  {/* Loop B4 */}
                                  <tr className="hover:bg-indigo-50 transition-colors duration-150">
                                    <td className="px-6 py-4 font-bold text-indigo-800">
                                      B4
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                      Food ➔ Energy ➔ Food
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 leading-relaxed">
                                      Food production volume affects energy
                                      demand for production; energy supply
                                      affects food production capacity.
                                    </td>
                                  </tr>

                                  {/* Reinforcing Loop R1 */}
                                  <tr className="hover:bg-red-50 transition-colors duration-150">
                                    <td className="px-6 py-4 font-bold text-red-800">
                                      R1
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                      Population
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 leading-relaxed">
                                      Population and its own growth acts as a
                                      reinforcing loop.
                                    </td>
                                  </tr>

                                  {/* Loop B5 */}
                                  <tr className="hover:bg-indigo-50 transition-colors duration-150">
                                    <td className="px-6 py-4 font-bold text-indigo-800">
                                      B5
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                      Population ➔ Water ➔ Population
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 leading-relaxed">
                                      Population affects water demand; water
                                      supply sufficiency and quality affect
                                      population growth.
                                    </td>
                                  </tr>

                                  {/* Loop B6 */}
                                  <tr className="hover:bg-indigo-50 transition-colors duration-150">
                                    <td className="px-6 py-4 font-bold text-indigo-800">
                                      B6
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                      Population ➔ Food ➔ Population
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 leading-relaxed">
                                      Population affects food demand; food
                                      supply affects population growth due to
                                      sufficiency.
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </motion.div>

                          <motion.h3
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-xl font-semibold text-green-800 mb-4 mt-10 pb-2 border-b border-green-100"
                          >
                            Sectoral Scope and Boundaries
                          </motion.h3>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="bg-gray-50 p-6 rounded-xl mb-6 border border-gray-200"
                          >
                            <div className="overflow-x-auto">
                              <table className="w-full">
                                <thead>
                                  <tr className="">
                                    <th className="px-6 py-4 text-left font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-green-500">
                                      Sector
                                    </th>
                                    <th className="px-6 py-4 text-left font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-green-500">
                                      Scope and Boundary
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                  {/* Economy Section */}
                                  <tr className="hover:bg-green-50 transition-colors duration-150 group">
                                    <td className="px-6 py-4 font-medium text-green-800 group-hover:text-green-900">
                                      Economy
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">
                                      17 GRDP economic sectors with deeper focus
                                      on the agricultural sector
                                    </td>
                                  </tr>

                                  {/* Agriculture */}
                                  <tr className="hover:bg-green-50 transition-colors duration-150 group">
                                    <td className="px-6 py-4 font-medium text-green-800 group-hover:text-green-900">
                                      Agriculture
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">
                                      <ul className="list-disc pl-5 space-y-1">
                                        <li className="text-gray-600">
                                          Rice as the main staple food, with
                                          extensive land use
                                        </li>
                                        <li className="text-gray-600">
                                          Livestock as staple food support
                                        </li>
                                        <li className="text-gray-600">
                                          Inland fisheries as staple food
                                          support
                                        </li>
                                      </ul>
                                    </td>
                                  </tr>

                                  {/* Demography */}
                                  <tr className="hover:bg-green-50 transition-colors duration-150 group">
                                    <td className="px-6 py-4 font-medium text-green-800 group-hover:text-green-900">
                                      Demography
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">
                                      <ul className="list-disc pl-5 space-y-1">
                                        <li className="text-gray-600">
                                          Total Population
                                        </li>
                                        <li className="text-gray-600">
                                          Population growth rate
                                        </li>
                                      </ul>
                                    </td>
                                  </tr>

                                  {/* Water */}
                                  <tr className="hover:bg-green-50 transition-colors duration-150 group">
                                    <td className="px-6 py-4 font-medium text-green-800 group-hover:text-green-900">
                                      Water
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">
                                      <ul className="list-disc pl-5 space-y-1">
                                        <li className="text-gray-600">
                                          <span className="font-medium">
                                            General:
                                          </span>{" "}
                                          Total calculation of local water
                                          demand and supply
                                        </li>
                                        <li className="text-gray-600">
                                          <span className="font-medium">
                                            Demand:
                                          </span>{" "}
                                          Domestic, Economy (Industrial), Urban
                                          system
                                        </li>
                                        <li className="text-gray-600">
                                          <span className="font-medium">
                                            Supply:
                                          </span>{" "}
                                          Surface Water, Ground Water, Regional
                                          supply
                                        </li>
                                      </ul>
                                    </td>
                                  </tr>

                                  {/* Energy */}
                                  <tr className="hover:bg-green-50 transition-colors duration-150 group">
                                    <td className="px-6 py-4 font-medium text-green-800 group-hover:text-green-900">
                                      Energy
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">
                                      <ul className="list-disc pl-5 space-y-1">
                                        <li className="text-gray-600">
                                          <span className="font-medium">
                                            General:
                                          </span>{" "}
                                          Only cover electricity—due to data
                                          limitation
                                        </li>
                                        <li className="text-gray-600">
                                          <span className="font-medium">
                                            Demand:
                                          </span>{" "}
                                          Domestic, Economy (Industrial)
                                        </li>
                                        <li className="text-gray-600">
                                          <span className="font-medium">
                                            Supply:
                                          </span>{" "}
                                          Local production, Regional supply
                                        </li>
                                      </ul>
                                    </td>
                                  </tr>

                                  {/* Food */}
                                  <tr className="hover:bg-green-50 transition-colors duration-150 group">
                                    <td className="px-6 py-4 font-medium text-green-800 group-hover:text-green-900">
                                      Food
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">
                                      <ul className="list-disc pl-5 space-y-1">
                                        <li className="text-gray-600">
                                          <span className="font-medium">
                                            General:
                                          </span>{" "}
                                          Covers only staple food (rice)
                                        </li>
                                        <li className="text-gray-600">
                                          <span className="font-medium">
                                            Demand:
                                          </span>{" "}
                                          Domestic, Economy (Industrial and or
                                          services)
                                        </li>
                                        <li className="text-gray-600">
                                          <span className="font-medium">
                                            Supply:
                                          </span>{" "}
                                          Local production, Production surplus
                                          or deficit
                                        </li>
                                      </ul>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </motion.div>

                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-gray-700 mb-6 leading-relaxed"
                          >
                            The use of the{" "}
                            <span className="font-bold text-green-700">
                              DSS
                            </span>{" "}
                            begins with inputting a dataset of regional
                            conditions, followed by configuring the assumptions
                            and trends of the model in the area, mapping these
                            assumptions and trends into model scenarios, and
                            validating historical behavior.
                          </motion.p>
                        </div>
                      </div>
                    )}

                    {activeTab === 1 && (
                      <div className="bg-white rounded-2xl p-8">
                        <motion.h2
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-3xl font-bold text-green-800 mb-6 pb-2 border-b border-green-100"
                        >
                          Related Assumptions
                        </motion.h2>

                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="text-lg text-gray-700 mb-2 leading-relaxed"
                        >
                          Several assumptions related to resource needs (water,
                          energy, food) within a region include:
                        </motion.p>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
                        >
                          {demandList.map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * index }}
                              className="bg-green-50 p-4 rounded-lg border border-green-100 hover:shadow-md transition-shadow duration-300 flex items-start"
                            >
                              <div className="bg-green-100 p-2 rounded-full mr-3 flex-shrink-0">
                                <svg
                                  className="w-5 h-5 text-green-600"
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
                              </div>
                              <span className="text-green-800">{item}</span>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                    )}

                    {activeTab === 2 && (
                      <div className="bg-white rounded-2xl p-8">
                        <motion.h2
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-3xl font-bold text-green-800 mb-6 pb-2 border-b border-green-100"
                        >
                          Scenario Building
                        </motion.h2>

                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="text-lg text-gray-700 mb-8 leading-relaxed"
                        >
                          Scenarios related to demand and supply, for each
                          resource sector, include:
                        </motion.p>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="bg-gray-50 p-6 rounded-xl mb-6 border border-gray-200"
                        >
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="">
                                  <th className="px-6 py-4 text-left font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-green-500">
                                    Sector
                                  </th>
                                  <th className="px-6 py-4 text-left font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-green-500">
                                    Scope and Boundary
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                <tr className="hover:bg-green-50 transition-colors duration-150 group">
                                  <td className="px-6 py-4 font-medium text-green-800 group-hover:text-green-900">
                                    Industry
                                  </td>
                                  <td className="px-6 py-4 text-gray-700">
                                    <ul className="list-disc pl-5 space-y-1">
                                      <li className="text-gray-600">
                                        Industrial growth
                                      </li>
                                    </ul>
                                  </td>
                                </tr>

                                <tr className="hover:bg-green-50 transition-colors duration-150 group">
                                  <td className="px-6 py-4 font-medium text-green-800 group-hover:text-green-900">
                                    Food
                                  </td>
                                  <td className="px-6 py-4 text-gray-700">
                                    <ul className="list-disc pl-5 space-y-1">
                                      <li className="text-gray-600">
                                        Agriculture growth
                                      </li>
                                      <li className="text-gray-600">
                                        Agriculture land conversion
                                      </li>
                                      <li className="text-gray-600">
                                        Agriculture productivity
                                      </li>
                                    </ul>
                                  </td>
                                </tr>

                                <tr className="hover:bg-green-50 transition-colors duration-150 group">
                                  <td className="px-6 py-4 font-medium text-green-800 group-hover:text-green-900">
                                    Water
                                  </td>
                                  <td className="px-6 py-4 text-gray-700">
                                    <ul className="list-disc pl-5 space-y-1">
                                      <li className="text-gray-600">
                                        Artificial pond percentage in industrial
                                        area
                                      </li>
                                      <li className="text-gray-600">
                                        Artificial pond percentage in housing
                                        area
                                      </li>
                                      <li className="text-gray-600">
                                        Domestic water demand unit
                                      </li>
                                      <li className="text-gray-600">
                                        Industrial water demand unit
                                      </li>
                                    </ul>
                                  </td>
                                </tr>

                                <tr className="hover:bg-green-50 transition-colors duration-150 group">
                                  <td className="px-6 py-4 font-medium text-green-800 group-hover:text-green-900">
                                    Energy
                                  </td>
                                  <td className="px-6 py-4 text-gray-700">
                                    <ul className="list-disc pl-5 space-y-1">
                                      <li className="text-gray-600">
                                        Solar PV Area Percentage on industrial
                                      </li>
                                      <li className="text-gray-600">
                                        Solar PV Area Percentage on Housing
                                      </li>
                                      <li className="text-gray-600">
                                        Industrial Energy efficiency rate
                                      </li>
                                      <li className="text-gray-600">
                                        Domestic electricity consumption
                                        increase rate
                                      </li>
                                    </ul>
                                  </td>
                                </tr>

                                <tr className="hover:bg-green-50 transition-colors duration-150 group">
                                  <td className="px-6 py-4 font-medium text-green-800 group-hover:text-green-900">
                                    Population
                                  </td>
                                  <td className="px-6 py-4 text-gray-700">
                                    <ul className="list-disc pl-5 space-y-1">
                                      <li className="text-gray-600">
                                        Population growth rate
                                      </li>
                                    </ul>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DSSConceptModal;
