export default (sequelize, Sequelize) => {
  const EmployeeDepartment = sequelize.define(
    "employee_departments",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      employee_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      department_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },

      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      timestamps: false,
      defaultScope: {
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      },
    }
  );
  return EmployeeDepartment;
};
