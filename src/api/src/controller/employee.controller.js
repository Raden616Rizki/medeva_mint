import employeeService from "../services/employee.service.js";

// Create New Employee => POST /employees
export const create = async (req, res, next) => {
  try {
    const required = ["fullName", "username", "email", "password"];

    for (let field of required) {
      if (!req.body[field]) {
        return res.status(400).json({
          message: `Field ${field} wajib diisi`,
        });
      }
    }

    const employee = await employeeService.createEmployee(req.body);
    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
};

// Get All Employees => GET /employees?search=&page=&position=
export const findAll = async (req, res, next) => {
  try {
    const { search, page, position } = req.query;

    const result = await employeeService.getEmployees({
      search,
      page,
      position,
    });

    res.json({
      totalItems: result.count,
      currentPage: parseInt(page) || 1,
      totalPages: Math.ceil(result.count / 10),
      employees: result.rows,
    });
  } catch (err) {
    next(err);
  }
};

// Get Employee by ID => GET /employees/:id
export const findOne = async (req, res, next) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Karyawan tidak ditemukan" });
    }

    res.json(employee);
  } catch (err) {
    next(err);
  }
};

// Get Employees by Department ID => GET /employees/department/:departmentId
export const findByDepartmentId = async (req, res, next) => {
  try {
    const departmentId = req.params.departmentId;

    const employees = await employeeService.getEmployeesByDepartmentId(
      departmentId
    );

    if (!employees || employees.length === 0) {
      return res.status(404).json({
        message: "Tidak ada karyawan dalam departemen tersebut",
      });
    }

    res.json(employees);
  } catch (err) {
    next(err);
  }
};

// Update Employee => PUT /employees/:id
export const update = async (req, res, next) => {
  try {
    const updatedEmployee = await employeeService.updateEmployee(
      req.params.id,
      req.body
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Karyawan tidak ditemukan" });
    }

    res.json(updatedEmployee);
  } catch (err) {
    next(err);
  }
};
