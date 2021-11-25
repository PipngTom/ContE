import db from '../db/db.js';

const getAllMrezarina = (req, res) => {
  const query = `SELECT *, DATE_FORMAT(vaziOd, '%d-%m-%Y') AS vaziOd, DATE_FORMAT(vaziDo, '%d-%m-%Y') AS vaziDo FROM mrezarina`
''
  db.getConnection((err, connection) => {
    if (err) {
      throw err
    }
    connection.query(query, (err, rows) => {
      connection.release()
      if (!err) {
        console.log(rows)
        res.send(rows)
      } else {
        console.log(err)
      }
    })
  })
}

const getMrezarina = (req, res) => {

      
    const query = `SELECT * FROM mrezarina`;
  
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

  const updateMrezarina = (req, res) => {

    
     let query;
    const setColumns = Object.keys(req.body).reduce((acc, cur, index, array)=>{
        if(index===array.length-1){
            return `${acc} ${cur} = '${req.body[cur]}'`
        } else {
            return `${acc} ${cur} = '${req.body[cur]}', `
        }
    },'')
    query = `UPDATE mrezarina SET ${setColumns}
      WHERE mrezarina.id = ${req.body.id}`;  



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

const saveMrezarina = async (req, res) => {
  const { datum, srednji_napon_vt, srednji_napon_reak, srednji_napon_odosnaga, 
        srednji_napon_nt, srednji_napon_prereak, srednji_napon_prekosnaga,
        niski_napon_vt, niski_napon_reak, niski_napon_odosnaga, niski_napon_nt,
        niski_napon_prereak, niski_napon_prekosnaga, sp_dvotarifno_vt, sp_dvotarifno_nt, sp_dvotarifno_odosnaga,
        sp_domacinstvo_vt, sp_domacinstvo_nt, sp_domacinstvo_odosnaga, sp_jednotarifno_jt, sp_jednotarifno_odosnaga,
        jr_jt, pdv, akciza, naknada_tv, naknada_ee, naknada_oie, idZadnje } = req.body
  

        const query1 = `INSERT INTO mrezarina (vaziOd, srednji_napon_vt, srednji_napon_reak, srednji_napon_odosnaga, 
          srednji_napon_nt, srednji_napon_prereak, srednji_napon_prekosnaga,
          niski_napon_vt, niski_napon_reak, niski_napon_odosnaga, niski_napon_nt,
          niski_napon_prereak, niski_napon_prekosnaga, sp_dvotarifno_vt, sp_dvotarifno_nt, sp_dvotarifno_odosnaga,
          sp_domacinstvo_vt, sp_domacinstvo_nt, sp_domacinstvo_odosnaga, sp_jednotarifno_jt, sp_jednotarifno_odosnaga,
          jr_jt, pdv, akciza, naknada_tv, naknada_ee, naknada_oie) VALUES ('${datum}', '${srednji_napon_vt}', '${srednji_napon_reak}', 
          '${srednji_napon_odosnaga}', '${srednji_napon_nt}', '${srednji_napon_prereak}', '${srednji_napon_prekosnaga}', '${niski_napon_vt}',
          '${niski_napon_reak}', '${niski_napon_odosnaga}', '${niski_napon_nt}', '${niski_napon_prereak}', '${niski_napon_prekosnaga}', '${sp_dvotarifno_vt}',
          '${sp_dvotarifno_nt}', '${sp_dvotarifno_odosnaga}', '${sp_domacinstvo_vt}', '${sp_domacinstvo_nt}', '${sp_domacinstvo_odosnaga}', 
          '${sp_jednotarifno_jt}', '${sp_jednotarifno_odosnaga}', '${jr_jt}', '${pdv}', '${akciza}', '${naknada_tv}', '${naknada_ee}', '${naknada_oie}')`

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
          }
          

          

          res.send(promise2)
         } catch (error) {
          console.log(error)
         }

}

  export { getAllMrezarina, getMrezarina, updateMrezarina, saveMrezarina }