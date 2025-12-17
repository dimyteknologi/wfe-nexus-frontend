import { motion } from "framer-motion";

const ContentScenarioBuildingContext = () => {
 return (
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
        Scenarios related to demand and supply, for each resource sector,
        include:
      </motion.p>

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
  );
};

export default ContentScenarioBuildingContext;
