import db from '../db/db.js';
import { log } from '../middleware/logFunkcija.js';

const getAllContracts = (req, res) => {

  const { name, email } = req
      
    const query = `SELECT b.id, k.nazivKlijenta, DATE_FORMAT(b.datumSklapanja, '%Y-%m-%d') AS datumSklapanja, DATE_FORMAT(b.datumIsteka, '%Y-%m-%d') AS datumIsteka, b.brojUgovora, b.cenaVT, b.cenaNT, b.cenaJT FROM ugovori AS b
                  LEFT JOIN klijenti AS k ON k.id = b.idKlijent`;
  
    db.getConnection((err, connection) => {
      if (err) {
        throw err
      }
      connection.query(query, (err, rows) => {
        connection.release()
        if (!err) {
          log(name, email, 'GET ALL CONTRACTS', rows)
          res.send(rows)
        } else {
          console.log(err)
        }
      })
    })
  }

  const newContract = (req, res) => {
    const { idKlijent, datumSklapanja, datumIsteka, brojUgovora, cenaVT, cenaNT, cenaJT } = req.body
    
      let query;
      if(req.body.id){
          query = `UPDATE ugovori SET idKlijent = '${idKlijent}', datumSklapanja = '${datumSklapanja}', datumIsteka = '${datumIsteka}', brojUgovora = '${brojUgovora}', cenaVT = '${cenaVT}', cenaNT = '${cenaNT}', cenaJT = '${cenaJT}'
          WHERE ugovori.id = ${req.body.id}`;
  
      } else {
            query = `INSERT INTO ugovori (idKlijent, datumSklapanja, datumIsteka, brojUgovora, cenaVT, cenaNT, cenaJT) 
           SELECT '${idKlijent}', '${datumSklapanja}', '${datumIsteka}', '${brojUgovora}', '${cenaVT}', '${cenaNT}', '${cenaJT}' 
           FROM dual
           WHERE (SELECT max(datumIsteka)  FROM ugovori WHERE idKlijent = ${idKlijent}) <'${datumSklapanja}';` 
           
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

    const { name, email } = req
      
    const query = `SELECT *, DATE_FORMAT(datumSklapanja, '%Y-%m-%d') AS datumSklapanja, DATE_FORMAT(datumIsteka, '%Y-%m-%d') AS datumIsteka FROM ugovori WHERE ugovori.id = ${id}`;
  
    db.getConnection((err, connection) => {
      if (err) {
        throw err
      }
      connection.query(query, (err, rows) => {
        connection.release()
        if (!err) {
          log(name, email, 'GET SINGLE CONTRACT', rows)
          res.send(rows)
        } else {
          console.log(err)
        }
      })
    })
  }

  const getSingleContractByClientId = (req, res) => {
    const {clientId, datum} = req.body
  
        const query = `SELECT *, DATE_FORMAT(datumSklapanja, '%d.%m.%Y') AS datumSklapanja, DATE_FORMAT(datumIsteka, '%d.%m.%Y') AS datumIsteka FROM ugovori WHERE datumSklapanja < '${datum}' AND datumIsteka > '${datum}' AND idKlijent = ${clientId}`
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