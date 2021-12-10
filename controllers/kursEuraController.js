import  soapRequest from 'easy-soap-request'
import convert from 'xml-js'

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
    'soapAction': `http://communicationoffice.nbs.rs/GetExchangeRateRsdEur`,
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
<GetExchangeRateRsdEur xmlns="http://communicationoffice.nbs.rs">
<date>${datumZaKurs}</date>
<typeID>2</typeID>
</GetExchangeRateRsdEur>
</soap:Body>
</soap:Envelope>
`;


// usage of module
(async () => {
   
    const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
    const { headers, body, statusCode } = response;
 //   console.log(headers);
 //   console.log(body);
    let index1 = body.indexOf("<Amount>");
    let index2 = body.indexOf("</Amount>");
    const finRez = body.substring(index1+8, index2)
//    console.log(finRez)
//    console.log(statusCode);
    var result1 = convert.xml2json(body, {compact: true, spaces: 4});
   // console.log(result1)
    const pom = JSON.parse(result1)
    const rezultat = pom['soap:Envelope']['soap:Body']['GetExchangeRateRsdEurResponse']
    ['GetExchangeRateRsdEurResult']['diffgr:diffgram']['ExchangeRateDataSet']['ExchangeRateRsdEur']['Amount']['_text']
    res.send(rezultat)
  })();
}

export { kursEura }

