import mysql from 'mysql';

const db = mysql.createPool({
  user: "root",
  host: "localhost",
  password: "password",
  database: "users",
  port: "3306",
  connectionLimit: 10
})

const newClient = (req, res) => {
  const { nazivKlijenta, adresaKlijenta, kontaktMail, kontaktTelefon, pib, maticniBroj, nazivBanke, racunBanka } = req.body
    let query;
    if(req.body.id){
        query = `UPDATE klijenti SET nazivKlijenta = '${nazivKlijenta}', adresaKlijenta = '${adresaKlijenta}', kontaktMail = '${kontaktMail}', kontaktTelefon = '${kontaktTelefon}', pib = '${pib}', maticniBroj = '${maticniBroj}', nazivBanke = '${nazivBanke}', racunBanka = '${racunBanka}'
        WHERE klijenti.id = ${req.body.id}`;

    } else {
        query = `INSERT INTO klijenti (nazivKlijenta, adresaKlijenta, kontaktMail, kontaktTelefon, pib, maticniBroj, nazivBanke, racunBanka) 
        VALUES ('${nazivKlijenta}', '${adresaKlijenta}', '${kontaktMail}', '${kontaktTelefon}', '${pib}', '${maticniBroj}', '${nazivBanke}', '${racunBanka}')`;
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

const getAllClients = (req, res) => {
      
    const query = `SELECT * FROM klijenti`;
  
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

  const getSingleClient = (req, res) => {

    const id = req.params.id
      
    const query = `SELECT * FROM klijenti WHERE klijenti.id = ${id}`;
  
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

  const deleteSingleClient = (req, res) => {

    const id = req.params.id
      
    const query = `DELETE FROM klijenti WHERE klijenti.id = ${id}`;
  
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

export { newClient, getAllClients, getSingleClient, deleteSingleClient }