require('dotenv').config();

const { Sequelize } = require('sequelize');

// Database configuration initialized


console.log('Initializing Database Configuration...');
console.log('POSTGRES_URL present:', !!process.env.POSTGRES_URL);
if (process.env.POSTGRES_URL) {
  console.log('POSTGRES_URL starts with:', process.env.POSTGRES_URL.substring(0, 15) + '...');
}

let sequelize;
try {
  sequelize = process.env.POSTGRES_URL
    ? new Sequelize(process.env.POSTGRES_URL, {
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
    })
    : new Sequelize(
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
} catch (error) {
  console.error('CRITICAL: Failed to initialize Sequelize instance:', error.message);
  // Create a dummy instance to avoid 'undefined' errors later, though it will fail authenticate()
  sequelize = new Sequelize('sqlite::memory:', { logging: false });
}

module.exports = sequelize;