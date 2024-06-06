const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const PORT = process.env.PORT || 3000;

// MySQL connection using mysql2/promise
async function connectToMySQL() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_SERVICE_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    });

    console.log('Connected to MySQL');
    return connection;
  } catch (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
}

// Route to get current database time
app.get('/', async (req, res) => {
  let connection;
  try {
    connection = await connectToMySQL();
    const [rows, fields] = await connection.execute('SELECT NOW()');
    console.log('Current database time:', rows[0]['NOW()']);
    await connection.end(); // Close connection after query
    res.send(`Database time: ${rows[0]['NOW()']}`);
  } catch (err) {
    console.error('Error querying database:', err);
    if (connection) {
      try {
        await connection.end();
      } catch (e) {
        console.error('Error closing connection:', e);
      }
    }
    res.status(500).send('Error querying database');
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
