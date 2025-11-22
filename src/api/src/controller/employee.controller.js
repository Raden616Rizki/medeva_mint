import db from "../models/index.js";
import bcrypt from "bcrypt";

const Employee = db.employees;
const Op = db.Sequelize.Op;

// Create New Employee => POST /employees
export const create = async (req, res) => {
    try {
        const {
            fullName,
            username,
            email,
            phone,
            position,
            department,
            password,
            avatarUrl,
        } = req.body;

        if (!fullName || !username || !email || !password) {
            return res.status(400).json({
                message: "Nama lengkap, username, email, dan password wajib diisi!",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const employee = await Employee.create({
            fullName,
            username,
            email,
            phone,
            position,
            department,
            password: hashedPassword,
            avatarUrl,
        });

        res.status(201).json(employee);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Terjadi kesalahan saat menambahkan data karyawan",
        });
    }
};

// Get All Employees Data => GET /employees?search=&page=
export const getEmployees = async (req, res) => {
    try {
        const search = req.query.search || "";
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const whereCondition = search
            ? {
                  [Op.or]: [
                      { username: { [Op.like]: `%${search}%` } },
                      { fullName: { [Op.like]: `%${search}%` } },
                  ],
              }
            : {};

        const result = await Employee.findAndCountAll({
            where: whereCondition,
            limit,
            offset,
            order: [["created_at", "DESC"]],
        });

        res.json({
            totalItems: result.count,
            currentPage: page,
            totalPages: Math.ceil(result.count / limit),
            employees: result.rows,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Terjadi kesalahan saat mengambil data karyawan",
        });
    }
};

// Get Employee Data by ID => GET /employees/:id
export const getEmployeeById = async (req, res) => {
    try {
        const id = req.params.id;

        const employee = await Employee.findByPk(id);

        if (!employee) {
            return res.status(404).json({ message: "Data karyawan tidak ditemukan" });
        }

        res.json(employee);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Terjadi kesalahan saat mengambil data karyawan",
        });
    }
};

// Update Employee Data by ID => PUT /employees/:id
export const updateEmployee = async (req, res) => {
    try {
        const id = req.params.id;

        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ message: "Data karyawan tidak ditemukan." });
        }

        const updatedData = { ...req.body };

        if (req.body.password) {
            updatedData.password = await bcrypt.hash(req.body.password, 10);
        }

        await Employee.update(updatedData, { where: { id } });

        const refreshedData = await Employee.findByPk(id);
        res.json(refreshedData);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Terjadi kesalahan saat mengupdate employee.",
        });
    }
};
