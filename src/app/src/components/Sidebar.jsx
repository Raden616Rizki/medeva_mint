import React, { useState } from "react";
import { FiUser, FiUsers } from "react-icons/fi";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <aside className="w-48 bg-white fixed top-16 left-0 h-[calc(100vh-64px)] px-2 py-4 shadow-sm">
      
      <div
        onClick={() => toggleMenu("employee")}
        className={`flex items-center gap-3 cursor-pointer p-3 rounded-md relative 
          hover:bg-gray-100 transition
          ${openMenu === "employee" ? "text-[#26BAE8] font-medium" : "text-gray-600 font-medium"}`}
      >
        {openMenu === "employee" && (
          <span className="absolute left-0 top-0 h-full w-[3px] bg-[#26BAE8] rounded-r"></span>
        )}

        <FiUser className="text-xl" />
        <span className="text-sm">Karyawan</span>
      </div>

      {openMenu === "employee" && (
        <div className="ml-8 mt-1 space-y-2">
          <div className="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-[#26BAE8] transition">
            <FiUsers className="text-sm" />
            <span className="text-sm">Daftar Karyawan</span>
          </div>
        </div>
      )}
    </aside>
  );
}