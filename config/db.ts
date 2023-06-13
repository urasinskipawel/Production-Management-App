import { createPool } from 'mysql2/promise';
require('dotenv').config();

export const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  namedPlaceholders: true,
  decimalNumbers: true,
});
