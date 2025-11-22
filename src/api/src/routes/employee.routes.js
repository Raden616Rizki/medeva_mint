import * as employees from "../controller/employee.controller.js";
import express from "express";

export default (app) => {
    const router = express.Router();

    // POST /employees
    router.post("/", employees.create);

    // GET /employees?search=&page=
    router.get("/", employees.findAll);

    // GET /employees/:id
    router.get("/:id", employees.findOne);

    // PUT /employees/:id
    router.put("/:id", employees.update);

    app.use("/api/employees", router);
};
