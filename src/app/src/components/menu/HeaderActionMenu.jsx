import React, { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Plus } from "lucide-react";

export default function HeaderActionMenu({ onAdd }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setOpen(!open)}
                className="w-8 h-6 rounded bg-gray-100 border border-gray-300 flex items-center justify-center hover:bg-gray-200"
            >
                <MoreHorizontal size={20} />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50">
                    <button
                        onClick={onAdd}
                        className="w-full flex items-center gap-2 text-gray-700 hover:text-black py-1 px-2 rounded-md"
                    >
                        <Plus size={16} />
                        <span className="text-sm">Tambah Karyawan</span>
                    </button>
                </div>
            )}
        </div>
    );
}
