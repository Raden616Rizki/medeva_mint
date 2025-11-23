import express from "express";
import cors from "cors";
import db from "./src/models/index.js";
import employeeRoutes from "./src/routes/employee.routes.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.development" });

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
  console.log("Database synchronized");
});

const PORT = process.env.PORT || 8080;

app.use((err, req, res, next) => {
  // PostgreSQL error
  if (err.original && err.original.detail) {
    return res.status(400).json({
      error: err.original.detail,
    });
  }

  // sequelize validation error
  if (err.errors && err.errors.length > 0) {
    return res.status(400).json({
      error: err.errors[0].message,
    });
  }

  res.status(500).json({
    error: err.message || "Internal server error",
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
