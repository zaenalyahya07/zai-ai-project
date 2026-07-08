import { memo } from "react";

function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-gray-800 rounded-xl p-4 shadow-md border border-gray-700 ${className}`}
    >
      {children}
    </div>
  );
}

export default memo(Card);
