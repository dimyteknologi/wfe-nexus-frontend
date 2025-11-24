import { motion } from "framer-motion";

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

export default function ContentRelatedAssumption() {
  return (
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
        Several assumptions related to resource needs (water, energy, food)
        within a region include:
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
  );
}
