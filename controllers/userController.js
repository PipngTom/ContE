import mysql from 'mysql';
import bcrypt from "bcryptjs";
const saltRounds = 10;

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

  bcrypt.hash(password, saltRounds, (err, hash) => {
    const query = `INSERT INTO user (name, email, password) VALUES ('${name}', '${email}', '${hash}')`;

    if (err) {
      return console.log(err)
    }

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
  })


}

const userLogin = (req, res) => {
  const { email, password } = req.body;

  console.log('dfsdf')
  const query = `SELECT * FROM user WHERE email = '${email}'` 
  db.getConnection((err, connection) => {
    if (err) {
      throw err;
    }
    connection.query(query ,(err, rows) => {
      console.log(rows)
      connection.release()
      if (!err) {
        bcrypt.compare(password, rows[0].password, (error, response) => {
          if (response) {
            res.send(rows)
          } else {
            res.send({message: 'Wrong username/password combination !'})
          }
        })
      } else {
        console.log(err)
      }
    })
  })
}

const unosRacuna = (req, res) => {
  const { maxSnaga, odSnaga, prekSnaga, akEnergijaV, akEnergijaN, reaktEnergija, prekReaktEnergija, datumpStanja, datumkStanja } = req.body

  const query = `INSERT INTO racuni (maxSnaga, odSnaga, prekSnaga, akEnergijaV, akEnergijaN, reaktEnergija, prekReaktEnergija, datumpStanja, datumkStanja) VALUES ('${maxSnaga}', '${odSnaga}', '${prekSnaga}', '${akEnergijaV}', '${akEnergijaN}', '${reaktEnergija}', '${prekReaktEnergija}', '${datumpStanja}', '${datumkStanja}')`;

  db.getConnection((err, connection) => {
    if (err) {
      throw err
    }
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

export { registerUser, userLogin, unosRacuna }