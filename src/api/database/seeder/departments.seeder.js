import db from "../../src/models/index.js";
import { v4 as uuidv4 } from "uuid";

async function seedDepartments() {
  try {
    await db.sequelize.authenticate();
    console.log("Database connected.");

    const departments = [
      {
        id: uuidv4(),
        name: "Resepsionis",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Manager",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Purchasing",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Keuangan",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Kasir",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Farmasi",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Laboran",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await db.departments.bulkCreate(departments);
    console.log("Department seeding completed successfully!");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding departments:", error);
    process.exit(1);
  }
}

seedDepartments();