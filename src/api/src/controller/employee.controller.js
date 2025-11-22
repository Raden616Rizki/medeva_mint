import employeeService from "../services/employee.service.js";

// Create New Employee => POST /employees
export const create = async (req, res, next) => {
  try {
    const required = [
      "full_name",
      "username",
      "password",
      "email",
      "nik",
      "gender",
      "birth_place",
      "birth_date",
      "marriage_status",
      "contract_start",
      "contract_end",
      "position",
      "address",
      "province",
      "city",
      "subdistrict",
      "ward",
      "postal_code",
    ];

    for (let field of required) {
      if (!req.body[field]) {
        return res.status(400).json({
          message: `Field ${field} wajib diisi`,
        });
      }
    }

    const avatar_url = req.file ? `/uploads/${req.file.filename}` : null;

    const payload = {
      ...req.body,
      avatar_url,
    };

    const employee = await employeeService.createEmployee(payload);

    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
};

// Get All Employees => GET /employees?search=&page=&position=&status=
export const findAll = async (req, res, next) => {
  try {
    const { search, page, position, status } = req.query;

    const result = await employeeService.getEmployees({
      search,
      page,
      position,
      status,
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
    const employeeId = req.params.id;

    const updateData = { ...req.body };

    if (req.file) {
      updateData.avatarUrl = `/uploads/${req.file.filename}`;
    }

    const updatedEmployee = await employeeService.updateEmployee(
      employeeId,
      updateData
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        message: "Karyawan tidak ditemukan",
      });
    }

    res.json(updatedEmployee);
  } catch (err) {
    next(err);
  }
};
