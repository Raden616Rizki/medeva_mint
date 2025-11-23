import React, { useState, useEffect } from "react";
import StatusFilter from "../components/filters/StatusFilter";
import DepartmentFilter from "../components/filters/DepartmentFilter";
import PositionFilter from "../components/filters/PositionFilter";
import SearchBar from "../components/filters/SearchBar";
import EmployeeTable from "../components/table/EmployeeTable";
import Pagination from "../components/pagination/Pagination";
import HeaderActionMenu from "../components/menu/HeaderActionMenu";
import EmployeeFormModal from "../components/modal/EmployeeFormModal";
import EmployeeService from "../service/employee.service";

export default function DashboardContent() {
    const [employees, setEmployees] = useState([]);

    const [selectedDept, setSelectedDept] = useState("");
    const [selectedPosition, setSelectedPosition] = useState("");
    const [search, setSearch] = useState("");

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

    const positions = ["Dokter", "Perawat", "Bidan", "dll"];

    useEffect(() => {
        loadEmployees();
    }, [search, selectedDept, selectedPosition]);

    const loadEmployees = () => {
        EmployeeService.getAll({
            search: search || undefined,
            position: selectedPosition || undefined,
            department: selectedDept || undefined,
        })
            .then((response) => {
                setEmployees(response.data.employees || []); 
            })
            .catch((e) => {
                console.error(e);
            });
    };

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

            {/* Search */}
            <SearchBar onChange={(value) => setSearch(value)} />

            {/* TABEL EMPLOYEE */}
            <EmployeeTable employees={employees} />

            <Pagination />

            <EmployeeFormModal
                open={openForm}
                onClose={() => setOpenForm(false)}
                onSuccess={loadEmployees}
            />
        </div>
    );
}