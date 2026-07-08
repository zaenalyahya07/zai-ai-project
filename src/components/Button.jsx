import { memo } from "react";

function Button({ children, onClick, variant = "primary", type = "button" }) {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-colors";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-700 text-white hover:bg-gray-600",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}

export default memo(Button);
