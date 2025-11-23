import React from "react";

export default function StatusFilter() {
    return (
        <div className="flex items-center gap-3 mb-4">
            <span className="font-semibold">Status</span>
            <div className="flex bg-gray-200 rounded-full p-1 w-fit">
                <button className="px-4 py-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300">Semua</button>
                <button className="px-4 py-1 rounded-full bg-white text-black">Aktif</button>
                <button className="px-4 py-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300">Non-Aktif</button>
            </div>
        </div>
    );
}