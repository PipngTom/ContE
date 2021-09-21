import mysql from 'mysql';

const db = mysql.createPool({
  user: "root",
  host: "localhost",
  password: "divljidetektiv",
  database: "users",
  port: "3306",
  connectionLimit: 10
})

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

   console.log(req.body)
    
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

  export { getMrezarina, updateMrezarina }