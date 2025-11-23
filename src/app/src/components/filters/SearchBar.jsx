import React from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
    return (
        <div className="relative mb-4">
            <input
                className="
                    w-full border border-gray-300 rounded-lg
                    pl-8 pr-3 py-1.5
                    text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-400
                "
                placeholder="Pencarian"
                type="text"
            />
            <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={14}
            />
        </div>
    );
}