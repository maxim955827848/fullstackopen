const express = require('express');
const { Pool } = require('pg');
const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL || 'postgres://postgres:secret@db:5432/postgres' });
app.get('/api/data', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT NOW()');
    res.json({ message: "Hello from containerized Backend!", dbTime: rows[0].now });
  } catch (err) {
    res.status(500).json({ error: "Database connection failed", details: err.message });
  }
});
app.listen(process.env.PORT || 5000, () => console.log('Backend ready'));
