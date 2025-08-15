import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface ISectionCardProps {
  title: string;
  children: React.ReactNode;
}

const SectionCard = ({ title, children }: ISectionCardProps) => {
  const [openAccordion, setOpenAccordion] = useState<boolean>(false);

  const toggleAccordion = () => {
    setOpenAccordion((current) => !current);
  };

  return (
    <div className=" mr-3 overflow-hidden rounded-lg shadow-md bg-white">
      <button
        onClick={() => toggleAccordion()}
        className="flex justify-between items-center w-full p-4 cursor-pointer bg-gray-50 hover:bg-gray-100"
      >
        <h2 className="text-sm font-semibold text-gray-700">{title}</h2>
        {openAccordion ? <ChevronUp /> : <ChevronDown />}
      </button>
      <div
        className={`${openAccordion ? "max-h-96" : "max-h-0"} overflow-hidden transition-all duration-200`}
      >
        <div className="p-4 space-y-5">{children}</div>
      </div>
    </div>
  );
};

export default SectionCard;
