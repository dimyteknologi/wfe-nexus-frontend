"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Droplet, Zap, Leaf, Check, ChevronRight, CheckCircle } from "lucide-react";
import SecurityCard from "@/components/molecules/SecurityCard";
import Badge from "@/components/atoms/Badge";
import { useTranslation } from "@/hooks/useTranslation";

const AboutPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const [activeMember, setActiveMember] = useState(0);

  const tabs = [
    { id: 0, title: t.about.tabs.nexus },
    { id: 1, title: t.about.tabs.dss },
    { id: 2, title: t.about.tabs.developers },
  ];

  const teamMembers = [
    {
      name: "Bappenas",
      role: "Directorate of KKSDA",
      contact: "Mr. XYZ (+6221 7888...)",
      logo: "/bappenas-logo.png",
    },
    {
      name: "UK International Development",
      role: "Development Partner",
      contact: "Mr. XYZ (+6221 7888...)",
      logo: "/undp-logo.png",
    },
    {
      name: "UNDP Indonesia",
      role: "Web Developer",
      contact: "Mr. XYZ (+6221 7888...)",
      logo: "/dev-logo.png",
    },
  ];

  const securityTypes = [
    {
      icon: <Droplet className="w-8 h-8" />,
      title: t.about.nexusTab.waterSecurity.title,
      description: t.about.nexusTab.waterSecurity.description,
      bgColor: "bg-blue-50",
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: t.about.nexusTab.energySecurity.title,
      description: t.about.nexusTab.energySecurity.description,
      bgColor: "bg-yellow-50",
      iconBgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: t.about.nexusTab.foodSecurity.title,
      description: t.about.nexusTab.foodSecurity.description,
      bgColor: "bg-red-50",
      iconBgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="relative opacity-90 pt-24">
      <Image
        className="absolute w-full h-full opacity-10 object-cover -z-1"
        src="./assets/image-demo-3.svg"
        alt="background pattern"
        fill
      />

      <section className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="success" className="mb-4">{t.about.header.badge}</Badge>
            <h1 className="text-5xl font-bold text-green-700 mb-6">
              {t.about.header.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t.about.header.subtitle}
            </p>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap justify-center mb-12 border-b border-gray-200"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-6 py-3 text-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "text-green-700 border-b-2 border-green-700"
                  : "text-gray-500 hover:text-green-600"
              }`}
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
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-green-700 mb-6">
                  {t.about.nexusTab.title}
                </h2>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  {t.about.nexusTab.intro}
                  managing and understanding the interconnectedness between
                  water, energy, and food systems. First discussed at the World
                  Economic Forum (WEF) in 2008 to address future global
                  challenges.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {securityTypes.map((type, index) => (
                    <SecurityCard key={index} {...type} />
                  ))}
                </div>

                <h3 className="text-2xl font-semibold text-green-700 mb-4">
                  {t.about.nexusTab.implementationTitle}
                </h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  {t.about.nexusTab.implementationText}
                </p>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="text-xl font-semibold mb-4 text-green-700">
                    {t.about.nexusTab.indicatorsTitle}
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {t.about.nexusTab.indicators.map((indicator: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-green-600 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{indicator}</span>
                      </div>
                    ))}
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
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-green-700 mb-6">
                {t.about.dssTab.title}
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {t.about.dssTab.intro}
              </p>

              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-semibold text-green-700 mb-4">
                    {t.about.dssTab.systemsTitle}
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {t.about.dssTab.systemsText}
                  </p>

                  <div className="bg-blue-50 p-5 rounded-xl">
                    <h4 className="text-xl font-semibold mb-3 text-blue-900">
                      {t.about.dssTab.benefitsTitle}
                    </h4>
                    <ul className="space-y-3">
                      {t.about.dssTab.benefits.map((benefit: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="md:w-1/2">
                  <div className="bg-green-700 text-white p-6 rounded-xl h-full">
                    <h3 className="text-2xl font-semibold mb-4">
                      {t.about.dssTab.usersTitle}
                    </h3>
                    <ul className="space-y-4">
                      {t.about.dssTab.users.map((user: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <Check className="w-5 h-5 text-green-300 mr-3 flex-shrink-0" />
                          <span>{user}</span>
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
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-green-700 mb-6">
                {t.about.developersTab.title}
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {t.about.developersTab.intro}
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className={`border rounded-xl p-6 cursor-pointer transition-all ${
                      activeMember === index
                        ? "border-green-600 bg-green-50 shadow-md"
                        : "border-gray-200 hover:shadow-md"
                    }`}
                    onClick={() => setActiveMember(index)}
                  >
                    <div className="h-16 w-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-4 flex items-center justify-center mx-auto shadow-md">
                      <span className="text-2xl font-bold text-white">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-2">
                      {member.name}
                    </h3>
                    <p className="text-gray-600 text-center mb-2 text-sm">
                      {member.role}
                    </p>
                    <p className="text-gray-500 text-center text-xs">
                      {member.contact}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-2xl font-semibold text-green-700 mb-4">
                  {t.about.developersTab.collaborativeTitle}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {t.about.developersTab.collaborativeText}
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  {t.about.developersTab.processItems.map((item: string, index: number) => (
                    <div key={index} className="flex items-center text-green-700 font-medium">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mt-8">
                <p className="text-lg text-gray-600 mb-6">
                  {t.about.developersTab.partnershipText}
                </p>
                <div className="flex justify-center items-center space-x-8">
                  <div className="w-24 h-24 relative opacity-80 hover:opacity-100 transition-opacity">
                    <Image
                      src="/assets/logo-bappenas.svg"
                      alt="Logo Bappenas"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="w-32 h-24 relative opacity-80 hover:opacity-100 transition-opacity">
                    <Image
                      src="/assets/logo-ukaid.webp"
                      alt="Logo UKAid"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="w-16 h-24 relative opacity-80 hover:opacity-100 transition-opacity">
                    <Image
                      src="/assets/logo-undp.svg"
                      alt="Logo UNDP"
                      fill
                      className="object-contain"
                    />
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
