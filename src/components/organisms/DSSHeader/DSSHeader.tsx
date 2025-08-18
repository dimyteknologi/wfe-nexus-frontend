import { FileUp } from "lucide-react";

interface IDSSHeaderProps {
  isScenarioOpen: boolean;
  handleOpenScenarioTab: () => void;
}

const DSSHeader = ({
  isScenarioOpen,
  handleOpenScenarioTab,
}: IDSSHeaderProps) => {
  return (
    <div className="flex h-[10dvh] justify-between items-center px-8">
      <div>
        <button
          className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-xs sm:text-sm text-white font-bold ${
            isScenarioOpen ? "bg-green-700" : "bg-green-600"
          }`}
          onClick={handleOpenScenarioTab}
        >
          Scenario Menu
        </button>
      </div>
      <div>
        <button className="cursor-not-allowed" disabled>
          <FileUp className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};

export default DSSHeader;
