import React from "react";

export default function PositionFilter({ departments, selected, onChange }) {
  return (
    <div className="mb-4 relative">
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full border border-gray-300 rounded-lg py-1.5 pl-3
          bg-white shadow-sm 
          focus:outline-none focus:ring-2 focus:ring-blue-400
          text-sm
        "
      >
        <option value="">Semua Posisi</option>

        {departments.map((dept, i) => (
          <option key={i} value={dept}>
            {dept}
          </option>
        ))}
      </select>
    </div>
  );
}
