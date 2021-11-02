import db from '../db/db.js';

const newMetering = (req, res) => {

   
        const { colone, tabela, meterId } = req.body
      let query;
      if(req.body.id){
        const setColumns = Object.keys(req.body.colone).reduce((acc, cur, index, array)=>{
            if(index===array.length-1){
                return `${acc} ${cur} = '${req.body.colone[cur]}'`
            } else {
                return `${acc} ${cur} = '${req.body.colone[cur]}', `
            }
        },'')
        query = `UPDATE ${tabela} SET ${setColumns}
          WHERE ${tabela}.id = ${req.body.id}`; 
        console.log(query)
  
      } else {
        
        const columns= Object.keys(req.body.colone).reduce((acc, cur, index, array)=>{
            if(cur==='id'){
                return  acc
            }
            if(index===array.length-1){
                return `${acc} ${cur}`
            } else {
                return `${acc} ${cur}, `
            }
        },'')
    
        const values = Object.keys(req.body.colone).reduce((acc, cur, index, array)=>{
            if(cur==='id'){
                return  acc
            }
            if(index===array.length-1){
                return `${acc} '${req.body.colone[cur]}'`
            } else {
                return `${acc} '${req.body.colone[cur]}', `
            }
        },'')
          query = `INSERT INTO ${tabela} (${columns}, idBrojilo) VALUES (${values}, ${meterId})`;
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
          console.log(err.sqlMessage)
         // res.status(404)
          res.json({err: err.sqlMessage})
        }
      })
    })
  
  }

  const getAllMeteringByMeterId = (req, res) => {

    const {id, tabela} = req.body
    
      
    const query = `SELECT *, DATE_FORMAT(datumpoc, '%d.%m.%Y') AS datumpoc, DATE_FORMAT(datumkr, '%d.%m.%Y') AS datumkr FROM ${tabela} WHERE idBrojilo = ${id}`;
  
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

  const getMeteringByMeterIds = (req, res) => {

    const {datum: mesec, selectedMeters: primer} = req.body
  //  const primer =  [{id:12, tabela: 'merenja_srednji_napon'}, {id:16, tabela: 'merenja_srednji_napon'}, {id: 14, tabela: 'merenja_sp_jednotarifno'}] 
  //  const mesec = '2021-08-15'
    //AND DATE(${mesec})<=datumkr AND DATE(${mesec})>=datumpoc
    //14 Promises with queries are dynamically generated
    //DATE_FORMAT(m.datumpoc, '%Y-%m-%d') AS datumpoc, DATE_FORMAT(m.datumkr, '%Y-%m-%d') AS datumkr
    //LEFT JOIN brojila AS b ON b.id = m.idBrojilo idBrojilo = ${item.id} AND WHERE DATE('${mesec}')<=m.datumkr AND DATE('${mesec}')>=m.datumpoc
    const queryPromises = primer.map((item)=>{
      const query = `SELECT m.*, DATE_FORMAT(m.datumpoc, '%Y-%m-%d') AS datumpoc, DATE_FORMAT(m.datumkr, '%Y-%m-%d') AS datumkr, b.kategorija
      FROM ${item.tabela} AS m
      LEFT JOIN brojila AS b ON b.id = m.idBrojilo
      WHERE m.idBrojilo = ${item.id} AND DATE('${mesec}')<=m.datumkr AND DATE('${mesec}')>=m.datumpoc`;

      return new Promise((resolve, reject)=>{
          db.query(query,  (error, results)=>{
              if(error){
                  return reject(error);
              }
              return resolve(results);
          });
      })
  }
  ) 
  // in order to excecute 14 and pick up their results we need Promise.all function
  try {
      //const results = []
      Promise.all(queryPromises).then((values)=>{
          //values is array of promise results and we need to add them JS object "results"
          //results[item.var]=values[index] means in first iteration: results[sprache] = [{id:1,inhalt:"deutsch"},...] ...
      //    tables.forEach((item,index)=>results[item.var]=values[index])
      //    console.log(results)
          ///results.push(values)
         res.send(values)
      })
      
      
        
  } 
  catch(error){
  console.log(error)
  }
   
  }

  const fakturaMetering = (req, res) => {
    const { rezultatN, mesec, godina } = req.body
    console.log('mesec: ', mesec)
    console.log('godina: ', godina)
    const queryPromises = rezultatN.map((item)=>{
      const query = `SELECT t.*, DATE_FORMAT(t.datumpoc, '%d.%m.%Y') AS datumpoc, DATE_FORMAT(t.datumkr, '%d.%m.%Y') AS datumkr, b.kategorija
      FROM ${item.tabela} as t
      LEFT JOIN brojila AS b ON b.id = t.idBrojilo
      WHERE idBrojilo = ${item.idBrojila} AND mesec = ${mesec} AND godina = ${godina}`
      return new Promise((resolve, reject)=>{
        db.query(query, (error, results)=>{
          if(error){
            return reject(error)
          }
          return resolve(results)
        })
      })
    })
    try{
      Promise.all(queryPromises).then((values)=>{
        console.log(values)
        res.send(values)
      })

    }catch(error){
      console.log(error)
    }
    console.log(rezultatN, mesec, godina)
  }

  const deleteSingleMetering = (req, res) => {

    
    const {tabela, id} = req.body
      
    const query = `DELETE FROM ${tabela} WHERE ${tabela}.id = ${id}`;
  
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

  export {newMetering, getAllMeteringByMeterId, deleteSingleMetering, getMeteringByMeterIds, fakturaMetering}