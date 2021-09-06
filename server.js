const express = require('express');

const mysql = require('mysql');

const app = express();

app.use(express.json())

const db = mysql.createPool({
  user: "root",
  host: "localhost",
  password: "divljidetektiv",
  database: "users",
  port: "3306",
  connectionLimit: 10
})

app.get('/', (req, res) => {res.send('Api is running')})

app.post('/proba', (req, res) => {
  const { name, password } = req.body
  const query = `INSERT INTO user (name, password) VALUES ('${name}', '${password}')`;

  db.getConnection((err, connection ) => {
    if (err) {
      console.log('aaaaa')
      throw err;
    } 
    console.log('connection as id' + connection.threadId)
    connection.query(query, (err, rows) => {
      connection.release()
      if (!err) {
        res.send(rows)
      } else {
        console.log(err)
      }
    })
  })
})

app.use('/api/users', require('./routes/api/users'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));