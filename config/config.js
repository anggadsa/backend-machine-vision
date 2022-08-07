require('dotenv').config();
module.exports = {
  "development": {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    "port": 5432
  },
  "test": {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "db_ch6_test",
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    "port": 5432
  },
  "production": {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "db_ch6_test",
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    "port": 5432
  }
}

