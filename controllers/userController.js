import mysql from 'mysql';

const db = mysql.createPool({
  user: "root",
  host: "localhost",
  password: "divljidetektiv",
  database: "users",
  port: "3306",
  connectionLimit: 10
})

const registerUser = (req, res) => {
  const { name, email, password } = req.body
  const query = `INSERT INTO user (name, email, password) VALUES ('${name}', '${email}', '${password}')`;

  db.getConnection((err, connection ) => {
    if (err) {
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
}

const userLogin = (req, res) => {
  const { email, password } = req.body;

  console.log('dfsdf')
  const query = `SELECT * FROM user WHERE email = '${email}' AND password = '${password}'` 
  db.getConnection((err, connection) => {
    if (err) {
      throw err;
    }
    connection.query(query ,(err, rows) => {
      connection.release()
      if (!err) {
        res.send(rows)
      } else {
        console.log(err)
      }
    })
  })
}

export { registerUser, userLogin }