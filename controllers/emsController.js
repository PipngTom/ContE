import db from '../db/db.js';
import { log } from '../middleware/logFunkcija.js';

const getAllEms = (req, res) => {

    const { name, email } = req

    const query = `SELECT * FROM slanjeems`

    db.getConnection((err, connection) => {
        if (err) {
            throw err
        }
        connection.query(query, (err, rows) => {
            connection.release()
            if (!err) {
                log(name, email, 'GET ALL EMS', rows)
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
}

const getEms = (req, res) => {
    const emsId = req.params.id

    const { name, email } = req
    
    const query = `SELECT * FROM slanjeems WHERE id = ${emsId}`

    db.getConnection((err, connection) => {
        if (err) {
            throw err
        }
        connection.query(query, (err, rows) => {
            connection.release()
            if (!err) {
                log(name, email, 'GET EMS', rows)
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
}

const saveEms = (req, res) => {
    
    const pack = req.body
    const id = req.body.id

    const { name, email } = req
   
    //console.log(req.body)

    let query;

    if (id == 0) {

    query = `INSERT INTO slanjeems (h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12, h13, h14, h15, h16, h17, h18, h19, h20, h21, h22, h23, h24, dan, mesec, godina)
    VALUES ( ${pack.h1}, ${pack.h2}, ${pack.h3}, ${pack.h4}, ${pack.h5}, ${pack.h6}, ${pack.h7}, ${pack.h8}, ${pack.h9}, ${pack.h10}, ${pack.h11}, 
    ${pack.h12}, ${pack.h13}, ${pack.h14}, ${pack.h15}, ${pack.h16}, ${pack.h17}, ${pack.h18}, ${pack.h19}, ${pack.h20},
    ${pack.h21}, ${pack.h22}, ${pack.h23}, ${pack.h24}, '${pack.dan}', '${pack.mesec}', '${pack.godina}' )`

    } else {

          query = `UPDATE slanjeems SET h1 = ${pack.h1}, h2 = ${pack.h2}, h3 = ${pack.h3}, h4 = ${pack.h4}, h5 = ${pack.h5}, h6 = ${pack.h6},
          h7 = ${pack.h7}, h8 = ${pack.h8}, h9 = ${pack.h9}, h10 = ${pack.h10}, h11 = ${pack.h11}, h12 = ${pack.h12}, h13 = ${pack.h13}, h14 = ${pack.h14}, 
          h15 = ${pack.h15}, h16 = ${pack.h16}, h17 = ${pack.h17}, h18 = ${pack.h18}, h19 = ${pack.h19}, h20 = ${pack.h20}, h21 = ${pack.h21}, 
          h22 = ${pack.h22}, h23 = ${pack.h23}, h24 = ${pack.h24}, dan = '${pack.dan}', mesec = '${pack.mesec}', godina = '${pack.godina}'
          WHERE id = ${id}`
    }
    

    db.getConnection((err, connection) => {
        if (err) {
            throw err
        }
        connection.query(query, (err, rows) => {
            connection.release()
            if (!err) {
                if (id == 0) {
                    log(name, email, 'NEW EMS', req.body)
                } else {
                    log(name, email, 'UPDATE EMS', req.body)
                }
                res.send(rows)
            } else {
                res.send(err)
            }
        })
    })
}

export { getAllEms , saveEms, getEms }