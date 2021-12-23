import db from '../db/db.js';
import { log } from '../middleware/logFunkcija.js';

//Getting all contracts with mysql query
const getAllContracts = (req, res) => {

  //Taking name and email values from protect action from middleware  
  const { name, email } = req
      
  //My sql query with date formatting and taking nazivKlijenta from another table and joining into table contracts 
    const query = `SELECT b.id, k.nazivKlijenta, DATE_FORMAT(b.datumSklapanja, '%Y-%m-%d') AS datumSklapanja, DATE_FORMAT(b.datumIsteka, '%Y-%m-%d') AS datumIsteka, b.brojUgovora, b.cenaVT, b.cenaNT, b.cenaJT FROM ugovori AS b
                  LEFT JOIN klijenti AS k ON k.id = b.idKlijent`;
  
    //connecting to database
    db.getConnection((err, connection) => {
      if (err) {
        throw err
      }
      connection.query(query, (err, rows) => {
        connection.release()
        if (!err) {
          //Logging result of query and name and email from middleware
          log(name, email, 'GET ALL CONTRACTS', rows)
          //Sending back results of mysql query to frontend
          res.send(rows)
        } else {
          console.log(err)
        }
      })
    })
  }

  //Creating new contract on database
  const newContract = (req, res) => {
   
    //Destructuring values from request body from frontend action
    const { idKlijent, datumSklapanja, datumIsteka, brojUgovora, cenaVT, cenaNT, cenaJT } = req.body

    //Taking name and email values from protect action from middleware  
    const { name, email } = req
    
      let query;

      //If there is id in request body then update contract with current values if there is not create new contract in db only where current date of creating contract is bigger than latest date of contract
      if(req.body.id){
          query = `UPDATE ugovori SET idKlijent = '${idKlijent}', datumSklapanja = '${datumSklapanja}', datumIsteka = '${datumIsteka}', brojUgovora = '${brojUgovora}', cenaVT = '${cenaVT}', cenaNT = '${cenaNT}', cenaJT = '${cenaJT}'
          WHERE ugovori.id = ${req.body.id}`;
  
      } else {
            query = `INSERT INTO ugovori (idKlijent, datumSklapanja, datumIsteka, brojUgovora, cenaVT, cenaNT, cenaJT) 
           SELECT '${idKlijent}', '${datumSklapanja}', '${datumIsteka}', '${brojUgovora}', '${cenaVT}', '${cenaNT}', '${cenaJT}' 
           FROM dual
           WHERE (SELECT max(datumIsteka)  FROM ugovori WHERE idKlijent = ${idKlijent}) <'${datumSklapanja}';` 
           
      }
      
    
      //Connection with mysql
    db.getConnection((err, connection) => {
      if (err) {
        throw err
      }
      connection.query(query, (err, rows) => {
        connection.release()
        if (!err) {
          if (req.body.id) {
            //Logging update contract action to mysql with name and email of user
            log(name, email, 'UPDATE CONTRACT', req.body)
          } else {
            //Logging new contract action to mysql with name and email of user
            log(name, email, 'NEW CONTRACT', req.body)
          }
          //Sending back result to frontend
          res.send(rows)
        } else {
          console.log(err)
        }
      })
    })
  
  }

  //Getting single contract from db with mysql query
  const getSingleContract = (req, res) => {

     //Taking id from params from frontend action
    const id = req.params.id

    //Taking name and email values from protect action from middleware 
    const { name, email } = req
      
    //mysql query with date format sending back to frontend
    const query = `SELECT *, DATE_FORMAT(datumSklapanja, '%Y-%m-%d') AS datumSklapanja, DATE_FORMAT(datumIsteka, '%Y-%m-%d') AS datumIsteka FROM ugovori WHERE ugovori.id = ${id}`;
  
    //connection to db
    db.getConnection((err, connection) => {
      if (err) {
        throw err
      }
      connection.query(query, (err, rows) => {
        connection.release()
        if (!err) {
          //Logging get single client action to mysql with name and email of user
          log(name, email, 'GET SINGLE CONTRACT', rows)
          //sending single contract back to frontend
          res.send(rows)
        } else {
          console.log(err)
        }
      })
    })
  }

  //Getting single contract by single client with date that match date from specified period 
  const getSingleContractByClientId = (req, res) => {
    const {clientId, datum} = req.body

    //Taking name and email values from protect action from middleware 
    const { name, email } = req
  
    //mysql query with date formatting and matching date from frontend with date of contract in db for one client
        const query = `SELECT *, DATE_FORMAT(datumSklapanja, '%d.%m.%Y') AS datumSklapanja, DATE_FORMAT(datumIsteka, '%d.%m.%Y') AS datumIsteka FROM ugovori WHERE datumSklapanja < '${datum}' AND datumIsteka > '${datum}' AND idKlijent = ${clientId}`

      //connecting to db
      db.getConnection((err, connection) => {
      if (err) {
        throw err;
      }
      connection.query(query, (err, rows) => {
        connection.release()
        if (!err) {
          //Logging frontend action with name and email caught in middleware
          log(name, email, 'GET SINGLE CONTRACT BY CLIENT ID', req.body)
          //sending back results to frontend
          res.send(rows)
        } else {
          console.log(err)
        }
      })
    })
  }

  //deleting one contract
  const deleteSingleContract = (req, res) => {

    const id = req.params.id

    const { name, email } = req
      
    const query = `DELETE FROM ugovori WHERE ugovori.id = ${id}`;
  
    db.getConnection((err, connection) => {
      if (err) {
        throw err
      }
      connection.query(query, (err, rows) => {
        connection.release()
        if (!err) {
          log(name, email, 'DELETE SINGLE CONTRACT', 'Uspešno je obrisan ugovor...')
          res.send(rows)
        } else {
          console.log(err)
        }
      })
    })
  }

  export {getAllContracts, newContract, getSingleContract, getSingleContractByClientId, deleteSingleContract}