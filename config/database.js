require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // ✅ Ignore self-signed SSL error
    },
    connectTimeout: 60000 // ✅ Increase timeout
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 60000,
    idle: 10000
  }
});

sequelize.authenticate()
  .then(() => console.log("✅ Database connected successfully"))
  .catch(err => console.error("❌ Database connection error:", err));

module.exports = sequelize;
