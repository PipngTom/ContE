import  soapRequest from 'easy-soap-request'
import convert from 'xml-js'
import { log } from '../middleware/logFunkcija.js'

const kursEura = (req, res) => {

    const { datum } = req.query
    console.log(datum)
    const dat = datum.split('-')
    let godina = Number(dat[0])
    let mesec = Number(dat[1])

    if(mesec === 12)
    {
        godina = godina +1;
        mesec = 1
    } else {
        mesec = mesec + 1
    }

    const mesecZaKurs = mesec <10 ? '0' + mesec : '' + mesec
    const godinaZaKurs = '' + godina



    const datumZaKurs = godinaZaKurs + mesecZaKurs + '01'
    console.log(datumZaKurs)

    const url = 'https://webservices.nbs.rs/CommunicationOfficeService1_0/ExchangeRateService.asmx';
const sampleHeaders = {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Headers': '*',
    'Content-Type': 'text/xml; charset=utf-8',
    'soapAction': `http://communicationoffice.nbs.rs/GetExchangeRateByDate`,
};
// 9862d7db-7b33-4d80-9c1e-bccc2a701d79
const xml = `
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
<soap:Header>
<AuthenticationHeader xmlns="http://communicationoffice.nbs.rs">
<UserName>zeljko.zecevic</UserName>
<Password>Matija2007</Password>
<LicenceID>e769167f-6d95-4fbc-ae58-6223e4070f98</LicenceID>
</AuthenticationHeader>
</soap:Header>
<soap:Body>
<GetExchangeRateByDate xmlns="http://communicationoffice.nbs.rs">
<date>${datumZaKurs}</date>
<exchangeRateListTypeID>3</exchangeRateListTypeID>
</GetExchangeRateByDate>
</soap:Body>
</soap:Envelope>
`;


// usage of module
(async () => {
   
    const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
    const { headers, body, statusCode } = response;
 //   console.log(headers);
   // console.log(body);
    let index1 = body.indexOf("<Amount>");
    let index2 = body.indexOf("</Amount>");
    const finRez = body.substring(index1+8, index2)
//    console.log(finRez)
//    console.log(statusCode);
    var result1 = convert.xml2json(body, {compact: true, spaces: 4});
   // console.log(result1)
    const pom = JSON.parse(result1)
   // console.log(pom)
     const rezultat = pom['soap:Envelope']['soap:Body']['GetExchangeRateByDateResponse']
    ['GetExchangeRateByDateResult']['diffgr:diffgram']['ExchangeRateDataSet']['ExchangeRate'].find(item => item.CurrencyCode._text == 978)
    const rez = rezultat['MiddleRate']['_text']
    //['ExchangeRateRsdEur']['Amount']['_text']
console.log(rez)
    res.send(rez) 
  })();
}

import db from '../db/db.js';

const getAllEuro = (req, res) => {

    const { name, email } = req

    const query = `SELECT *, DATE_FORMAT(datum, '%d-%m-%Y') AS datum FROM kursevra`

    db.getConnection((err, connection) => {
        if (err) {
            throw err
        }
        connection.query(query, (err, rows) => {
            connection.release()
            if (!err) {
                log(name, email, 'GET ALL KURS', rows)
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
}

const getKursEura = (req, res) => {
    const  id  = req.params.id

    const {name, email} = req

    const query = `SELECT *, DATE_FORMAT(datum, '%Y-%m-%d') AS datum FROM kursevra WHERE id = ${id}`

    db.getConnection((err, connection) => {
        if (err) {
            throw err
        }
        connection.query(query, (err, rows) => {
            connection.release()
            if (!err) {
                log(name, email, 'GET KURS EURA', rows)
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
}

const saveEuro = (req, res) => {
    const {datum, euro, id } = req.body

    const { name, email } = req

    const dat = datum.split('-')
    const mesec = dat[1]
    const godina = dat[0]
    

    let query
    if (id === 0) {
        query = `INSERT INTO kursevra (euro, datum, mesec, godina) VALUES ('${euro}', '${datum}', '${mesec}', '${godina}' )`
    } else {
         query = `UPDATE kursevra SET euro = '${euro}' WHERE mesec = '${mesec}' AND godina = '${godina}'`
    }
    

    db.getConnection((err, connection) => {
        if (err) {
            throw err
        }
        connection.query(query, (err, rows) => {
            connection.release()
            if (!err) {
                if (id === 0) {
                    log(name, email, 'NEW EURO', req.body)
                } else {
                    log(name, email, 'UPDATE EURO', req.body)
                }
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
}

export { saveEuro, getAllEuro, getKursEura, kursEura }

