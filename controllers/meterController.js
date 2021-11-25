import db from '../db/db.js';

const getAllMeters = (req, res) => {
      
    const query = `SELECT b.id, k.nazivKlijenta, b.mestoMerenja, b.adresaMerenja, b.kategorija, b.vrstaSnabdevanja, b.taksa FROM brojila AS b
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

  const getAllMetersByKlijentId = (req, res) => {
    const id = req.params.id

    const query = `SELECT * FROM brojila WHERE idKlijent = ${id}`

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

  const newMeter = (req, res) => {
    const { idKlijent, mestoMerenja, adresaMerenja, kategorija, vrstaSnabdevanja } = req.body.brojilo
    const taksa  = req.body.taksa
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
          res.send(rows)
        } else {
          console.log(err)
        }
      })
    })
  
  }

  const getSingleMeter = (req, res) => {

    const id = req.params.id
      
    const query = `SELECT * FROM brojila WHERE brojila.id = ${id}`;
  
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

  const deleteSingleMeter = (req, res) => {

    const id = req.params.id
      
    const query = `DELETE FROM brojila WHERE brojila.id = ${id}`;
  
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

  export {getAllMeters, newMeter, getSingleMeter, deleteSingleMeter, getAllMetersByKlijentId}