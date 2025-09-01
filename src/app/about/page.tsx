"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeMember, setActiveMember] = useState(0);

  const tabs = [
    { id: 0, title: "TENTANG WEF NEXUS" },
    { id: 1, title: "TENTANG ALAT DSS" },
    { id: 2, title: "PENGEMBANG" },
  ];

  const teamMembers = [
    {
      name: "Bappenas",
      role: "Direktorat KKSDA",
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
      name: "PT Dimmy Technology",
      role: "Web Developer",
      contact: "Mr. XYZ (+6221 7888...)",
      logo: "/dev-logo.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24">
      {/* Header Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-green-800 mb-6">
            Tentang WEF Nexus DSS
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Platform inovatif untuk mendukung pengambilan keputusan terintegrasi
            dalam mengelola sumber daya air, energi, dan pangan
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-12 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-6 py-3 text-lg font-medium transition-colors ${activeTab === tab.id ? "text-green-800 border-b-2 border-green-800" : "text-gray-500 hover:text-green-700"}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.title}
            </button>
          ))}
        </div>

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
                  Pendekatan Terintegrasi WEF Nexus
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  Water-Energy-Food (WEF) Nexus adalah pendekatan terintegrasi
                  untuk memahami dan mengelola keterkaitan antara sistem air,
                  energi, dan pangan. Konsep ini pertama kali dibahas dalam
                  World Economic Forum (WEF) pada tahun 2008 untuk mengatasi
                  tantangan masa depan di dunia global.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-green-50 p-6 rounded-xl">
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
                      Kapasitas populasi untuk menjaga akses berkelanjutan
                      terhadap air dalam kuantitas yang memadai dan kualitas
                      yang dapat diterima (UN-Water, 2013)
                    </p>
                  </div>

                  <div className="bg-yellow-50 p-6 rounded-xl">
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
                      Ketersediaan energi yang tidak terputus dengan harga yang
                      terjangkau (IEA, 1974)
                    </p>
                  </div>

                  <div className="bg-red-50 p-6 rounded-xl">
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
                      Ketika semua orang setiap saat memiliki akses fisik dan
                      ekonomi terhadap pangan yang cukup, aman, dan bergizi (The
                      WFS, 1996)
                    </p>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-green-800 mb-4">
                  Implementasi di Indonesia
                </h3>
                <p className="text-lg text-gray-700 mb-6">
                  Di Indonesia, konsep ini dipromosikan dalam rencana jangka
                  panjang dan menengah, dengan penekanan pada kedaulatan air,
                  pangan, dan energi sebagai pintu gerbang kesejahteraan
                  masyarakat, dengan program nasional untuk mencapai swasembada
                  Pangan, Energi, dan Air (RPJMN 2025-2029).
                </p>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="text-xl font-semibold mb-4">
                    Indikator Utama:
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
                        <span>Indeks ketahanan pangan</span>
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
                        <span>Pertumbuhan PDB pertanian</span>
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
                        <span>Indeks ketahanan air</span>
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
                        <span>Kapasitas penyimpanan air</span>
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
                        <span>Akses air minum rumah tangga perkotaan</span>
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
                        <span>Indeks kualitas air</span>
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
                DSS Tools dikembangkan untuk memberikan simulasi mengenai
                kondisi Air, Energi, dan Pangan dalam suatu wilayah dalam
                kerangka waktu tertentu dengan fleksibilitas pada skenario
                pembangunan sosial dan ekonomi yang berbeda. Dapat digunakan
                untuk berbagai pengguna termasuk pemerintah pusat dan daerah,
                akademisi, mitra pembangunan, LSM, dan masyarakat itu sendiri.
              </p>

              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-semibold text-green-800 mb-4">
                    Pendekatan Sistem
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Dengan menggunakan pendekatan berbasis sistem (Systems
                    Thinking/System Dynamics), WEF Nexus mengakomodasi interaksi
                    antara sektor air, energi, dan pangan/lahan, bersama dengan
                    berbagai loop umpan balik yang terbentuk dalam sektor WEF
                    dan antara sektor sosial-ekonomi, untuk menggambarkan
                    kompleksitas WEF Nexus.
                  </p>

                  <div className="bg-blue-50 p-5 rounded-xl">
                    <h4 className="text-xl font-semibold mb-3">
                      Manfaat Utama:
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
                        <span>
                          Eksplorasi berbagai jalur pembangunan masa depan
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
                          Menggambarkan sinergi dan trade-off dalam sektor WEF
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
                        <span>Masukan untuk formulasi kebijakan regional</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="md:w-1/2">
                  <div className="bg-green-800 text-white p-6 rounded-xl h-full">
                    <h3 className="text-2xl font-semibold mb-4">
                      Untuk Siapa DSS Ini?
                    </h3>
                    <ul className="space-y-4">
                      {[
                        "Pemerintah Pusat dan Daerah",
                        "Akademisi dan Peneliti",
                        "Mitra Pembangunan",
                        "Lembaga Swadaya Masyarakat (LSM)",
                        "Masyarakat Umum",
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
                Tim Pengembang
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Dikembangkan melalui proses partisipatif yang melibatkan
                berbagai pemangku kepentingan—di pihak pemerintah—termasuk
                Kementerian PPN/Bappenas, Kementerian Pertanian, Kementerian
                ESDM, beberapa perwakilan pemerintah daerah, dan akademisi;
                semua dikoordinasi oleh UNDP Indonesia.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
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
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-2xl font-semibold text-green-800 mb-4">
                  Proses Kolaboratif
                </h3>
                <p className="text-gray-700 mb-4">
                  Pengembangan WEF Nexus DSS melibatkan kolaborasi erat antara
                  berbagai institusi untuk memastikan alat ini dapat memenuhi
                  kebutuhan pengguna dan memberikan dampak nyata dalam
                  perencanaan pembangunan.
                </p>
                <div className="flex items-center justify-between mt-6">
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
                      Kolaborasi Multi-Pihak
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
                      Pendekatan Partisipatif
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
                    <span className="text-gray-700">Pengembangan Iteratif</span>
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
