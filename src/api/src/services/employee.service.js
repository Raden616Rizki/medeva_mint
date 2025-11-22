import db from "../models/index.js";
import bcrypt from "bcrypt";

const Employee = db.employees;
const Department = db.departments;
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
      departmentsId,
      password,
      avatarUrl,
    } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = await Employee.create({
      fullName,
      username,
      email,
      phone,
      position,
      password: hashedPassword,
      avatarUrl,
    });

    if (Array.isArray(departmentsId) && departmentsId.length > 0) {
      await employee.setDepartments(departmentsId);
    }

    return employee;
  },

  // Get employees (with search, pagination and position)
  async getEmployees({ search = "", page = 1, position = "" }) {
    const limit = 10;
    const offset = (page - 1) * limit;

    const whereCondition = {};

    // Pencarian nama / username
    if (search) {
      whereCondition[Op.or] = [
        { username: { [Op.like]: `%${search}%` } },
        { fullName: { [Op.like]: `%${search}%` } },
      ];
    }

    // Filter posisi
    if (position) {
      whereCondition.position = {
        [Op.like]: `%${position}%`,
      };
    }

    return await Employee.findAndCountAll({
      where: whereCondition,
      limit,
      offset,
      order: [["created_at", "DESC"]],
      include: [
        {
          model: Department,
          through: { attributes: [] },
        },
      ],
    });
  },

  // Get employee by ID
  async getEmployeeById(id) {
    return await Employee.findByPk(id, {
      include: [
        {
          model: Department,
          through: { attributes: [] },
        },
      ],
    });
  },

  // Get employee by Department ID
  async getEmployeesByDepartmentId(departmentId) {
    return await Employee.findAll({
      include: [
        {
          model: Department,
          where: { id: departmentId },
          through: { attributes: [] },
        },
      ],
    });
  },

  // Update employee by ID
  async updateEmployee(id, data) {
    const employee = await Employee.findByPk(id);

    if (!employee) return null;

    const { departmentsId } = data;

    const updatedData = { ...data };

    if (data.password) {
      updatedData.password = await bcrypt.hash(data.password, 10);
    }

    await Employee.update(updatedData, { where: { id } });

    if (Array.isArray(departmentsId)) {
      await employee.setDepartments(departmentsId);
    }

    return await Employee.findByPk(id, {
      include: [
        {
          model: Department,
          through: { attributes: [] },
        },
      ],
    });
  },
};
