import React from "react";
import { ArrowRight } from "lucide-react";

export default function EmployeeTable({ employees }) {
  return (
    <div className="overflow-hidden border border-gray-300 rounded-xl mt-4">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr className="text-left text-gray-700">
            <th className="p-3 w-10">#</th>
            <th className="p-3">Karyawan / Tenaga Kesehatan</th>
            <th className="p-3 w-12"></th>
          </tr>
        </thead>

        <tbody>
          {employees?.map((e, index) => (
            <tr key={e.id} className="border-t border-gray-300 hover:bg-gray-50">
              <td className="p-3 font-semibold text-gray-600">{index + 1}</td>

              <td className="p-3">
                <p className="font-bold text-sm">{e.full_name}</p>

                <p className="text-sm text-gray-600">
                  {e.departments.map(d => d.name).join(", ") ?? "-"}
                </p>

                <span className="text-[10px] font-semibold bg-green-700 text-white px-2 py-0.5 rounded-md inline-block mt-1">
                  Aktif
                </span>
              </td>

              <td className="p-3 text-right">
                <button className="rounded-full w-7 h-7 bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center">
                  <ArrowRight size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}