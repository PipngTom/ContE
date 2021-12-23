import db from '../db/db.js';
import { log } from '../middleware/logFunkcija.js'

const getAllMeters = (req, res) => {

  const { name, email } = req
      
    const query = `SELECT b.id, k.nazivKlijenta, b.mestoMerenja, b.adresaMerenja, b.kategorija, b.vrstaSnabdevanja, b.taksa FROM brojila AS b
                  LEFT JOIN klijenti AS k ON k.id = b.idKlijent`;
  
    db.getConnection((err, connection) => {
      if (err) {
        throw err
      }
      connection.query(query, (err, rows) => {
        connection.release()
        if (!err) {
          log(name, email, 'GET ALL METERS', rows)
          res.send(rows)
        } else {
          console.log(err)
        }
      })
    })
  }

  const getAllMetersByKlijentId = (req, res) => {
    const id = req.params.id

    const { name, email } = req

    const query = `SELECT * FROM brojila WHERE idKlijent = ${id}`

    db.getConnection((err, connection) => {
      if (err) {
        throw err;
      }
      connection.query(query, (err, rows) => {
        connection.release()
        if (!err) {
          log(name, email, 'GET ALL METERS BY CLIENT ID', rows)
          res.send(rows)
        } else {
          console.log(err)
        }
      })
    })
  }

  const newMeter = (req, res) => {
    const { idKlijent, mestoMerenja, adresaMerenja, kategorija, vrstaSnabdevanja } = req.body.brojilo

    const taksa  = req.body.taksa

    const { name, email } = req

      let query;
      if(req.body.id){
          query = `UPDATE brojila SET idKlijent = '${idKlijent}', mestoMerenja = '${mestoMerenja}', adresaMerenja = '${adresaMerenja}', kategorija = '${kategorija}', vrstaSnabdevanja = '${vrstaSnabdevanja}', taksa = ${taksa}
          WHERE brojila.id = ${req.body.id}`;
  
      } else {
          query = `INSERT INTO brojila (idKlijent, mestoMerenja, adresaMerenja, kategorija, vrstaSnabdevanja, taksa) 
          VALUES ('${idKlijent}', '${mestoMerenja}', '${adresaMerenja}', '${kategorija}', '${vrstaSnabdevanja}', ${taksa})`;
      }
    
  
    db.getConnection((err, connection) => {
      if (err) {
        throw err
      }
      connection.query(query, (err, rows) => {
        connection.release()
        if (!err) {
          if (req.body.id) {
            log(name, email, 'UPDATE METER', req.body)
          } else {
            log(name, email, 'NEW METER', req.body)
          }
          res.send(rows)
        } else {
          console.log(err)
        }
      })
    })
  
  }

  const getSingleMeter = (req, res) => {

    const { name, email } = req

    const id = req.params.id
      
    const query = `SELECT * FROM brojila WHERE brojila.id = ${id}`;
  
    db.getConnection((err, connection) => {
      if (err) {
        throw err
      }
      connection.query(query, (err, rows) => {
        connection.release()
        if (!err) {
          log(name, email, 'GET SINGLE METER', rows)
          res.send(rows)
        } else {
          console.log(err)
        }
      })
    })
  }

  const deleteSingleMeter = (req, res) => {

    const id = req.params.id

    const { name, email } = req
      
    const query = `DELETE FROM brojila WHERE brojila.id = ${id}`;
  
    db.getConnection((err, connection) => {
      if (err) {
        throw err
      }
      connection.query(query, (err, rows) => {
        connection.release()
        if (!err) {
          log(name, email, 'DELETE SINGLE METER', 'Uspešno je obrisano ovo brojilo...')
          res.send(rows)
        } else {
          console.log(err)
        }
      })
    })
  }

  export {getAllMeters, newMeter, getSingleMeter, deleteSingleMeter, getAllMetersByKlijentId}