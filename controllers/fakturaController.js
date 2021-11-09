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
          res.send(rows)
        } else {
          console.log(err)
        }
      })
    })
  }

  const rezervnaFaktura = (req, res) => {
    const faktura  = req.body
    console.log(faktura)
    const query = `INSERT INTO faktura (idKlijenta, bFaktura, mesec, godina) VALUES ( '${faktura.zbirniRacun.idKlijenta}', '${JSON.stringify(faktura)}', '${faktura.zbirniRacun.mesec}', '${faktura.zbirniRacun.godina}')`

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

  const getRezervnaFaktura = (req, res) => {
    const {idKlijenta, mesec, godina} = req.query
    const query = `SELECT bfaktura FROM faktura 
    WHERE  idKlijenta = ${idKlijenta} AND mesec = ${mesec} AND godina = ${godina}`

    db.getConnection((err, connection) => {
      if (err) {
        throw err
      }
      connection.query(query, (err, rows) => {
        connection.release()
        if (!err) {
          console.log('UPAOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO')
          console.log(rows)
          console.log(JSON.parse(rows[0].bfaktura))
          const rezultat = JSON.parse(rows[0].bfaktura)
          
          res.send(rezultat)
        } else {
          console.log(err)
        }
      })
    })
    //const {idBrojila, mesec, godina} = req.query
  }

  export {getContractByMeterId, rezervnaFaktura, getRezervnaFaktura}