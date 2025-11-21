export default {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "little_prince",
    DB: "medeva_mint_db",
    dialect: "postgres",
    PORT: 5432,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};