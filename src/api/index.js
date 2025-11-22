import express from "express";
import cors from "cors";
import db from "./src/models/index.js";
import employeeRoutes from "./src/routes/employee.routes.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Server is actived" });
});

employeeRoutes(app);

db.sequelize.sync().then(() => {
  console.log("Synced db.");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
