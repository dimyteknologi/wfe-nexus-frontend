import { motion } from "framer-motion";
import React from "react";

const ContentAboutContext = () => {
 return (
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
          The Decision Support System (DSS) Tool is developed using an
          interlinkages-based approach, emphasizing the interconnections among
          the water–energy–food sectors for agricultural areas characterized by
          abundant surface water resources, challenges in water transportation,
          the availability of renewable energy sources (RES) such as solar
          energy for micro-scale applications, and geothermal energy for
          regional power generation. These resources are sourced from the
          Samosir and Ulubelu areas in Lampung.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-700 mb-6 leading-relaxed"
        >
          In a specific context, users can define agricultural land area, solar
          power plant capacity, and geothermal power plant capacity as the main
          input variables that determine agricultural performance and
          microeconomic outcomes. Solar power generation reduces reliance on
          fossil fuel–based water pumps, while geothermal energy contributes to
          reducing energy consumption for post-harvest drying processes. Both
          interventions directly affect farmers’ income and profit performance.
          In addition, the financial sustainability of operating solar power
          plants is also considered, in order to assess the extent to which
          local communities or regions are capable of managing the long-term
          operation of solar power plants and water pumping systems.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-700 mb-6 leading-relaxed"
        >
          Using a systems thinking perspective and a system dynamics modeling
          approach (Forrester, 1961; Vennix, 1996; Senge, 2000; Sterman, 2000;
          Morecroft, 2015), the DSS Tool is designed to illustrate the impacts
          of demand scenarios in the agricultural sector (particularly rice
          farming), as well as in the water and energy resource sectors. The
          energy sector includes geothermal and solar photovoltaic (PV) systems
          for agricultural water pumping, while the water sector includes
          surface water and transported water supplied through fossil fuel–based
          pumps and solar PV–based pumps.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-700 mb-2 leading-relaxed"
        >
          The conceptual framework of sectoral interlinkages within the DSS Tool
          is illustrated as follows:
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
            alt="DSS Conceptual Framework"
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
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-700 mb-2 leading-relaxed"
        >
          The DSS concept is developed at the micro level by considering local agricultural dynamics and characteristics (productivity, land, and practical management), water resources (surface water and groundwater), and energy sources (fossil-based and renewable), within the following scope:
        </motion.p>

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
                {/* Agriculture */}
                <tr className="hover:bg-green-50 transition-colors duration-150 group">
                  <td className="px-6 py-4 font-medium text-green-800 group-hover:text-green-900 align-top">
                    Agriculture
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <ul className="list-disc pl-5 space-y-1">
                      <li className="text-gray-600">Area</li>
                      <li className="text-gray-600">Productivity</li>
                      <li className="text-gray-600">Production</li>
                    </ul>
                  </td>
                </tr>

                {/* Demography */}
                <tr className="hover:bg-green-50 transition-colors duration-150 group">
                  <td className="px-6 py-4 font-medium text-green-800 group-hover:text-green-900 align-top">
                    Demography
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <ul className="list-disc pl-5 space-y-1">
                      <li className="text-gray-600">Total Population</li>
                      <li className="text-gray-600">Rice demand</li>
                    </ul>
                  </td>
                </tr>

                {/* Water */}
                <tr className="hover:bg-green-50 transition-colors duration-150 group">
                  <td className="px-6 py-4 font-medium text-green-800 group-hover:text-green-900 align-top">
                    Water
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <ul className="list-disc pl-5 space-y-1">
                      <li className="text-gray-600">
                        <span className="font-medium">General:</span> Total
                        calculation of local water demand and supply
                      </li>
                      <li className="text-gray-600">
                        <span className="font-medium">Demand:</span>
                        <ul className="list-[circle] pl-5 mt-1 space-y-1">
                          <li>Agriculture demand</li>
                          <li>Agricultural demand</li>
                          <li>
                            Geothermal demand (applied only when using surface
                            water)
                          </li>
                        </ul>
                      </li>
                      <li className="text-gray-600">
                        <span className="font-medium">Supply:</span>
                        <ul className="list-[circle] pl-5 mt-1 space-y-1">
                          <li>Rainfall water</li>
                          <li>
                            Transported water using pumps (fossil fuel–based or
                            solar PV–based)
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </td>
                </tr>

                {/* Energy */}
                <tr className="hover:bg-green-50 transition-colors duration-150 group">
                  <td className="px-6 py-4 font-medium text-green-800 group-hover:text-green-900 align-top">
                    Energy
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <ul className="list-disc pl-5 space-y-1">
                      <li className="text-gray-600">
                        <span className="font-medium">General:</span> Limited to
                        agriculture purposes
                      </li>
                      <li className="text-gray-600">
                        <span className="font-medium">Demand:</span>
                        <ul className="list-[circle] pl-5 mt-1 space-y-1">
                          <li>Agriculture demand</li>
                        </ul>
                      </li>
                      <li className="text-gray-600">
                        <span className="font-medium">Supply:</span>
                        <ul className="list-[circle] pl-5 mt-1 space-y-1">
                          <li>Fossil fuel supply</li>
                          <li>Solar PV</li>
                          <li>Excess steam from geothermal</li>
                        </ul>
                      </li>
                    </ul>
                  </td>
                </tr>

                {/* Food */}
                <tr className="hover:bg-green-50 transition-colors duration-150 group">
                  <td className="px-6 py-4 font-medium text-green-800 group-hover:text-green-900 align-top">
                    Food
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <ul className="list-disc pl-5 space-y-1">
                      <li className="text-gray-600">
                        <span className="font-medium">General:</span> Rice only
                      </li>
                      <li className="text-gray-600">
                        <span className="font-medium">Demand:</span>
                        <ul className="list-[circle] pl-5 mt-1 space-y-1">
                          <li>Domestic demand</li>
                        </ul>
                      </li>
                      <li className="text-gray-600">
                        <span className="font-medium">Supply:</span>
                        <ul className="list-[circle] pl-5 mt-1 space-y-1">
                          <li>Local production</li>
                          <li>Production surplus or deficit</li>
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
