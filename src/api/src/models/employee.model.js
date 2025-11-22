export default (sequelize, Sequelize) => {
  const Employee = sequelize.define(
    "employee",
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
        unique: true,
      },

      gender: {
        type: Sequelize.ENUM("L", "P"),
      },

      birth_place: {
        type: Sequelize.STRING,
      },

      birth_date: {
        type: Sequelize.DATEONLY,
      },

      marriage_status: {
        type: Sequelize.ENUM("SINGLE", "SUDAH MENIKAH"),
      },

      role: {
        type: Sequelize.ENUM("ADMIN", "USER"),
      },

      status: {
        type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
        defaultValue: "ACTIVE",
      },

      contract_start: {
        type: Sequelize.DATEONLY,
      },

      contract_end: {
        type: Sequelize.DATEONLY,
      },

      // Address Details
      address: {
        type: Sequelize.TEXT,
      },

      province: {
        type: Sequelize.STRING,
      },

      city: {
        type: Sequelize.STRING,
      },

      subdistrict: {
        type: Sequelize.STRING,
      },

      ward: {
        type: Sequelize.STRING,
      },

      postal_code: {
        type: Sequelize.STRING,
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
