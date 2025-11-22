import db from "../models/index.js";
import bcrypt from "bcrypt";

const Employee = db.employees;
const Op = db.Sequelize.Op;

export default {
    // Create new employee
    async createEmployee(data) {
        const {
            fullName,
            username,
            email,
            phone,
            position,
            department,
            password,
            avatarUrl,
        } = data;

        const hashedPassword = await bcrypt.hash(password, 10);

        return await Employee.create({
            fullName,
            username,
            email,
            phone,
            position,
            department,
            password: hashedPassword,
            avatarUrl,
        });
    },

    // Get employees (with search + pagination)
    async getEmployees({ search = "", page = 1 }) {
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

        return await Employee.findAndCountAll({
            where: whereCondition,
            limit,
            offset,
            order: [["created_at", "DESC"]],
        });
    },

    // Get employee by ID
    async getEmployeeById(id) {
        return await Employee.findByPk(id);
    },

    // Update employee by ID
    async updateEmployee(id, data) {
        const employee = await Employee.findByPk(id);
        if (!employee) return null;

        const updatedData = { ...data };

        if (data.password) {
            updatedData.password = await bcrypt.hash(data.password, 10);
        }

        await Employee.update(updatedData, { where: { id } });

        return await Employee.findByPk(id);
    },
};
