import db from '../db/db.js';
import { log } from '../middleware/logFunkcija.js';

//Creating new client and updating existing one in mysql with values from frontend and with mysql query
const newClient = (req, res) => {

  //Taking name and email values from protect action from middleware  
  const { name, email } = req
  
  //Destructuring values from request body from frontend action
  const { nazivKlijenta, adresaKlijenta, postanskiBroj, opstina, kontaktMail, kontaktTelefon, pib, glavniPibUgovora, maticniBroj, pdv, nazivBanke, racunBanka, odgovornoLice, kontaktOsoba, sajt, firma, balansOdg, podUgovorom, zbirniRacun, tipPotrosaca } = req.body
    let query;
    //If there is id in request body then update client with current values if there is not create new client in db
    if(req.body.id){
        query = `UPDATE klijenti SET nazivKlijenta = '${nazivKlijenta}', adresaKlijenta = '${adresaKlijenta}', postanskiBroj = '${postanskiBroj}', opstina = '${opstina}',kontaktMail = '${kontaktMail}', kontaktTelefon = '${kontaktTelefon}', pib = '${pib}', glavniPibUgovora = '${glavniPibUgovora}',maticniBroj = '${maticniBroj}', pdv = '${pdv}',nazivBanke = '${nazivBanke}', racunBanka = '${racunBanka}', odgovornoLice = '${odgovornoLice}',
       kontaktOsoba = '${kontaktOsoba}', sajt = '${sajt}', firma = ${firma}, uBalansnojOdgovornosti = ${balansOdg}, podUgovorom = ${podUgovorom} ,zbirniRacun = ${zbirniRacun}, tipPotrosaca = '${tipPotrosaca}' WHERE klijenti.id = ${req.body.id}`;

    } else {
        query = `INSERT INTO klijenti (nazivKlijenta, adresaKlijenta, postanskiBroj, opstina, kontaktMail, kontaktTelefon, pib, glavniPibUgovora, maticniBroj, pdv, nazivBanke, odgovornoLice, kontaktOsoba, racunBanka, sajt, firma, uBalansnojOdgovornosti, podUgovorom, zbirniRacun, tipPotrosaca) 
        VALUES ('${nazivKlijenta}', '${adresaKlijenta}', '${postanskiBroj}', '${opstina}', '${kontaktMail}', '${kontaktTelefon}', '${pib}', '${glavniPibUgovora}','${maticniBroj}', '${pdv}','${nazivBanke}', '${odgovornoLice}', '${kontaktOsoba}','${racunBanka}', '${sajt}', ${firma}, ${balansOdg}, ${podUgovorom}, ${zbirniRacun}, ${tipPotrosaca})`;
    }
  
//Connection with mysql
  db.getConnection((err, connection) => {
    if (err) {
      throw err
    }
    connection.query(query, (err, rows) => {
      connection.release()
      if (!err) {
        if(req.body.id) {
          //Logging update client action to mysql with name and email of user
          log(name, email, 'UPDATE CLIENT', req.body)
        } else {
          //Logging new client action to mysql with name and email of user
          log(name, email, 'NEW CLIENT', req.body)
        }
        //Sending back result to frontend
        res.send(rows)
      } else {
        console.log(err)
      }
    })
  })

}

//Getting all clients from mysql with mysql query
const getAllClients = (req, res) => {

  //Taking name and email values from protect action from middleware 
    const { name, email } = req
      
    const query = `SELECT * FROM klijenti`;
  
    //Connection with mysql
    db.getConnection((err, connection) => {
      if (err) {
        throw err
      }
      connection.query(query, (err, rows) => {
        connection.release()
        if (!err) {
          //Logging get all clients action to mysql with name and email of user
          log(name, email, 'GET ALL CLIENTS', rows)
          //Sending all clients to frontend
          res.send(rows)
        } else {
          console.log(err)
        }
      })
    })
  }

  //Getting single client from mysql with myql query
  const getSingleClient = (req, res) => {

    //Taking name and email values from protect action from middleware 
    const {name, email} = req

    //Taking id from params from frontend action
    const id = req.params.id
      
    const query = `SELECT * FROM klijenti WHERE klijenti.id = ${id}`;
  
    //Connection with mysql
    db.getConnection((err, connection) => {
      if (err) {
        throw err
      }
      connection.query(query, (err, rows) => {
        connection.release()
        if (!err) {
          //Logging get single client action to mysql with name and email of user
          log(name, email, 'GET SINGLE CLIENT', rows)
          //Sending single client to frontend
          res.send(rows)
        } else {
          console.log(err)
        }
      })
    })
  }

  //Getting single client by meter id from mysql with mysql query and id from params from frontend
  const getSingleClientByMeterId = (req, res) => {

    //Taking id from params from frontend action
    const id = req.params.id

    //Taking name and email values from protect action from middleware 
    const { name, email } = req

    const query = `SELECT * FROM users.klijenti WHERE id in (SELECT idKlijent FROM users.brojila WHERE id=${id})`

    //Connection with mysql
    db.getConnection((err, connection) => {
      if (err) {
        throw err;
      }
      connection.query(query, (err, rows) => {
        connection.release()
        if (!err) {
          //Logging get single client by meter id action to mysql with name and email of user
          log(name, email, 'GET CLIENT BY METERID', rows)
          //Sending single client to frontend
          res.send(rows)
        } else {
          console.log(err)
        }
      })
    })
  }

  //Deleting single client from mysql with mysql query and id of client from frontend
  const deleteSingleClient = (req, res) => {

    //Taking params from frontend action
    const id = req.params.id

    //Taking name and email values from protect action from middleware 
    const { name, email } = req
      
    const query = `DELETE FROM klijenti WHERE id = ${id}`;
  
    //Connection with mysql
    db.getConnection((err, connection) => {
      if (err) {
        throw err
      }
      connection.query(query, (err, rows) => {
        connection.release()
        if (!err) {
          //Logging delete single client by id action to mysql with name and email of user
          log(name, email, 'DELETE CLIENT', 'Uspešno je obrisan klijent...')
          //Sending result without deleted client to frontend
          res.send(rows)
        } else {
          console.log(err)
        }
      })
    })
  }

export { newClient, getAllClients, getSingleClient, getSingleClientByMeterId, deleteSingleClient }