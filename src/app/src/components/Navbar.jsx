import React from "react";
import { FiBell, FiUser, FiActivity } from "react-icons/fi";

export default function Navbar() {
    return (
        <nav className="w-full h-16 bg-white shadow-md flex items-center justify-between px-6 fixed top-0 left-0 z-50">
            <div className="flex items-center gap-4">
                <span className="text-gray-800 font-semibold text-lg">Klinik Rohima</span>
            </div>

            <div className="flex items-center gap-3">
                <FiActivity className="text-teal-400 w-6 h-6" />

                <div className="w-px h-6 bg-teal-300"></div>

                <span className="text-lg font-normal">
                    <span className="text-gray-600">Medeva</span>{" "}
                    <span className="text-teal-400">Mint</span>
                </span>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative cursor-pointer">
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow">
                        113
                    </span>
                    <FiBell className="w-6 h-6 text-gray-600 hover:text-gray-800 transition" />
                </div>

                <div className="text-right leading-tight">
                    <p className="text-gray-800 font-semibold text-sm">Klinik Rohima</p>
                    <p className="text-gray-500 text-xs">(Purchasing, Manager)</p>
                </div>

                <div className="w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer bg-gray-100 hover:bg-gray-200 transition">
                    <FiUser className="w-5 h-5 text-gray-600" />
                </div>

            </div>
        </nav>
    );
}