import React from "react";

export default function DepartmentFilter({ departments, selected, onChange }) {
  return (
    <div className="mb-4">
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Semua Departemen</option>

        {departments.map((dept, i) => (
          <option key={i} value={dept}>
            {dept}
          </option>
        ))}
      </select>
    </div>
  );
}
