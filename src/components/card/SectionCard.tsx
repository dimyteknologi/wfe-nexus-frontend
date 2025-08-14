interface ISectionCardProps {
  title: string;
  children: React.ReactNode;
}

const SectionCard = ({ title, children }: ISectionCardProps) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-100">
    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
      {title}
    </h3>
    <div className="space-y-5">{children}</div>
  </div>
);

export default SectionCard;
