import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function EmployeeFormModal({ open, onClose }) {
    const [provinces, setProvinces] = useState([]);
    const [regencies, setRegencies] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedRegency, setSelectedRegency] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");

    function toTitleCase(text) {
        return text
            .toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase());
    }

    useEffect(() => {
        fetch(`https://kanglerian.my.id/api-wilayah-indonesia/api/provinces.json`)
            .then((res) => res.json())
            .then((data) => setProvinces(data))
            .catch((err) => console.error("Error fetching provinces:", err));
    }, []);

    useEffect(() => {
        if (!selectedProvince) return;

        fetch(
            `https://kanglerian.my.id/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`
        )
            .then((res) => res.json())
            .then((data) => setRegencies(data))
            .catch((err) => console.error("Error fetching regencies:", err));

        setDistricts([]);
        setVillages([]);
        setSelectedRegency("");
        setSelectedDistrict("");
    }, [selectedProvince]);

    useEffect(() => {
        if (!selectedRegency) return;

        fetch(
            `https://kanglerian.my.id/api-wilayah-indonesia/api/districts/${selectedRegency}.json`
        )
            .then((res) => res.json())
            .then((data) => setDistricts(data))
            .catch((err) => console.error("Error fetching districts:", err));

        setVillages([]);
        setSelectedDistrict("");
    }, [selectedRegency]);

    useEffect(() => {
        if (!selectedDistrict) return;

        fetch(
            `https://kanglerian.my.id/api-wilayah-indonesia/api/villages/${selectedDistrict}.json`
        )
            .then((res) => res.json())
            .then((data) => setVillages(data))
            .catch((err) => console.error("Error fetching villages:", err));
    }, [selectedDistrict]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-5xl rounded-xl shadow-xl p-6 overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-normal font-bold">FORM TAMBAH KARYAWAN</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                        <X size={18} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div className="flex flex-col gap-3">
                        <label className="text-sm font-medium">Nama Lengkap <span className="text-red-500">*</span></label>
                        <input className="border rounded-lg p-2" placeholder="Nama Lengkap" />

                        <label className="text-sm font-medium">No. Identitas <span className="text-red-500">*</span></label>
                        <input className="border rounded-lg p-2" placeholder="Nomor Induk Kependudukan" />

                        <label className="text-sm font-medium">Jenis Kelamin <span className="text-red-500">*</span></label>
                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2">
                                <input type="radio" name="gender" /> Laki-laki
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" name="gender" /> Perempuan
                            </label>
                        </div>

                        <label className="text-sm font-medium">Tempat Lahir <span className="text-red-500">*</span></label>
                        <input className="border rounded-lg p-2" placeholder="Tempat Lahir" />

                        <label className="text-sm font-medium">Tanggal Lahir <span className="text-red-500">*</span></label>
                        <input type="date" className="border rounded-lg p-2" />

                        <label className="text-sm font-medium">No. Telepon <span className="text-red-500">*</span></label>
                        <input className="border rounded-lg p-2" placeholder="Nomor Telepon" />

                        <label className="text-sm font-medium">Provinsi <span className="text-red-500">*</span></label>
                        <select
                            className="border rounded-lg p-2"
                            value={selectedProvince}
                            onChange={(e) => setSelectedProvince(e.target.value)}
                        >
                            <option value="">Pilih Provinsi...</option>
                            {provinces.map((p) => (
                                <option key={p.id} value={p.id}>{toTitleCase(p.name)}</option>
                            ))}
                        </select>

                        <label className="text-sm font-medium">Kota/Kabupaten <span className="text-red-500">*</span></label>
                        <select
                            className="border rounded-lg p-2"
                            value={selectedRegency}
                            onChange={(e) => setSelectedRegency(e.target.value)}
                            disabled={!selectedProvince}
                        >
                            <option value="">Pilih Kota / Kabupaten...</option>
                            {regencies.map((r) => (
                                <option key={r.id} value={r.id}>{toTitleCase(r.name)}</option>
                            ))}
                        </select>

                        <label className="text-sm font-medium">Kecamatan <span className="text-red-500">*</span></label>
                        <select
                            className="border rounded-lg p-2"
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            disabled={!selectedRegency}
                        >
                            <option value="">Pilih Kecamatan...</option>
                            {districts.map((d) => (
                                <option key={d.id} value={d.id}>{toTitleCase(d.name)}</option>
                            ))}
                        </select>

                        <label className="text-sm font-medium">Kelurahan <span className="text-red-500">*</span></label>
                        <select className="border rounded-lg p-2"

                            disabled={!selectedDistrict}>
                            <option value="">Pilih Kelurahan...</option>
                            {villages.map((v) => (
                                <option key={v.id} value={v.id}>{toTitleCase(v.name)}</option>
                            ))}
                        </select>

                        <label className="text-sm font-medium">Detail Alamat <span className="text-red-500">*</span></label>
                        <textarea className="border rounded-lg p-2 h-24" placeholder="Alamat"></textarea>

                        <label className="text-sm font-medium">Kode Pos <span className="text-red-500">*</span></label>
                        <input className="border rounded-lg p-2" placeholder="Kode Pos" />
                    </div>

                    <div className="flex flex-col gap-3">

                        <label className="text-sm font-medium">
                            Username <span className="text-red-500">*</span>
                        </label>
                        <input className="border rounded-lg p-2" placeholder="Username" />

                        <label className="text-sm font-medium">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input className="border rounded-lg p-2" placeholder="Email" />

                        <label className="text-sm font-medium">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input type="password" className="border rounded-lg p-2" />

                        <label className="text-sm font-medium">
                            Tipe <span className="text-red-500">*</span>
                        </label>

                        <div className="grid grid-cols-2 gap-4">

                            <div className="flex flex-col gap-2">
                                {['Resepsionis', 'Manager', 'Purchasing', 'Keuangan', 'Kasir', 'Farmasi', 'Laboran'].map((t) => (
                                    <label key={t} className="flex items-center gap-2">
                                        <input type="checkbox" /> {t}
                                    </label>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                <div className="border-r h-full border-gray-300"></div>

                                <div className="flex flex-col gap-2">
                                    {['Perawat', 'Bidan', 'Dokter', 'Lainnya'].map((t) => (
                                        <label key={t} className="flex items-center gap-2">
                                            <input type="radio" name="tipeKanan" /> {t}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <label className="text-sm font-medium">Tanggal Mulai Kontrak <span className="text-red-500">*</span></label>
                        <input type="date" className="border rounded-lg p-2" />

                        <label className="text-sm font-medium">Tanggal Selesai Kontrak <span className="text-red-500">*</span></label>
                        <input type="date" className="border rounded-lg p-2" />

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium">Status Menikah <span className="text-red-500">*</span></label>
                            <select className="border rounded-lg p-2">
                                <option value="">Select...</option>
                                <option value="single">Single</option>
                                <option value="married">Sudah Menikah</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-6 gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                    >
                        Batal
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    );
}
