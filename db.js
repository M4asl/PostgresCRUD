const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: 'postgres',
  password: `${process.env.PGPASSWORD}`,
  database: 'todo_database',
  host: 'localhost',
  port: 5432,
});

module.exports = pool;
