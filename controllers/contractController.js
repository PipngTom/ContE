import db from '../db/db.js';

const getAllContracts = (req, res) => {
      
    const query = `SELECT b.id, k.nazivKlijenta, b.datumSklapanja, b.datumIsteka, b.cenaVT, b.cenaNT, b.cenaJT FROM ugovori AS b
                  LEFT JOIN klijenti AS k ON k.id = b.idKlijent`;
  
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

  const newContract = (req, res) => {
    const { idKlijent, datumSklapanja, datumIsteka, cenaVT, cenaNT, cenaJT } = req.body
      let query;
      if(req.body.id){
          query = `UPDATE ugovori SET idKlijent = '${idKlijent}', datumSklapanja = '${datumSklapanja}', datumIsteka = '${datumIsteka}', cenaVT = '${cenaVT}', cenaNT = '${cenaNT}', cenaJT = '${cenaJT}'
          WHERE ugovori.id = ${req.body.id}`;
  
      } else {
          query = `INSERT INTO ugovori (idKlijent, datumSklapanja, datumIsteka, cenaVT, cenaNT, cenaJT) 
          VALUES ('${idKlijent}', '${datumSklapanja}', '${datumIsteka}', '${cenaVT}', '${cenaNT}', '${cenaJT}')`;
      }
    
  
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

  const getSingleContract = (req, res) => {

    const id = req.params.id
      
    const query = `SELECT * FROM ugovori WHERE ugovori.id = ${id}`;
  
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

  const getSingleContractByClientId = (req, res) => {
    const id = req.params.id

    const query = `SELECT * FROM ugovori WHERE idKlijent = ${id}`

    db.getConnection((err, connection) => {
      if (err) {
        throw err;
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

  const deleteSingleContract = (req, res) => {

    const id = req.params.id
      
    const query = `DELETE FROM ugovori WHERE ugovori.id = ${id}`;
  
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

  export {getAllContracts, newContract, getSingleContract, getSingleContractByClientId, deleteSingleContract}