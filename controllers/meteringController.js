import mysql from 'mysql';

const db = mysql.createPool({
  user: "root",
  host: "localhost",
  password: "divljidetektiv",
  database: "users",
  port: "3306",
  connectionLimit: 10
})

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
          console.log(err)
        }
      })
    })
  
  }

  const getAllMeteringByMeterId = (req, res) => {

    const {id, tabela} = req.body
      
    const query = `SELECT * FROM ${tabela} WHERE idBrojilo = ${id}`;
  
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

  export {newMetering, getAllMeteringByMeterId, deleteSingleMetering}