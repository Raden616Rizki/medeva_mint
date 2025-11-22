export default (sequelize, Sequelize) => {
  const Employee = sequelize.define(
    "employees",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },

      full_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlphanumeric: {
            msg: "Username hanya boleh berisi huruf dan angka",
          },
          len: {
            args: [3, 30],
            msg: "Username harus memiliki panjang 3 - 30 karakter",
          },
        },
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },

      phone: {
        type: Sequelize.STRING,
      },

      nik: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      gender: {
        type: Sequelize.ENUM("L", "P"),
        allowNull: false,
      },

      birth_place: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      birth_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      marriage_status: {
        type: Sequelize.ENUM("SINGLE", "SUDAH MENIKAH"),
        allowNull: false,
      },

      role: {
        type: Sequelize.ENUM("ADMIN", "USER"),
        defaultValue: "USER",
      },

      status: {
        type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
        defaultValue: "ACTIVE",
      },

      contract_start: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      contract_end: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      position: { 
        type: Sequelize.STRING,
        allowNull: false,
    },

      // Address Details
      address: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      province: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      subdistrict: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      ward: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      postal_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      avatar_url: {
        type: Sequelize.STRING,
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
    }
  );

  return Employee;
};
