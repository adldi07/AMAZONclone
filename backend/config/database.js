require('dotenv').config();

const { Sequelize } = require('sequelize');

// Database configuration initialized


console.log('Initializing Database Configuration...');
console.log('POSTGRES_URL present:', !!process.env.POSTGRES_URL);
if (process.env.POSTGRES_URL) {
  console.log('POSTGRES_URL starts with:', process.env.POSTGRES_URL.substring(0, 15) + '...');
}

const postgresUrl = process.env.POSTGRES_URL ? process.env.POSTGRES_URL.trim() : null;

let sequelize;

if (postgresUrl) {
  console.log('Initializing Sequelize with POSTGRES_URL');
  sequelize = new Sequelize(postgresUrl, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
} else {
  console.log('Initializing Sequelize with discrete credentials');
  sequelize = new Sequelize(
    process.env.DB_NAME || 'postgres',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'postgres',
    {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      dialect: 'postgres',
      logging: false
    }
  );
}

module.exports = sequelize;