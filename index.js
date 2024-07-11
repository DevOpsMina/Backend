/**const mysql = require('mysql2');
const express = require('express');
const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'memina',
  password: 'Haz@el789',
  database: 'backenddatabase'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

app.get('/', (req, res) => {
  res.send('Hello MINAAA BOHORA');
});

app.listen(3002, () => {
  console.log('Server started on port 3002');
});**/

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// MySQL Connection Pool
const pool = mysql.createPool({
  host: '54.151.181.168',
  user: 'memina',
  password: 'Haz@el789',
  database: 'backenddatabase',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Route to handle POST requests to add data
app.post('/api/data', async (req, res) => {
  const { name, description } = req.body;
  try {
    const connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO data (name, description) VALUES (?, ?)',
      [name, description]
    );
    connection.release();
    res.status(201).json({ message: 'Data added successfully' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Error inserting data' });
  }
});

// Route to handle GET requests to the root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to my backend server!');
  });
  
// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});