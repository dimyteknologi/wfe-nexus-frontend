import { motion } from "framer-motion";

export default function ContentScenarioBuilding() {
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
                    <li className="text-gray-600">Industrial growth</li>
                  </ul>
                </td>
              </tr>

              <tr className="hover:bg-green-50 transition-colors duration-150 group">
                <td className="px-6 py-4 font-medium text-green-800 group-hover:text-green-900">
                  Food
                </td>
                <td className="px-6 py-4 text-gray-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li className="text-gray-600">Agriculture growth</li>
                    <li className="text-gray-600">
                      Agriculture land conversion
                    </li>
                    <li className="text-gray-600">Agriculture productivity</li>
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
                      Artificial pond percentage in industrial area
                    </li>
                    <li className="text-gray-600">
                      Artificial pond percentage in housing area
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
                      Domestic electricity consumption increase rate
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
                    <li className="text-gray-600">Population growth rate</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
