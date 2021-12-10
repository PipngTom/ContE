import db from '../db/db.js';
import { log } from '../middleware/logFunkcija.js';

const newClient = (req, res) => {

  const { name, email } = req
  
  const { nazivKlijenta, adresaKlijenta, postanskiBroj, opstina, kontaktMail, kontaktTelefon, pib, glavniPibUgovora, maticniBroj, pdv, nazivBanke, racunBanka, odgovornoLice, kontaktOsoba, sajt, firma, balansOdg, podUgovorom, zbirniRacun, tipPotrosaca } = req.body
    let query;
    if(req.body.id){
        query = `UPDATE klijenti SET nazivKlijenta = '${nazivKlijenta}', adresaKlijenta = '${adresaKlijenta}', postanskiBroj = '${postanskiBroj}', opstina = '${opstina}',kontaktMail = '${kontaktMail}', kontaktTelefon = '${kontaktTelefon}', pib = '${pib}', glavniPibUgovora = '${glavniPibUgovora}',maticniBroj = '${maticniBroj}', pdv = '${pdv}',nazivBanke = '${nazivBanke}', racunBanka = '${racunBanka}', odgovornoLice = '${odgovornoLice}',
       kontaktOsoba = '${kontaktOsoba}', sajt = '${sajt}', firma = ${firma}, uBalansnojOdgovornosti = ${balansOdg}, podUgovorom = ${podUgovorom} ,zbirniRacun = ${zbirniRacun}, tipPotrosaca = '${tipPotrosaca}' WHERE klijenti.id = ${req.body.id}`;

    } else {
        query = `INSERT INTO klijenti (nazivKlijenta, adresaKlijenta, postanskiBroj, opstina, kontaktMail, kontaktTelefon, pib, glavniPibUgovora, maticniBroj, pdv, nazivBanke, odgovornoLice, kontaktOsoba, racunBanka, sajt, firma, uBalansnojOdgovornosti, podUgovorom, zbirniRacun, tipPotrosaca) 
        VALUES ('${nazivKlijenta}', '${adresaKlijenta}', '${postanskiBroj}', '${opstina}', '${kontaktMail}', '${kontaktTelefon}', '${pib}', '${glavniPibUgovora}','${maticniBroj}', '${pdv}','${nazivBanke}', '${odgovornoLice}', '${kontaktOsoba}','${racunBanka}', '${sajt}', ${firma}, ${balansOdg}, ${podUgovorom}, ${zbirniRacun}, ${tipPotrosaca})`;
    }
  

  db.getConnection((err, connection) => {
    if (err) {
      throw err
    }
    connection.query(query, (err, rows) => {
      connection.release()
      if (!err) {
        if(req.body.id) {
          log(name, email, 'UPDATE CLIENT', req.body)
        } else {
          log(name, email, 'NEW CLIENT', req.body)
        }

        res.send(rows)
      } else {
        console.log(err)
      }
    })
  })

}

const getAllClients = (req, res) => {

    const { name, email } = req
      
    const query = `SELECT * FROM klijenti`;
  
    db.getConnection((err, connection) => {
      if (err) {
        throw err
      }
      connection.query(query, (err, rows) => {
        connection.release()
        if (!err) {
          log(name, email, 'GET ALL CLIENTS', rows)
          res.send(rows)
        } else {
          console.log(err)
        }
      })
    })
  }

  const getSingleClient = (req, res) => {

    const {name, email} = req

    const id = req.params.id
      
    const query = `SELECT * FROM klijenti WHERE klijenti.id = ${id}`;
  
    db.getConnection((err, connection) => {
      if (err) {
        throw err
      }
      connection.query(query, (err, rows) => {
        connection.release()
        if (!err) {
          log(name, email, 'GET SINGLE CLIENT', rows)
          res.send(rows)
        } else {
          console.log(err)
        }
      })
    })
  }

  const getSingleClientByMeterId = (req, res) => {
    const id = req.params.id

    const { name, email } = req

    const query = `SELECT * FROM users.klijenti WHERE id in (SELECT idKlijent FROM users.brojila WHERE id=${id})`

    db.getConnection((err, connection) => {
      if (err) {
        throw err;
      }
      connection.query(query, (err, rows) => {
        connection.release()
        if (!err) {
          log(name, email, 'GET CLIENT BY METERID', rows)
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

export { newClient, getAllClients, getSingleClient, getSingleClientByMeterId, deleteSingleClient }