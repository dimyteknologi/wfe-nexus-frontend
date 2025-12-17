import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import ContentAboutContext from "./contentAboutContext"; // Import to reuse ContentAboutContext logic if needed, but here we just render table manually or partial re-use? 
// The original code duplicated the table structure manually.
// To keep it simple and safe, I will just render the table manually referencing the About Context Table in the dictionary if possible, OR just re-render the components.

// Wait, the dictionary keys for scenarioBuildingContext table are "See About Table".
// In the original file, it was just a manual copy-paste of a similar table.
// However, the content was actually slightly different or subset?
// Checking the original file: It had "Agriculture", "Demography", "Water", "Energy", "Food" rows.
// This is exactly the same as the "Sectoral Scope and Boundaries" table in About Context.
// So I can reuse the data from `t.dssModal.aboutContext.table`.

const ContentScenarioBuildingContext = () => {
 const { t } = useTranslation();
 const { scenarioBuildingContext, aboutContext } = t.dssModal;

 // Use aboutContext table data
 const tableData = aboutContext.table;

 return (
    <div className="bg-white rounded-2xl p-8">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-green-800 mb-6 pb-2 border-b border-green-100"
      >
        {scenarioBuildingContext.title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-lg text-gray-700 mb-8 leading-relaxed"
      >
        {scenarioBuildingContext.intro}
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
                  {tableData.sector}
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-green-500">
                  {tableData.scope}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Agriculture */}
              <tr className="hover:bg-green-50 transition-colors duration-150 group">
                <td className="px-6 py-4 font-medium text-green-800 group-hover:text-green-900 align-top">
                  {tableData.agriculture.name}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  <ul className="list-disc pl-5 space-y-1">
                     {tableData.agriculture.items.map((item, i) => (
                        <li key={i} className="text-gray-600">{item}</li>
                     ))}
                  </ul>
                </td>
              </tr>

              {/* Demography */}
              <tr className="hover:bg-green-50 transition-colors duration-150 group">
                <td className="px-6 py-4 font-medium text-green-800 group-hover:text-green-900 align-top">
                  {tableData.demography.name}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  <ul className="list-disc pl-5 space-y-1">
                     {tableData.demography.items.map((item, i) => (
                        <li key={i} className="text-gray-600">{item}</li>
                     ))}
                  </ul>
                </td>
              </tr>

              {/* Water */}
              <tr className="hover:bg-green-50 transition-colors duration-150 group">
                <td className="px-6 py-4 font-medium text-green-800 group-hover:text-green-900 align-top">
                  {tableData.water.name}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li className="text-gray-600">
                       {tableData.water.general}
                    </li>
                    <li className="text-gray-600">
                      <span className="font-medium">{tableData.water.demand}</span>
                      <ul className="list-[circle] pl-5 mt-1 space-y-1">
                         {tableData.water.demandItems.map((item, i) => (
                            <li key={i}>{item}</li>
                         ))}
                      </ul>
                    </li>
                    <li className="text-gray-600">
                      <span className="font-medium">{tableData.water.supply}</span>
                      <ul className="list-[circle] pl-5 mt-1 space-y-1">
                         {tableData.water.supplyItems.map((item, i) => (
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
                  {tableData.energy.name}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li className="text-gray-600">
                       {tableData.energy.general}
                    </li>
                    <li className="text-gray-600">
                      <span className="font-medium">{tableData.energy.demand}</span>
                      <ul className="list-[circle] pl-5 mt-1 space-y-1">
                         {tableData.energy.demandItems.map((item, i) => (
                            <li key={i}>{item}</li>
                         ))}
                      </ul>
                    </li>
                    <li className="text-gray-600">
                      <span className="font-medium">{tableData.energy.supply}</span>
                      <ul className="list-[circle] pl-5 mt-1 space-y-1">
                         {tableData.energy.supplyItems.map((item, i) => (
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
                  {tableData.food.name}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li className="text-gray-600">
                       {tableData.food.general}
                    </li>
                    <li className="text-gray-600">
                      <span className="font-medium">{tableData.food.demand}</span>
                      <ul className="list-[circle] pl-5 mt-1 space-y-1">
                         {tableData.food.demandItems.map((item, i) => (
                            <li key={i}>{item}</li>
                         ))}
                      </ul>
                    </li>
                    <li className="text-gray-600">
                      <span className="font-medium">{tableData.food.supply}</span>
                      <ul className="list-[circle] pl-5 mt-1 space-y-1">
                         {tableData.food.supplyItems.map((item, i) => (
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
  );
};

export default ContentScenarioBuildingContext;
