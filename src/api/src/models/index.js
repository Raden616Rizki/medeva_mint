import dbConfig from "../../config/db.config.js";
import Sequelize from "sequelize";

import EmployeeModel from "./employee.model.js";
import DepartmentModel from "./department.model.js";
import EmployeeDepartmentModel from "./employee_department.model.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    port: dbConfig.PORT,
    logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.employees = EmployeeModel(sequelize, Sequelize);
db.departments = DepartmentModel(sequelize, Sequelize);
db.employeeDepartments = EmployeeDepartmentModel(sequelize, Sequelize);

// Employee Department Many-to-Many Relationship
db.employees.belongsToMany(db.departments, {
    through: db.employeeDepartments,
    foreignKey: "employee_id",
    otherKey: "department_id",
});

db.departments.belongsToMany(db.employees, {
    through: db.employeeDepartments,
    foreignKey: "department_id",
    otherKey: "employee_id",
});

export default db;
