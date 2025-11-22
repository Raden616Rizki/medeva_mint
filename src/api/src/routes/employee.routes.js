import * as employees from "../controller/employee.controller.js";
import express from "express";

export default (app) => {
    const router = express.Router();

    // POST /employees
    router.post("/", employees.create);

    // GET /employees?search=&page=&position=
    router.get("/", employees.findAll);

    // GET /employees/:id
    router.get("/:id", employees.findOne);
    
    // GET /employees/department/:departmentId
    router.get("/department/:departmentId", employees.findByDepartmentId);

    // PUT /employees/:id
    router.put("/:id", employees.update);

    app.use("/api/employees", router);
};
