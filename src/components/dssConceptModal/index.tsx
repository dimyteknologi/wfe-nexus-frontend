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
  // Download,
  // ArrowRight,
} from "lucide-react";
import ContentAbout from "./contentAbout";
import ContentRelatedAssumption from "./contentRelatedAssumtion";
import ContentScenarioBuilding from "./contentScenarioBuilding";

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
                    {activeTab === 0 && <ContentAbout />}

                    {activeTab === 1 && <ContentRelatedAssumption />}

                    {activeTab === 2 && <ContentScenarioBuilding />}
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
