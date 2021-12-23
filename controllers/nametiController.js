import db from '../db/db.js';
import { log } from '../middleware/logFunkcija.js';

const getAllNametii = (req, res) => {

    const { name, email } = req

    const query = `SELECT *, DATE_FORMAT(vaziOd, '%d-%m-%Y') AS vaziOd, DATE_FORMAT(vaziDo, '%d-%m-%Y') AS vaziDo  FROM nameti`

    db.getConnection((error, connection) => {
        if (error) {
            throw error
        }
        connection.query(query, (err, rows) => {
            connection.release()
            if (!err) {
              log(name, email, 'GET ALL NAMETI', rows)
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })

}

const getNameti = (req, res) => {
    const id = req.params.id

    const { name, email } = req

    const query = `SELECT *, DATE_FORMAT(vaziOd, '%Y-%m-%d') AS vaziOd, DATE_FORMAT(vaziDo, '%Y-%m-%d') AS vaziDo FROM nameti WHERE id = ${id}`

    db.getConnection((error, connection) => {
        if (error) {
            throw error
        }
        connection.query(query, (err, rows) => {
            connection.release()
            if (!err) {
              log(name, email, 'GET NAMETI', rows)
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
}

const getNametePoDatumu = (req, res) => {
  const { datum } = req.query

  const { name, email } = req


  const query = `SELECT *, DATE_FORMAT(vaziOd, '%d-%m-%Y') AS vaziOd, DATE_FORMAT(vaziDo, '%d-%m-%Y') AS vaziDo FROM nameti WHERE vaziOd < '${datum}' AND ((vaziDo > '${datum}') OR vaziDo IS NULL)`

    db.getConnection((err, connection) => {
      if (err) {
        throw err
      }
      connection.query(query, (err, rows) => {
        connection.release()
        if (!err) {
          log(name, email, 'GET NAMETI PO DATUMU', rows)
          res.send(rows)
        } else {
          console.log(err)
        }
      })
    })

}

const updateNamete = async (req, res) => {
  const { nameti, idPret } = req.body

  const { name, email } = req

  const query1 = `UPDATE nameti SET vaziOd = '${nameti.vaziOd}', pdv = '${nameti.pdv}', akciza = '${nameti.akciza}', naknadaTv = '${nameti.naknada_tv}',
    naknadaEe = '${nameti.naknada_ee}', naknadaOie = '${nameti.naknada_oie}' WHERE id = ${nameti.id}`

    const query2 = `UPDATE nameti SET vaziDo = '${nameti.vaziOd}' WHERE id = ${idPret}`


    const queryPromise1 = () => {
      return new Promise((resolve, reject) => {
        db.query(query1, (error, results) => {
          if (error) {
            return reject(error)
          }
          return resolve(results)
        })
      })
    }

    const queryPromise2 = () => {
      return new Promise((resolve, reject) => {
        db.query(query2, (error, results) => {
          if (error) {
            return reject(error)
          }
          return resolve(results)
        })
      })
    }

    try {
     let promise2
     const promise1 = await queryPromise1()
     if(promise1.affectedRows == 1) {
         promise2 = await queryPromise2()
         log(name, email, 'UPDATE NAMETI', req.body)
         res.send(promise2)
     } else {
       res.send(promise1)
     }
     

     

     
    } catch (error) {
     console.log(error)
    }

}

const saveNameti = async (req, res) => {
    const {vaziOd, pdv, akciza, naknada_tv, naknada_ee, naknada_oie, id} = req.body

    const { name, email } = req
    
    const query1 = `INSERT INTO nameti ( vaziOd, pdv, naknadaTv, naknadaEe, naknadaOie, akciza )
    SELECT '${vaziOd}', '${pdv}', '${naknada_tv}', '${naknada_ee}', '${naknada_oie}', '${akciza}' 
    FROM dual
    WHERE (SELECT max(vaziOd) FROM nameti) < '${vaziOd}';`

    const query2 = `UPDATE nameti SET vaziDo = '${vaziOd}' WHERE id = ${id}`

    const queryPromise1 = () => {
        return new Promise((resolve, reject) => {
          db.query(query1, (error, results) => {
            if (error) {
              return reject(error)
            }
            return resolve(results)
          })
        })
      }

      const queryPromise2 = () => {
        return new Promise((resolve, reject) => {
          db.query(query2, (error, results) => {
            if (error) {
              return reject(error)
            }
            return resolve(results)
          })
        })
      }

      try {
       let promise2
       const promise1 = await queryPromise1()
       if(promise1.affectedRows == 1) {
           promise2 = await queryPromise2()
           log(name, email, 'SAVE NAMETI', req.body)
           res.send(promise2)
       } else {
         res.send(promise1)
       }
       

       

       
      } catch (error) {
       console.log(error)
      }
}

export { saveNameti, getAllNametii, getNameti, updateNamete, getNametePoDatumu }