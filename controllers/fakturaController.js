import mysql from 'mysql';

const db = mysql.createPool({
  user: "root",
  host: "localhost",
  password: "divljidetektiv",
  database: "users",
  port: "3306",
  connectionLimit: 10
})

const getContractByMeterId = (req, res) => {

    const id = req.params.id
      
    const query = `SELECT * FROM ugovori WHERE idKlijent IN (SELECT idKlijent FROM brojila WHERE brojila.id = ${id})`;
  
    db.getConnection((err, connection) => {
      if (err) {
        throw err
      }
      connection.query(query, (err, rows) => {
        connection.release()
        if (!err) {
            console.log(rows)
          res.send(rows)
        } else {
          console.log(err)
        }
      })
    })
  }

  export {getContractByMeterId}