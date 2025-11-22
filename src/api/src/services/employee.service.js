import db from "../models/index.js";
import bcrypt from "bcrypt";

const Employee = db.employees;
const Department = db.departments;
const Op = db.Sequelize.Op;

export default {
  // Create new employee
  async createEmployee(data, file) {
    const {
      full_name,
      username,
      email,
      phone,
      nik,
      departmentsId,
      gender,
      birth_place,
      birth_date,
      marriage_status,
      role,
      status,
      contract_start,
      contract_end,
      position,
      address,
      province,
      city,
      subdistrict,
      ward,
      postal_code,
      avatar_url,
      password,
    } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = await Employee.create({
      full_name,
      username,
      email,
      phone,
      nik,
      gender,
      birth_place,
      birth_date,
      marriage_status,
      role,
      status,
      contract_start,
      contract_end,
      position,
      address,
      province,
      city,
      subdistrict,
      ward,
      postal_code,
      avatar_url,
      password: hashedPassword,
    });

    if (Array.isArray(departmentsId) && departmentsId.length > 0) {
      await employee.setDepartments(departmentsId);
    }

    return employee;
  },

  // Get employees (with search, pagination, position, status)
  async getEmployees({ search = "", page = 1, position = "", status = "" }) {
    const limit = 10;
    const offset = (page - 1) * limit;

    const whereCondition = {};

    if (search) {
      whereCondition[Op.or] = [
        { username: { [Op.like]: `%${search}%` } },
        { full_name: { [Op.like]: `%${search}%` } },
      ];
    }

    if (position) {
      whereCondition.position = {
        [Op.like]: `%${position}%`,
      };
    }

    if (status) {
      whereCondition.status = status;
    }

    const result = await Employee.findAndCountAll({
      where: whereCondition,
      include: [
        {
          model: Department,
          through: { attributes: [] },
          attributes: ["id", "name"],
          required: false,
        },
      ],
      distinct: true,
      col: "id",
      limit,
      offset,
      order: [["created_at", "DESC"]],
      subQuery: false,
    });

    return result;
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
