import React, { useState } from "react";
import StatusFilter from "../components/filters/StatusFilter";
import DepartmentFilter from "../components/filters/DepartmentFilter";
import PositionFilter from "../components/filters/PositionFilter";
import SearchBar from "../components/filters/SearchBar";
import EmployeeTable from "../components/table/EmployeeTable";
import Pagination from "../components/pagination/Pagination";
import HeaderActionMenu from "../components/menu/HeaderActionMenu";
import EmployeeFormModal from "../components/modal/EmployeeFormModal";

export default function DashboardContent() {
    const employees = [
        { number: 1, name: "FATIMAH ZAHROUN NIKMAH", roles: "Purchasing, Manager" },
        { number: 2, name: "dr. Galih Satryo Hutomo", roles: "Dokter, Purchasing" },
        { number: 3, name: "DWI DARA CAHAYANI ,S.FARM. APT", roles: "Purchasing" },
        { number: 4, name: "Mochtar Efrin Samjaya", roles: "Bidan, Perawat, Dokter" },
    ];

    const [selectedDept, setSelectedDept] = useState("");
    const [selectedPosition, setSelectedPosition] = useState("");

    // 🔥 STATE MODAL
    const [openForm, setOpenForm] = useState(false);

    const departments = [
        "Purchasing",
        "Keuangan",
        "Manajemen",
        "R&D",
        "Dokter",
        "Perawat",
        "Apoteker",
    ];

    const positions = [
        "Dokter",
        "Perawat",
        "Bidan",
        "dll",
    ];

    const handleCreate = () => {
        setOpenForm(true);
    };

    return (
        <div className="bg-white shadow-md rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-normal font-semibold">
                    DATA KARYAWAN DAN TENAGA KESEHATAN
                </h1>

                <HeaderActionMenu onAdd={handleCreate} />
            </div>

            <DepartmentFilter
                departments={departments}
                selected={selectedDept}
                onChange={setSelectedDept}
            />
            <PositionFilter
                departments={positions}
                selected={selectedPosition}
                onChange={setSelectedPosition}
            />
            <StatusFilter />
            <SearchBar />

            <EmployeeTable employees={employees} />

            <Pagination />

            <EmployeeFormModal 
                open={openForm} 
                onClose={() => setOpenForm(false)} 
            />
        </div>
    );
}
