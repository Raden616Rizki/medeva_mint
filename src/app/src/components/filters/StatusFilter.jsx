import React, { useState } from "react";

export default function StatusFilter({ onChange }) {
  const [active, setActive] = useState("all");

  const handleClick = (value) => {
    setActive(value);
    onChange && onChange(value);
  };

  const baseClass =
    "px-3 py-1 text-sm rounded-lg min-w-[90px] text-center transition";

  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-semibold text-sm">Status</span>

      <div className="flex bg-gray-200 rounded-lg p-1 border border-gray-300">
        
        <button
          onClick={() => handleClick("all")}
          className={
            active === "all"
              ? `${baseClass} bg-white text-black font-semibold shadow-sm`
              : `${baseClass} bg-gray-200 text-gray-600 hover:bg-gray-300`
          }
        >
          Semua
        </button>

        <button
          onClick={() => handleClick("active")}
          className={
            active === "active"
              ? `${baseClass} bg-white text-black font-semibold shadow-sm`
              : `${baseClass} bg-gray-200 text-gray-600 hover:bg-gray-300`
          }
        >
          Aktif
        </button>

        <button
          onClick={() => handleClick("inactive")}
          className={
            active === "inactive"
              ? `${baseClass} bg-white text-black font-semibold shadow-sm`
              : `${baseClass} bg-gray-200 text-gray-600 hover:bg-gray-300`
          }
        >
          Non-Aktif
        </button>

      </div>
    </div>
  );
}
