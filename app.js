const express = require('express');
const mysql = require('mysql2/promise'); // Use mysql2/promise for async operations
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

    // Example query
    const [rows, fields] = await connection.execute('SELECT NOW()');
    console.log('Current database time:', rows[0]['NOW()']);

    // Close the connection
    await connection.end();
    return connection;
  } catch (err) {
    console.error('Error connecting to MySQL:', err);
    throw err; // Throw error for handling in app.listen callback
  }
}

// Route to get current database time
app.get('/', async (req, res) => {
  try {
    const connection = await connectToMySQL();
    const [rows, fields] = await connection.execute('SELECT NOW()');
    await connection.end(); // Close connection after query
    res.send(`Database time: ${rows[0]['NOW()']}`);
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).send('Error querying database');
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
