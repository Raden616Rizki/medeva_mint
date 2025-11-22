import express from "express";
import cors from "cors";
import db from "./src/models/index.js";
import employeeRoutes from "./src/routes/employee.routes.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.development" });

const app = express();

const corsOptions = {
  origin: "http://localhost:7000",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Server is actived" });
});

employeeRoutes(app);

db.sequelize.sync().then(() => {
  console.log("Database synchronized");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
