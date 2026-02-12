import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

export default function ContentAbout() {
  const { t } = useTranslation();
  const { about } = t.dssModal;

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-8">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-green-800 mb-6 pb-2 border-b border-green-100"
        >
          {about.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-700 mb-6 leading-relaxed"
        >
          {about.p1}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-700 mb-6 leading-relaxed"
        >
          {about.p2}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-700 mb-6 leading-relaxed"
        >
          {about.p3}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-700 mb-2 leading-relaxed"
        >
          {about.p4}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative mb-8 rounded-xl overflow-hidden border border-gray-200 shadow-md"
        >
          <img
            className="w-full h-auto"
            src={"./assets/concept-diagram.png"}
            alt={about.conceptDiagramAlt}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span className="text-white text-sm">
              {about.conceptFramework}
            </span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-gray-700 mb-8 leading-relaxed"
        >
          {about.p5}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-700 mb-2 leading-relaxed"
        >
          {about.p6}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-6 space-y-4"
        >
          <div className="text-gray-700 leading-relaxed">
            <h3 className="font-bold text-lg mb-1">{about.modules.food.title}</h3>
            <p>
              {about.modules.food.components}
            </p>
            <p>
              {about.modules.food.dependencies}
            </p>
          </div>

          <div className="text-gray-700 leading-relaxed">
            <h3 className="font-bold text-lg mb-1">{about.modules.water.title}</h3>
            <p>
              {about.modules.water.components}
            </p>
            <p>
              {about.modules.water.linkages}
            </p>
          </div>

          <div className="text-gray-700 leading-relaxed">
            <h3 className="font-bold text-lg mb-1">{about.modules.energy.title}</h3>
            <p>
              {about.modules.energy.components}
            </p>
            <p>
              {about.modules.energy.interactions}
            </p>
          </div>

          <div className="text-gray-700 leading-relaxed">
            <h3 className="font-bold text-lg mb-1">{about.modules.economy.title}</h3>
            <p>
              {about.modules.economy.components}
            </p>
            <p>
              {about.modules.economy.interactions}
            </p>
          </div>

          <div className="text-gray-700 leading-relaxed">
            <h3 className="font-bold text-lg mb-1">{about.modules.population.title}</h3>
            <p>
              {about.modules.population.components}
            </p>
            <p>
              {about.modules.population.interactions}
            </p>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-700 mb-2 leading-relaxed"
        >
          {about.p7}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-gray-50 p-6 rounded-xl mb-6 border border-gray-200"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-indigo-500">
                    {about.tableLoops.loop}
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-indigo-500">
                    {about.tableLoops.involvedModule}
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-indigo-500">
                    {about.tableLoops.description}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {about.tableLoops.rows.map((row) => (
                  <tr key={row.id} className="hover:bg-indigo-50 transition-colors duration-150">
                    <td className={`px-6 py-4 font-bold ${row.id === 'R1' ? 'text-red-800' : 'text-indigo-800'}`}>{row.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {row.module}
                    </td>
                    <td className="px-6 py-4 text-gray-600 leading-relaxed">
                      {row.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl font-semibold text-green-800 mb-4 mt-10 pb-2 border-b border-green-100"
        >
          {about.sectoralScopeTitle}
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
                    {about.tableScope.sector}
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-green-500">
                    {about.tableScope.scope}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {about.tableScope.rows.map((row, index) => (
                  <tr key={index} className="hover:bg-green-50 transition-colors duration-150 group">
                    <td className="px-6 py-4 font-medium text-green-800 group-hover:text-green-900">
                      {row.sector}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {Array.isArray(row.scope) ? (
                        <ul className="list-disc pl-5 space-y-1">
                          {row.scope.map((item, i) => (
                            <li key={i} className="text-gray-600">
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        row.scope
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-700 mb-6 leading-relaxed"
        >
          {about.p8}
        </motion.p>
      </div>
    </div>
  );
}
