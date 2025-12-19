import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

const ContentScenarioBuildingContext = () => {
 const { t } = useTranslation();
 const { scenarioBuildingContext, scenarioBuilding } = t.dssModal;

 const tableData = scenarioBuildingContext.table;

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
              {tableData.rows.map((row: any, index: number) => (
                <tr key={index} className="hover:bg-green-50 transition-colors duration-150 group">
                  <td className="px-6 py-4 font-medium text-green-800 group-hover:text-green-900 align-top">
                    {row.sector}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <ul className="list-disc pl-5 space-y-1">
                      {row.items.map((item: string, i: number) => (
                        <li key={i} className="text-gray-600">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default ContentScenarioBuildingContext;
