import db from '../db/db.js';

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

  export { getMrezarina, updateMrezarina }