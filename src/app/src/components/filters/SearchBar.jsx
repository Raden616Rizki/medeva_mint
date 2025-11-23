import React from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
    return (
        <div className="relative mb-4">
            <input
                className="w-full border border-gray-300 rounded-lg p-2 pl-10"
                placeholder="Pencarian"
                type="text"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={18} />
        </div>
    );
}