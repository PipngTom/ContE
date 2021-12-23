import db from '../db/db.js';
import { log } from '../middleware/logFunkcija.js';

const getAllMrezarina = (req, res) => {
  
  const { name, email } = req 

  const query = `SELECT *, DATE_FORMAT(vaziOd, '%d-%m-%Y') AS vaziOd, DATE_FORMAT(vaziDo, '%d-%m-%Y') AS vaziDo FROM mrezarina`
''
  db.getConnection((err, connection) => {
    if (err) {
      throw err
    }
    connection.query(query, (err, rows) => {
      connection.release()
      if (!err) {
          log(name, email, 'GET ALL MREZARINA', rows)
           res.send(rows)
      } else {
        console.log(err)
      }
    })
  })
}

const getMrezarina = (req, res) => {
   
     const id = req.params.id

     const { name, email } = req
      
    const query = `SELECT * , DATE_FORMAT(vaziOd, '%Y-%m-%d') AS vaziOd, DATE_FORMAT(vaziDo, '%Y-%m-%d') AS vaziDo FROM mrezarina WHERE id = ${id}`;
  
    db.getConnection((err, connection) => {
      if (err) {
        throw err
      }
      connection.query(query, (err, rows) => {
        connection.release()
        if (!err) {
          log(name, email, 'GET MREZARINA', rows)
          res.send(rows)
        } else {
          console.log(err)
        }
      })
    })
  }

  const getMrezarinaPoDat = (req, res) => {
    const {datum} = req.query

    const { name, email } = req

    const query = `SELECT *, DATE_FORMAT(vaziOd, '%d-%m-%Y') AS vaziOd, DATE_FORMAT(vaziDo, '%d-%m-%Y') AS vaziDo FROM mrezarina WHERE vaziOd < '${datum}' AND ((vaziDo > '${datum}') OR vaziDo IS NULL)`

    db.getConnection((err, connection) => {
      if (err) {
        throw err
      }
      connection.query(query, (err, rows) => {
        connection.release()
        if (!err) {
        
          log(name, email, 'GET MREZARINA PO DATUMU', rows)
          res.send(rows)
        } else {
          console.log(err)
        }
      })
    })

  }

  const updateMrezarina = async (req, res) => {


    const {idpret, mrezarina} = req.body
    
    const { name, email } = req

    const setColumns = Object.keys(mrezarina).reduce((acc, cur, index, array)=>{
      if(cur!== 'vaziDo'){
        if(index===array.length-1){
            return `${acc} ${cur} = '${mrezarina[cur]}'`
        } else {
            return `${acc} ${cur} = '${mrezarina[cur]}', `
        }
      } else {
        return acc;
      }
    },'')

    const query1 = `UPDATE mrezarina SET ${setColumns}
      WHERE mrezarina.id = ${mrezarina.id}`;  

      const query2 = `UPDATE mrezarina SET vaziDo = '${mrezarina.vaziOd}' WHERE id = ${idpret}`

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
           log(name, email, 'UPDATE MREZARINA', req.body)
           res.send(promise2)
       } else {
         res.send(promise1)
       }
       

       

       
      } catch (error) {
       console.log(error)
      }

}

const saveMrezarina = async (req, res) => {
  
  const { datum, srednji_napon_vt, srednji_napon_reak, srednji_napon_odosnaga, 
        srednji_napon_nt, srednji_napon_prereak, srednji_napon_prekosnaga,
        niski_napon_vt, niski_napon_reak, niski_napon_odosnaga, niski_napon_nt,
        niski_napon_prereak, niski_napon_prekosnaga, sp_dvotarifno_vt, sp_dvotarifno_nt, sp_dvotarifno_odosnaga,
        sp_domacinstvo_vt, sp_domacinstvo_nt, sp_domacinstvo_odosnaga, sp_jednotarifno_jt, sp_jednotarifno_odosnaga,
        jr_jt, idZadnje } = req.body
  
        const { name, email } = req
        
        const query1 = `INSERT INTO mrezarina (vaziOd, srednji_napon_vt, srednji_napon_reak, srednji_napon_odosnaga, 
          srednji_napon_nt, srednji_napon_prereak, srednji_napon_prekosnaga,
          niski_napon_vt, niski_napon_reak, niski_napon_odosnaga, niski_napon_nt,
          niski_napon_prereak, niski_napon_prekosnaga, sp_dvotarifno_vt, sp_dvotarifno_nt, sp_dvotarifno_odosnaga,
          sp_domacinstvo_vt, sp_domacinstvo_nt, sp_domacinstvo_odosnaga, sp_jednotarifno_jt, sp_jednotarifno_odosnaga,
          jr_jt) 
          SELECT '${datum}', '${srednji_napon_vt}', '${srednji_napon_reak}', 
          '${srednji_napon_odosnaga}', '${srednji_napon_nt}', '${srednji_napon_prereak}', '${srednji_napon_prekosnaga}', '${niski_napon_vt}',
          '${niski_napon_reak}', '${niski_napon_odosnaga}', '${niski_napon_nt}', '${niski_napon_prereak}', '${niski_napon_prekosnaga}', '${sp_dvotarifno_vt}',
          '${sp_dvotarifno_nt}', '${sp_dvotarifno_odosnaga}', '${sp_domacinstvo_vt}', '${sp_domacinstvo_nt}', '${sp_domacinstvo_odosnaga}', 
          '${sp_jednotarifno_jt}', '${sp_jednotarifno_odosnaga}', '${jr_jt}' 
          FROM dual
          WHERE (SELECT max(vaziOd) FROM mrezarina) < '${datum}';`

          const query2 = `UPDATE mrezarina SET vaziDo = '${datum}' WHERE id = ${idZadnje}`
          
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
              log(name, email, 'NEW MREZARINA', req.body)
              res.send(promise2)
          } else {
            res.send(promise1)
          }
          

          

          
         } catch (error) {
          console.log(error)
         }

}

  export { getAllMrezarina, getMrezarina, updateMrezarina, saveMrezarina, getMrezarinaPoDat }