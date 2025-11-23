import React from "react";


export default function Pagination() {
    return (
        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
            <span>10 | baris</span>
            <div className="flex gap-2">
                <button className="px-3 py-1 rounded bg-gray-200">1</button>
                <button className="px-3 py-1 rounded bg-gray-200">2</button>
                <button className="px-3 py-1 rounded bg-gray-200">3</button>
            </div>
        </div>
    );
}