"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeMember, setActiveMember] = useState(0);

  const tabs = [
    { id: 0, title: "ABOUT WEF NEXUS" },
    { id: 1, title: "ABOUT DSS TOOLS" },
    { id: 2, title: "DEVELOPERS" },
  ];

  const teamMembers = [
    {
      name: "Bappenas",
      role: "Directorate of KKSDA",
      contact: "Mr. XYZ (+6221 7888...)",
      logo: "/bappenas-logo.png",
    },
    {
      name: "UNDP Indonesia",
      role: "Development Partner",
      contact: "Mr. XYZ (+6221 7888...)",
      logo: "/undp-logo.png",
    },
    {
      name: "PT ...",
      role: "Web Developer",
      contact: "Mr. XYZ (+6221 7888...)",
      logo: "/dev-logo.png",
    },
  ];

  return (
    <div className="relative opacity-90  pt-24">
      <img
        className="absolute w-full h-full opacity-10 object-cover -z-1"
        src="./assets/image-demo-3.svg"
        alt="background pattern"
      />
      {/* Header Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold text-green-800 mb-6"
          >
            About WEF Nexus DSS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Innovative platform to support integrated decision-making in
            managing water, energy, and food resources
          </motion.p>
        </div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-wrap justify-center mb-12 border-b border-gray-200"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-6 py-3 text-lg font-medium transition-colors ${activeTab === tab.id ? "text-green-800 border-b-2 border-green-800" : "text-gray-500 hover:text-green-700"}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.title}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto">
          {/* WEF Nexus Content */}
          {activeTab === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-green-800 mb-6">
                  Integrated WEF Nexus Approach
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  The Water-Energy-Food (WEF) Nexus is an integrated approach to
                  managing and understanding the interconnectedness between
                  water, energy, and food systems. First discussed at the World
                  Economic Forum (WEF) in 2008 to address future global
                  challenges.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-green-50 p-6 rounded-xl"
                  >
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <svg
                        className="w-8 h-8 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-2">
                      Water Security
                    </h3>
                    <p className="text-gray-600 text-center">
                      The capacity of a population to safeguard sustainable
                      access to adequate quantities of acceptable quality water
                      (UN-Water, 2013)
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-yellow-50 p-6 rounded-xl"
                  >
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <svg
                        className="w-8 h-8 text-yellow-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-2">
                      Energy Security
                    </h3>
                    <p className="text-gray-600 text-center">
                      Uninterrupted availability of energy sources at an
                      affordable price (IEA, 1974)
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-red-50 p-6 rounded-xl"
                  >
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <svg
                        className="w-8 h-8 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-2">
                      Food Security
                    </h3>
                    <p className="text-gray-600 text-center">
                      When all people at all times have physical and economic
                      access to sufficient, safe and nutritious food (The WFS,
                      1996)
                    </p>
                  </motion.div>
                </div>

                <h3 className="text-2xl font-semibold text-green-800 mb-4">
                  Implementation in Indonesia
                </h3>
                <p className="text-lg text-gray-700 mb-6">
                  In Indonesia, this concept is promoted in our long-term and
                  mid-term plans, with emphasis on water, food, and energy
                  sovereignty as a gateway for society&apos;s wellbeing, with a
                  national program to achieve self-sufficiency in Food, Energy,
                  and Water (RPJMN 2025-2029).
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

          {/* DSS Tools Content */}
          {activeTab === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-green-800 mb-6">
                Decision Support System Tools
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                DSS Tools are developed to provide simulations of Water, Energy,
                and Food conditions within an area under a certain timeframe
                with flexibility on different social and economy development
                scenarios. It can be used by different users including central
                and local government, academia, development partners, NGOs, and
                the public.
              </p>

              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-semibold text-green-800 mb-4">
                    Systems Approach
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Using a systems-based approach (Systems Thinking/System
                    Dynamics), the WEF Nexus accommodates the interactions among
                    the water, energy, and food/land sectors, along with various
                    feedback loops formed within the WEF sectors and between
                    socio-economic sectors, to illustrate the complexity of the
                    WEF Nexus.
                  </p>

                  <div className="bg-blue-50 p-5 rounded-xl">
                    <h4 className="text-xl font-semibold mb-3">
                      Key Benefits:
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg
                          className="w-5 h-5 text-blue-600 mt-1 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        <span>Explore various future development pathways</span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="w-5 h-5 text-blue-600 mt-1 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        <span>
                          Illustrate potential synergies and trade-offs within
                          WEF sectors
                        </span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="w-5 h-5 text-blue-600 mt-1 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        <span>
                          Provide input for regional policy formulation
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="md:w-1/2">
                  <div className="bg-green-800 text-white p-6 rounded-xl h-full">
                    <h3 className="text-2xl font-semibold mb-4">
                      Who is this DSS for?
                    </h3>
                    <ul className="space-y-4">
                      {[
                        "Central and Local Government",
                        "Academia and Researchers",
                        "Development Partners",
                        "Non-Governmental Organizations (NGOs)",
                        "General Public",
                      ].map((item, index) => (
                        <li key={index} className="flex items-center">
                          <svg
                            className="w-5 h-5 text-green-300 mr-3"
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
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Developer Content */}
          {activeTab === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-green-800 mb-6">
                Development Team
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Developed through a participatory process involving a diverse
                range of stakeholders—on the government side—including the
                Ministry of National Development Planning (Bappenas), the
                Ministry of Agriculture, the Ministry of Energy and Mineral
                Resources (ESDM), several representatives from local
                governments, and academics; all orchestrated by UNDP Indonesia.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className={`border rounded-xl p-6 cursor-pointer transition-all ${activeMember === index ? "border-green-600 bg-green-50 shadow-md" : "border-gray-200 hover:shadow-md"}`}
                    onClick={() => setActiveMember(index)}
                  >
                    <div className="h-16 w-16 bg-gray-200 rounded-full mb-4 flex items-center justify-center mx-auto">
                      <span className="text-2xl font-bold text-gray-600">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-2">
                      {member.name}
                    </h3>
                    <p className="text-gray-600 text-center mb-4">
                      {member.role}
                    </p>
                    <p className="text-gray-700 text-center">
                      {member.contact}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-2xl font-semibold text-green-800 mb-4">
                  Collaborative Process
                </h3>
                <p className="text-gray-700 mb-4">
                  The development of WEF Nexus DSS involves close collaboration
                  between various institutions to ensure this tool can meet user
                  needs and have a real impact on development planning.
                </p>
                <div className="flex flex-col md:flex-row items-center justify-between mt-6 space-y-4 md:space-y-0">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">
                      Multi-Stakeholder Collaboration
                    </span>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
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
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">
                      Participatory Approach
                    </span>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <svg
                        className="w-5 h-5 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">Iterative Development</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
