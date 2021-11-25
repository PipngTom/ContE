import bcrypt from "bcryptjs";
import db from '../db/db.js';
import generateToken from "../utils/generateToken.js";
const saltRounds = 10;



const registerUser = (req, res) => {
  const { name, email, password } = req.body
  
  bcrypt.hash(password, saltRounds, (err, hash) => {
    const mess = `SELECT * from user WHERE email = '${email}'`
    
    db.getConnection((err, connection ) => {
      if (err) {
        throw err;
      } 
      
      connection.query(mess, (err, rows) => {
        if (!err) {
          if(!rows.length){
            const query = `INSERT INTO user (name, email, password) VALUES ('${name}', '${email}', '${hash}')`;
            connection.query(query, (err, rows) => {
              connection.release()
              if (!err) {
                res.send(rows)
  
              } else {
                console.log(err)
              }
            })
          }else{
            return res.send('Već postoji korisnik sa ovim email-om !!!')
          }
          
        } else {
          console.log(err)
        }
      })
    })
  })
    



}

const userLogin = (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM user WHERE email = '${email}'` 
  db.getConnection((err, connection) => {
    if (err) {
      throw err;
    }
    connection.query(query ,(err, rows) => {
      connection.release()
      if (!err) {
        bcrypt.compare(password, rows[0].password, (error, response) => {
          if (response) {
            const id = rows[0].id
            
            res.send({data: rows, token: generateToken(id)})

          } else {
            res.send({message: 'Wrong username/password combination !'})
          }
        })
      } else {
        console.log(err)
      }
    })
  })
}

const unosRacuna = (req, res) => {
  const { maxSnaga, odSnaga, prekSnaga, akEnergijaV, akEnergijaN, reaktEnergija, prekReaktEnergija, datumpStanja, datumkStanja } = req.body

  const query = `INSERT INTO racuni (maxSnaga, odSnaga, prekSnaga, akEnergijaV, akEnergijaN, reaktEnergija, prekReaktEnergija, datumpStanja, datumkStanja) VALUES ('${maxSnaga}', '${odSnaga}', '${prekSnaga}', '${akEnergijaV}', '${akEnergijaN}', '${reaktEnergija}', '${prekReaktEnergija}', '${datumpStanja}', '${datumkStanja}')`;

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

export { registerUser, userLogin, unosRacuna }