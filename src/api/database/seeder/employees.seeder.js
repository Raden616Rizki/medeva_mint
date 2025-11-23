import db from "../../src/models/index.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

async function seedEmployees() {
  try {
    await db.sequelize.authenticate();
    console.log("Database connected.");

    const now = new Date();

    // Hash passwords
    const passwordUser = await bcrypt.hash("User123!", 10);
    const passwordAdmin = await bcrypt.hash("Admin123!", 10);

    // Main employees data
    const employees = [
      {
        id: uuidv4(),
        full_name: "Andre Firmansyah",
        username: "andre1user",
        email: "andre.user@example.com",
        phone: "089677889900",
        nik: "5678901234567890",
        gender: "L",
        birth_place: "Surabaya",
        birth_date: "1992-09-12",
        marriage_status: "SINGLE",
        role: "USER",
        status: "ACTIVE",
        contract_start: "2023-05-01",
        contract_end: "2024-05-01",
        position: "Perawat",
        address: "Jl. Mawar No. 8",
        province: "Jawa Timur",
        city: "Surabaya",
        subdistrict: "Tegalsari",
        ward: "Keputran",
        postal_code: "60262",
        avatar_url: null,
        password: passwordUser,
        created_at: now,
        updated_at: now,
        departmentsId: ["81ee0335-f272-4fde-aa13-192b45c1a731"],
      },
      {
        id: uuidv4(),
        full_name: "Budi Santoso",
        username: "budi2admin",
        email: "budi.admin@example.com",
        phone: "081234567890",
        nik: "1234567890123456",
        gender: "L",
        birth_place: "Jakarta",
        birth_date: "1990-05-21",
        marriage_status: "SUDAH MENIKAH",
        role: "ADMIN",
        status: "ACTIVE",
        contract_start: "2023-01-01",
        contract_end: "2025-01-01",
        position: "Dokter",
        address: "Jl. Melati No. 10",
        province: "DKI Jakarta",
        city: "Jakarta Selatan",
        subdistrict: "Kebayoran Baru",
        ward: "Melati",
        postal_code: "12190",
        avatar_url: null,
        password: passwordAdmin,
        created_at: now,
        updated_at: now,
        departmentsId: [
          "6dc86105-2cc0-4ed4-896f-e4c5d968b3ec",
          "81ee0335-f272-4fde-aa13-192b45c1a731",
        ],
      },
      {
        id: uuidv4(),
        full_name: "Siti Rahmawati",
        username: "siti3user",
        email: "siti.user@example.com",
        phone: "081298765432",
        nik: "9876543210987654",
        gender: "P",
        birth_place: "Bandung",
        birth_date: "1995-03-10",
        marriage_status: "SUDAH MENIKAH",
        role: "USER",
        status: "INACTIVE",
        contract_start: "2023-02-01",
        contract_end: "2024-02-01",
        position: "Perawat",
        address: "Jl. Kenanga No. 5",
        province: "Jawa Barat",
        city: "Bandung",
        subdistrict: "Coblong",
        ward: "Dago",
        postal_code: "40135",
        avatar_url: null,
        password: passwordUser,
        created_at: now,
        updated_at: now,
        departmentsId: [
          "5eb07672-301d-4eeb-b46b-013fc05c3ff3",
          "6dc86105-2cc0-4ed4-896f-e4c5d968b3ec",
          "81ee0335-f272-4fde-aa13-192b45c1a731",
        ],
      },
    ];

    // Insert employees first
    await db.employees.bulkCreate(
      employees.map(({ departmentsId, ...emp }) => emp)
    );

    // Insert relation into pivot table
    const employeeDepartments = [];

    employees.forEach((emp) => {
      emp.departmentsId.forEach((deptId) => {
        employeeDepartments.push({
          id: uuidv4(),
          employee_id: emp.id,
          department_id: deptId,
          created_at: now,
          updated_at: now,
        });
      });
    });

    await db.employee_departments.bulkCreate(employeeDepartments);

    console.log("Employees and relations seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding employees:", error);
    process.exit(1);
  }
}

seedEmployees();