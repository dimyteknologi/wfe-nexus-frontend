import { motion } from "framer-motion";
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

const ContentAboutContext = () => {
  const { t } = useTranslation();
  const { aboutContext } = t.dssModal;

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-8">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-green-800 mb-6 pb-2 border-b border-green-100"
        >
          {aboutContext.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-700 mb-6 leading-relaxed"
        >
          {aboutContext.p1}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-700 mb-6 leading-relaxed"
        >
          {aboutContext.p2}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-700 mb-6 leading-relaxed"
        >
          {aboutContext.p3}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-700 mb-2 leading-relaxed"
        >
          {aboutContext.conceptTitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative mb-8 rounded-xl overflow-hidden border border-gray-200 shadow-md"
        >
          <img
            className="w-full h-auto"
            src={"./assets/context-concept-diagram.png"}
            alt={aboutContext.conceptDiagramAlt}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span className="text-white text-sm">
              {aboutContext.conceptFramework}
            </span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-700 mb-2 leading-relaxed"
        >
         {aboutContext.scopeIntro}
        </motion.p>

       <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl font-semibold text-green-800 mb-4 mt-10 pb-2 border-b border-green-100"
        >
          {aboutContext.sectoralScopeTitle}
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
                    {aboutContext.table.sector}
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-green-500">
                     {aboutContext.table.scope}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* Agriculture */}
                <tr className="hover:bg-green-50 transition-colors duration-150 group">
                  <td className="px-6 py-4 font-medium text-green-800 group-hover:text-green-900 align-top">
                     {aboutContext.table.agriculture.name}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <ul className="list-disc pl-5 space-y-1">
                       {aboutContext.table.agriculture.items.map((item, i) => (
                          <li key={i} className="text-gray-600">{item}</li>
                       ))}
                    </ul>
                  </td>
                </tr>

                {/* Demography */}
                <tr className="hover:bg-green-50 transition-colors duration-150 group">
                  <td className="px-6 py-4 font-medium text-green-800 group-hover:text-green-900 align-top">
                    {aboutContext.table.demography.name}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <ul className="list-disc pl-5 space-y-1">
                       {aboutContext.table.demography.items.map((item, i) => (
                          <li key={i} className="text-gray-600">{item}</li>
                       ))}
                    </ul>
                  </td>
                </tr>

                {/* Water */}
                <tr className="hover:bg-green-50 transition-colors duration-150 group">
                  <td className="px-6 py-4 font-medium text-green-800 group-hover:text-green-900 align-top">
                    {aboutContext.table.water.name}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <ul className="list-disc pl-5 space-y-1">
                      <li className="text-gray-600">
                         {aboutContext.table.water.general}
                      </li>
                      <li className="text-gray-600">
                        <span className="font-medium">{aboutContext.table.water.demand}</span>
                        <ul className="list-[circle] pl-5 mt-1 space-y-1">
                           {aboutContext.table.water.demandItems.map((item, i) => (
                              <li key={i}>{item}</li>
                           ))}
                        </ul>
                      </li>
                      <li className="text-gray-600">
                        <span className="font-medium">{aboutContext.table.water.supply}</span>
                        <ul className="list-[circle] pl-5 mt-1 space-y-1">
                           {aboutContext.table.water.supplyItems.map((item, i) => (
                              <li key={i}>{item}</li>
                           ))}
                        </ul>
                      </li>
                    </ul>
                  </td>
                </tr>

                {/* Energy */}
                <tr className="hover:bg-green-50 transition-colors duration-150 group">
                  <td className="px-6 py-4 font-medium text-green-800 group-hover:text-green-900 align-top">
                    {aboutContext.table.energy.name}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <ul className="list-disc pl-5 space-y-1">
                      <li className="text-gray-600">
                         {aboutContext.table.energy.general}
                      </li>
                      <li className="text-gray-600">
                        <span className="font-medium">{aboutContext.table.energy.demand}</span>
                        <ul className="list-[circle] pl-5 mt-1 space-y-1">
                           {aboutContext.table.energy.demandItems.map((item, i) => (
                              <li key={i}>{item}</li>
                           ))}
                        </ul>
                      </li>
                      <li className="text-gray-600">
                        <span className="font-medium">{aboutContext.table.energy.supply}</span>
                        <ul className="list-[circle] pl-5 mt-1 space-y-1">
                           {aboutContext.table.energy.supplyItems.map((item, i) => (
                              <li key={i}>{item}</li>
                           ))}
                        </ul>
                      </li>
                    </ul>
                  </td>
                </tr>

                {/* Food */}
                <tr className="hover:bg-green-50 transition-colors duration-150 group">
                  <td className="px-6 py-4 font-medium text-green-800 group-hover:text-green-900 align-top">
                    {aboutContext.table.food.name}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <ul className="list-disc pl-5 space-y-1">
                      <li className="text-gray-600">
                         {aboutContext.table.food.general}
                      </li>
                      <li className="text-gray-600">
                        <span className="font-medium">{aboutContext.table.food.demand}</span>
                        <ul className="list-[circle] pl-5 mt-1 space-y-1">
                           {aboutContext.table.food.demandItems.map((item, i) => (
                              <li key={i}>{item}</li>
                           ))}
                        </ul>
                      </li>
                      <li className="text-gray-600">
                        <span className="font-medium">{aboutContext.table.food.supply}</span>
                        <ul className="list-[circle] pl-5 mt-1 space-y-1">
                           {aboutContext.table.food.supplyItems.map((item, i) => (
                              <li key={i}>{item}</li>
                           ))}
                        </ul>
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContentAboutContext;
