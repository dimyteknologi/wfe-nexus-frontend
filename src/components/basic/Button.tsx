"use client";

interface IButtonProps {
  title: string;
  hasErrors: boolean;
  onClick: () => void;
}

const Button = ({ hasErrors, onClick, title }: IButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={hasErrors}
      className={`px-6 py-3 rounded-xl font-medium transition-colors ${
        hasErrors
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-green-600 hover:bg-green-700 text-white"
      }`}
    >
      {title}
    </button>
  );
};

export default Button;
