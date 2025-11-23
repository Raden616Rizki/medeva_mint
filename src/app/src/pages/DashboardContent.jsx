import React, { useState } from "react";
import StatusFilter from "../components/filters/StatusFilter";
import DepartmentFilter from "../components/filters/DepartmentFilter";
import SearchBar from "../components/filters/SearchBar";
import EmployeeTable from "../components/table/EmployeeTable";
import Pagination from "../components/pagination/Pagination";
import HeaderActionMenu from "../components/menu/HeaderActionMenu";

export default function DashboardContent() {
    const employees = [
        { number: 1, name: "FATIMAH ZAHROUN NIKMAH", roles: "Purchasing, Manager" },
        { number: 2, name: "dr. Galih Satryo Hutomo", roles: "Dokter, Purchasing" },
        { number: 3, name: "DWI DARA CAHAYANI ,S.FARM. APT", roles: "Purchasing" },
        { number: 4, name: "Mochtar Efrin Samjaya", roles: "Bidan, Perawat, Dokter" },
    ];

    const [selectedDept, setSelectedDept] = useState("");

    const departments = [
        "Purchasing",
        "Keuangan",
        "Manajemen",
        "R&D",
        "Dokter",
        "Perawat",
        "Apoteker",
    ];

    const handleCreate = () => {
        alert("Aksi Tambah Karyawan dipilih!");
    };

    return (
        <div className="bg-white shadow-md rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-normal font-semibold">
                    Data Karyawan & Tenaga Kesehatan
                </h1>

                <HeaderActionMenu onAdd={handleCreate} />
            </div>

            <DepartmentFilter
                departments={departments}
                selected={selectedDept}
                onChange={setSelectedDept}
            />
            <StatusFilter />
            <SearchBar />

            <EmployeeTable employees={employees} />

            <Pagination />
        </div>
    );
}
