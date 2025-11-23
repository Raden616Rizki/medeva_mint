import React from "react";

export default function EmployeeCard({ number, name, roles }) {
  return (
    <div className="bg-white shadow-sm hover:shadow-md transition mb-2 rounded-xl border cursor-pointer p-4 flex items-center justify-between">
      <div className="flex gap-4">
        <span className="text-gray-500 font-semibold w-6">{number}</span>

        <div>
          <p className="text-sm font-bold">{name}</p>
          <p className="text-sm text-gray-500">{roles}</p>

          <span className="text-xs font-semibold bg-green-700 text-white px-2 py-1 rounded mt-1 inline-block">
            Aktif
          </span>
        </div>
      </div>

      <button className="rounded-full w-10 h-10 p-0 bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center">
        →
      </button>
    </div>
  );
}