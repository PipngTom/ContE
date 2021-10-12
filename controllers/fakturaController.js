import db from '../db/db.js';

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