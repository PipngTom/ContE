import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Table, Form, Button } from 'react-bootstrap';
import { getAllMetersByClientId } from '../../actions/meterActions';
import { getSingleClient } from '../../actions/clientActions';
import { getMrezarina } from '../../actions/mrezarinaActions';
import { getSingleContractByClientId } from '../../actions/contractActions';
import { getFakturaMetering } from '../../actions/meteringActions';
import { nadjiTabeluPoKategoriji, nadjiNazivPoKategoriji, nadjiNazivVrsteSnabdevanja } from '../../constants/brojila';
import { nadjiPocetakObracuna, nadjiKrajObracuna } from '../../constants/datum';
import { dajPunNaziv, dajMeru } from '../Fakture/pomocnaFunkcija';
import FormContainer from '../../components/FormContainer';
import { imgData } from './img'; 
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const RacuniKlijentaScreen = ({ match }) => {
    

    const clientId = match.params.id

    const dispatch = useDispatch()

    const [mesecMerenja, setMesecMerenja] = useState(new Date().getMonth()) 
    const [godinaMerenja, setGodinaMerenja] = useState(new Date().getFullYear())
    const [show, setShow] = useState(false)

    const allMetersByClient = useSelector(state => state.allMetersByClientId)
    const { metersByClientId } = allMetersByClient

    const mrezarina = useSelector(state => state.mrezarina)
    const {mrezarina: mrezarinaZaFakturu} = mrezarina

    const singleClient = useSelector(state => state.singleClient)
    const { client } = singleClient

    const fakturaMetering = useSelector(state => state.fakturaMetering)
    const { fakturaMetering: fakMetering } = fakturaMetering

    const singleContractByClient = useSelector(state => state.singleContractByClient)
    const { singleContractByClient: contract } = singleContractByClient

    useEffect(() => {
        if (clientId)
        dispatch(getAllMetersByClientId(clientId))
        dispatch(getSingleClient(clientId))
        dispatch(getMrezarina())
        dispatch(getSingleContractByClientId(clientId))
    }, [dispatch, clientId])

    const mesecHandler = (e) => {
        setMesecMerenja(e.target.value)
    }

    const godinaHandler = (e) => {
        setGodinaMerenja(e.target.value)
    }

    const createPdfHandler = () => {

        var doc = new jsPDF('p','pt', 'a4')

        var y= 30
            doc.setLineWidth(2)
            doc.text(200, y = y + 30, 'Racun za elektricnu energiju')
    
            
    
            doc.addImage(imgData, 'JPEG', 20, 10, 550, 30)
    
            doc.autoTable({
                html: '#tabelaglavna',
                theme: 'striped',
                startY: 70,
                styles: { fontSize: 6 },
                bodyStyles: { cellWidth: 100 }
            })
            doc.setFontSize(8)
            doc.text(400, 80, `PIB:    ${client.pib}`)
            doc.text(400, 90, `MB:     ${client.maticniBroj}`)
            doc.setFontSize(10)
            doc.text(400, 100, `${client.nazivKlijenta}`)
            doc.setFontSize(8)
            doc.text(400, 110, `${client.adresaKlijenta}, 21460 Vrbas`)
            doc.setFontSize(8)
            doc.text(400, 120, `${client.kontaktMail}`)

        doc.setFontSize(12)
            doc.text('1. Zbirni obracun po mestima merenja', 40, doc.autoTable.previous.finalY + 15)
            doc.autoTable({
                html: `#zbirnatabelax`,
                theme: 'grid',
                styles: { cellPadding: 4 },
                headStyles:  { halign: 'center', valign: 'middle'} ,
                columnStyles: { 0: { halign: 'center', valign: 'middle' }, 1: { halign: 'right', cellWidth: 80 }, 2: { halign: 'right', cellWidth: 100 }, 3: { halign: 'right'}, 4: { halign: 'right' }, 5: { halign: 'right', cellWidth: '100' }}
            })

            doc.setFontSize(12)
            doc.text('2. Rekapitulacija zbirnog racuna', 40, doc.autoTable.previous.finalY + 15)
            doc.autoTable({
                html: `#zbirnatabelay`,
                theme: 'grid',
                styles: { cellPadding: 4 },
                headStyles:  { halign: 'center', valign: 'middle'} ,
                columnStyles: { 1: { halign: 'right', cellWidth: 70 }, 2: { halign: 'right', cellWidth: 110 }}
            })
            doc.addPage() 
        
        fakMetering.forEach((_, index)=>{
            var y= 30
            doc.setLineWidth(2)
            doc.text(200, y = y + 30, 'Racun za elektricnu energiju')
    
            
    
            doc.addImage(imgData, 'JPEG', 20, 10, 550, 30)
    
            doc.autoTable({
                html: `#tabelay${index+1}`,
                theme: 'striped',
                startY: 70,
                styles: { fontSize: 6 },
                bodyStyles: { cellWidth: 100 }
            })
            doc.setFontSize(8)
            doc.text(400, 80, `PIB:    ${client.pib}`)
            doc.text(400, 90, `MB:     ${client.maticniBroj}`)
            doc.setFontSize(10)
            doc.text(400, 100, `${client.nazivKlijenta}`)
            doc.setFontSize(8)
            doc.text(400, 110, `${client.adresaKlijenta}, 21460 Vrbas`)
            doc.setFontSize(8)
            doc.text(400, 120, `${client.kontaktMail}`)

    
            doc.setFontSize(12)
            doc.text('1. Obracun za isporucenu energiju', 40, doc.autoTable.previous.finalY + 15)
            doc.autoTable({
                html: `#tabela${index+1}-1`,
                theme: 'grid',
                styles: { cellPadding: 2 },
                headStyles:  { halign: 'center', valign: 'middle'} ,
                columnStyles: { 1: { halign: 'center', cellWidth: 50 }, 2: { halign: 'right', cellWidth: 80 }, 3: { halign: 'right', cellWidth: 90 }, 4: { halign: 'right'}}
            })
            doc.setFontSize(12)
            doc.text('2. Obracun za pristup sistemu za prenos/distribuciju elektricne energije', 40, doc.autoTable.previous.finalY + 15)
             doc.autoTable({
                html: `#tabela${index+1}-2`, 
                theme: 'grid',
                styles: {cellPadding: 2},
                headStyles: { halign: 'center', valign: 'middle'} ,
                columnStyles: {1: {halign: 'center', cellWidth: 50}, 2: {halign: 'right', cellWidth: 80}, 3: { halign: 'right', cellWidth: 80 }, 4: {halign: 'right'}}
            }) 
            doc.setFontSize(12)
            doc.text('3. Obracun naknada za podsticaj povl. proizvodjaca el. energije i unapredjenje energetske efikasnosti', 40, doc.autoTable.previous.finalY + 15)
            doc.autoTable({
                html: `#tabela${index+1}-3`, theme: 'grid',
                styles: {cellPadding: 2},
                headStyles: { halign: 'center'} ,
                columnStyles: { 0: { cellWidth: 300 }, 1: { halign: 'center', cellWidth: 60 }, 2: { halign: 'right' }, 3: { halign: 'right' }, 4: {halign: 'right'}  } 
            }) 
            doc.setFontSize(12)
            doc.text('4. Rekapitulacija', 40, doc.autoTable.previous.finalY + 15)
            doc.autoTable({
                html: `#tabela${index+1}-4`,
                theme: 'grid',
                styles: {cellPadding: 2},
                columnStyles: { 1: { halign: 'right' } }
            })
            if (index < fakMetering.length - 1)
            doc.addPage() 
        })
       
    
      
        doc.save('Faktura proba.pdf')
    }


    const buttonHandler = () => {
       const rezultatNiza = metersByClientId.map(item => {
           return {
               idBrojila: item.id,
               tabela: nadjiTabeluPoKategoriji(item.kategorija)
           }
       })
       setShow(true)
       dispatch(getFakturaMetering(rezultatNiza, mesecMerenja, godinaMerenja))
    }
    const numberWithDots = (x) => {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <>
        <FormContainer>
        <Form>
                <Row>
                <Col xs={6}>
                <Form.Group controlId='mesecMerenja'>
                    <h4>Mesec merenja</h4>
                    <Form.Control as='select' size='lg' value={mesecMerenja} onChange={mesecHandler}>
                        <option value={0}>Januar</option>
                        <option value={1}>Februar</option>
                        <option value={2}>Mart</option>
                        <option value={3}>April</option>
                        <option value={4}>Maj</option>
                        <option value={5}>Jun</option>
                        <option value={6}>Jul</option>
                        <option value={7}>Avgust</option>
                        <option value={8}>Septembar</option>
                        <option value={9}>Oktobar</option>
                        <option value={10}>Novembar</option>
                        <option value={11}>Decembar</option>
                    </Form.Control>
                </Form.Group>
                </Col>
                <Col xs={6}>
                <Form.Group controlId='godinaMerenja'>
                    <h4>Godina merenja</h4>
                    <Form.Control as='select' size='lg' value={godinaMerenja} onChange={godinaHandler} >
                        <option value={2021}>2021</option>
                        <option value={2020}>2020</option>
                        <option value={2019}>2019</option>
                    </Form.Control>
                </Form.Group>
                </Col>
                </Row>
            </Form>
            <br/>
            <br/>
            <Row>
                <Col xs={6}>
                    <Button variant='info' size='lg' onClick={buttonHandler}>Prikaži Fakture</Button>
                </Col>
                <Col xs={6}>
                    {show && <Button type='button' size='lg' variant='info' onClick={createPdfHandler}>Izvezi u PDF</Button>}
                </Col>
                
            </Row>
            <br/>
            <br/>
        <Row>
            <Col>
            <Table id='tabelaglavna' collapse hover variante='dark'>
                <tbody>
                    <tr>
                        <td>Org. deo:</td>
                        <td>{client && client.nazivKlijenta}</td>
                    </tr>
                    <tr>
                        <td>Vrsta snabdevanja:</td>
                          <td>{metersByClientId[0] && nadjiNazivVrsteSnabdevanja(metersByClientId[0].vrstaSnabdevanja)}</td>  
                    </tr>
                    <tr>
                        <td>Period obracuna:</td>
                        <td>{nadjiPocetakObracuna(mesecMerenja) + godinaMerenja}{' - '}{nadjiKrajObracuna(mesecMerenja) + godinaMerenja}</td>
                    </tr>
                    <tr>
                        <td>Broj pojedinacnih obracuna:</td>
                        <td>{fakMetering && fakMetering.length}</td>
                    </tr>
                </tbody>
            </Table>
            </Col>
            <Col>
            <Table id='tabelax' collapse hover variante='dark'>
                <tbody>
                    <tr>
                        <td>PIB:</td>
                        <td>{client && client.pib}</td>
                    </tr>
                    <tr>
                        <td>Maticni broj:</td>
                        <td>{client && client.maticniBroj}</td>
                    </tr>
                    <tr>
                        <td>Klijent:</td>
                        <td>{client && client.nazivKlijenta}</td>
                    </tr>
                    <tr>
                        <td>Adresa:</td>
                        <td>{client && client.adresaKlijenta}</td>
                    </tr>
                    <tr>
                        <td>Kontakt mail:</td>
                        <td>{client && client.kontaktMail}</td>
                    </tr>
                </tbody>
            </Table>
            </Col>
            </Row>
            <br/>
            <br/>
            
                {show && [0].map((_)=> {
                    let sumEnergija = 0;
                    let sumMrezarina = 0;
                    let sumNaknada = 0;

                    return  <> <h5>1. ZBIRNI OBRACUN PO MESTIMA MERENJA</h5>
                    <Table id='zbirnatabelax' striped bordered collapse hover variante='dark'>
                        <thead>
                        <tr>
                            <th>Redni broj</th>
                            <th>Broj mesta merenja</th>
                            <th>Naziv mesta merenja</th>
                            <th>Za isporucenu aktivnu EE</th>
                            <th>Za pristup sistemu dis. EE</th>
                            <th>Za naknadu za povl. proiz. EE i unap. EE</th>
                        </tr>
                        </thead>
                        <tbody>
                        {fakMetering && fakMetering.map((item, index) => {

                        let sum2 = 0;
                        Object.keys(item[0]).forEach((it, index) => {
                                
                            if (it == 'id' || 
                                it == 'idBrojilo' || 
                                it == 'datumpoc' || 
                                it == 'datumkr' || 
                                it == 'maxsnaga' || 
                                it == 'godina' || 
                                it == 'mesec' ||
                                it == 'kategorija') {
                                    
                                } else {
                                    
                                    const prop = nadjiTabeluPoKategoriji(item[0].kategorija).replace('merenja_', '') + '_' + it
                                    
                                    sum2 = sum2 + item[0][it] *  (mrezarinaZaFakturu && mrezarinaZaFakturu[prop])
                                }
                                if(index==Object.keys(item[0]).length-1) {
                                    sumMrezarina = sumMrezarina + sum2;
                                }
                            })

                        let sumEN = (item[0].vt ? item[0].vt : 0) + (item[0].nt ? item[0].nt : 0) + (item[0].jt ? item[0].jt : 0)
                        

                        let sum1 = (item[0].vt ? (item[0].vt * contract.cenaVT) : 0) + (item[0].nt ? (item[0].nt * contract.cenaNT) : 0) + (item[0].jt ? (item[0].jt * contract.cenaJT) : 0)
                        sumEnergija = sumEnergija + sum1
                        let sum3 = sumEN * ((mrezarinaZaFakturu && mrezarinaZaFakturu.naknada_ee) + (mrezarinaZaFakturu && mrezarinaZaFakturu.naknada_oie))
                        sumNaknada = sumNaknada + sum3
                         
                        return       <tr>
                                    <td>{index+1}</td>
                                    <td>{metersByClientId.find(el => el.id == item[0].idBrojilo).mestoMerenja}</td>
                                    <td>{metersByClientId.find(el => el.id == item[0].idBrojilo).adresaMerenja}</td>
                                    <td>{numberWithDots(sum1.toFixed(2))}</td>
                                    <td>{numberWithDots(sum2.toFixed(2))}</td>
                                    <td>{numberWithDots(sum3.toFixed(2))}</td>
                                </tr>
                            
                        })}
                        <tr>
                            <td></td>
                            <td></td>
                            <td>Ukupno:</td>
                            <td>{numberWithDots(sumEnergija.toFixed(2))}</td>
                            <td>{numberWithDots(sumMrezarina.toFixed(2))}</td>
                            <td>{numberWithDots(sumNaknada.toFixed(2))}</td>
                        </tr>
                        </tbody>
                        </Table>
                        <Table id='zbirnatabelay' striped bordered collapse hover variante='dark'>
                            <h5>2. REKAPITULACIJA ZBIRNOG RACUNA</h5>
                            <tbody>
                                <tr>
                                    <td>Isporucena elektricna energija</td>
                                    <td>1</td>
                                    <td>{numberWithDots(sumEnergija.toFixed(2))}</td>
                                </tr>
                                <tr>
                                    <td>Odobreni popust (Rabat %)</td>
                                    <td>2=1*0</td>
                                    <td>0,00</td>
                                </tr>
                                <tr>
                                    <td>Pristup sistemu za prenos/distribuciju eletricne energije</td>
                                    <td>3</td>
                                    <td>{numberWithDots(sumMrezarina.toFixed(2))}</td>
                                </tr>
                                <tr>
                                    <td>Naknada za podsticaj povlascenih proizvodjaca el. energije i unapredjenje EE</td>
                                    <td>4</td>
                                    <td>{numberWithDots(sumNaknada.toFixed(2))}</td>
                                </tr>
                                <tr>
                                    <td>Osnovica za obracun akcize</td>
                                    <td>5=1+2+3+4</td>
                                    <td>{numberWithDots((sumEnergija + sumMrezarina + sumNaknada).toFixed(2))}</td>
                                </tr>
                                <tr>
                                    <td>Iznos obracunate akcize</td>
                                    <td>6=5*0.075</td>
                                    <td>{numberWithDots(((sumEnergija + sumMrezarina + sumNaknada) * 0.075).toFixed(2))}</td>
                                </tr>
                                <tr>
                                    <td>Oslobodjen placanja akcize u skladu sa clanom 40lj stav 1 Zakona o akcizama</td>
                                    <td>7</td>
                                    <td>0,00</td>
                                </tr>
                                <tr>
                                    <td>Osnovica za pdv</td>
                                    <td>8=5+6+7</td>
                                    <td>{numberWithDots(((sumEnergija + sumMrezarina + sumNaknada) * 1.075).toFixed(2))}</td>
                                </tr>
                                <tr>
                                    <td>Porez na dodatu vrednost 20%</td>
                                    <td>9=8*0.20</td>
                                    <td>{numberWithDots(((sumEnergija + sumMrezarina + sumNaknada) * 0.29).toFixed(2))}</td>
                                </tr>
                                <tr>
                                    <td>Taksa za javni medijski servis</td>
                                    <td>10</td>
                                    <td>{mrezarinaZaFakturu && mrezarinaZaFakturu.naknada_tv}</td>
                                </tr>
                                <tr>
                                    <td>Avans - osnovica</td>
                                    <td>11</td>
                                    <td>0,00</td>
                                </tr>
                                <tr>
                                    <td>Avans - PDV</td>
                                    <td>12=11*0.20</td>
                                    <td>0,00</td>
                                </tr>
                                <tr>
                                    <td>Ukupna osnovica</td>
                                    <td>13=8-12</td>
                                    <td>{numberWithDots(((sumEnergija + sumMrezarina + sumNaknada) * 1.075).toFixed(2))}</td>
                                </tr>
                                <tr>
                                    <td>Ukupan PDV</td>
                                    <td>14=9-12</td>
                                    <td>{numberWithDots(((sumEnergija + sumMrezarina + sumNaknada) * 0.29).toFixed(2))}</td>
                                </tr>
                                <tr>
                                    <td>Ukupno za uplatu</td>
                                    <td>15=13+14+10</td>
                                    <td>{numberWithDots(((sumEnergija + sumMrezarina + sumNaknada) * 1.29+(mrezarinaZaFakturu && mrezarinaZaFakturu.naknada_tv)).toFixed(2))}</td>
                                </tr>
                            </tbody>
                        </Table>
                        </>
                })}
             
            
        
            {fakMetering && fakMetering.map((item, index)=>{

                let sum2 = 0;
                

                let sumEN = (item[0].vt ? item[0].vt : 0) + (item[0].nt ? item[0].nt : 0) + (item[0].jt ? item[0].jt : 0)
                

                let sum1 = (item[0].vt ? (item[0].vt * contract.cenaVT) : 0) + (item[0].nt ? (item[0].nt * contract.cenaNT) : 0) + (item[0].jt ? (item[0].jt * contract.cenaJT) : 0)
                
                let sum3 = sumEN * ((mrezarinaZaFakturu && mrezarinaZaFakturu.naknada_ee) + (mrezarinaZaFakturu && mrezarinaZaFakturu.naknada_oie))

                return <><div style={{backgroundColor: '#e6f2ff', marginTop: '20px', padding: '30px', boxShadow: "1px 3px 1px #9E9E9E"}}>{item.length !== 0 &&
                    <>
                    
                    <h3>Racun broj {index+1}</h3>
                    <Row>
            <Col>
            <Table id={'tabelay' + (index+1).toString()} collapse hover variante='dark'>
                <tbody>
                    <tr>
                        <td>Org. deo:</td>
                        <td>{client && client.nazivKlijenta}</td>
                    </tr>
                    <tr>
                        <td>Kategorija:</td>
                        <td>{nadjiNazivPoKategoriji(item[0].kategorija)}</td>
                    </tr>
                    <tr>
                        <td>Vrsta snabdevanja:</td>
                        <td>{nadjiNazivVrsteSnabdevanja(metersByClientId.find(el => el.id == item[0].idBrojilo).vrstaSnabdevanja)}</td>
                    </tr>
                    <tr>
                        <td>Odobrena snaga</td>
                        <td>{item[0].odosnaga}{' '}kW</td>
                    </tr>
                    <tr>
                        <td>Period obracuna</td>
                        <td>{item[0].datumpoc}{' - '}{item[0].datumkr}</td>
                    </tr>
                    <tr>
                        <td>Mesto merenja:</td>
                        <td>{metersByClientId.find(el => el.id == item[0].idBrojilo).mestoMerenja}</td>
                    </tr>
                    <tr>
                        <td>Adresa merenja:</td>
                        <td>{metersByClientId.find((el)=>el.id == item[0].idBrojilo).adresaMerenja}</td>
                    </tr>
                </tbody>
            </Table>
            </Col>
            <Col>
            <Table id={'tabelax' + (index+1).toString()} collapse hover variante='dark'>
                <tbody>
                    <tr>
                        <td>PIB:</td>
                        <td>{client && client.pib}</td>
                    </tr>
                    <tr>
                        <td>Maticni broj:</td>
                        <td>{client && client.maticniBroj}</td>
                    </tr>
                    <tr>
                        <td>Klijent:</td>
                        <td>{client && client.nazivKlijenta}</td>
                    </tr>
                    <tr>
                        <td>Adresa:</td>
                        <td>{client && client.adresaKlijenta}</td>
                    </tr>
                    <tr>
                        <td>Kontakt mail:</td>
                        <td>{client && client.kontaktMail}</td>
                    </tr>
                </tbody>
            </Table>
            </Col>
            </Row> 
            <br/>
            <br/>
                <h5>1. Obracun za isporucenu energiju</h5>
                <Table id={'tabela'+(index+1).toString()+'-1'} striped bordered hover variante='dark'>
                            <thead>
                                <tr>
                                    <th>Naziv</th>
                                    <th>Jed. mere</th>
                                    <th>Isporucena kolicina</th>
                                    <th>Jedinicna cena</th>
                                    <th>Iznos</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {item[0].vt ? <tr><td>Visa tarifa</td><td>kWh</td><td>{item[0].vt}</td><td>{contract.cenaVT}</td><td>{numberWithDots((contract.cenaVT * item[0].vt).toFixed(2))}</td></tr> : ''}
                                {item[0].nt ? <tr><td>Niza tarifa</td><td>kWh</td><td>{item[0].nt}</td><td>{contract.cenaNT}</td><td>{numberWithDots((contract.cenaNT * item[0].nt).toFixed(2))}</td></tr> : ''}
                                {item[0].jt ? <tr><td>Jedinstvena tarifa</td><td>kWh</td><td>{item[0].jt}</td><td>{contract.cenaJT}</td><td>{numberWithDots((contract.cenaJT * item[0].jt).toFixed(2))}</td></tr> : ''}
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>Ukupno</td>
                                    <td>{numberWithDots(sum1.toFixed(2))}</td>
                                </tr>
                                
                                
                            </tbody>
                        </Table>
                        <br/>
                        <br/>
                         <h5>2. Obracun za pristup sistemu za prenos/distribuciju elektricne energije</h5>
                        <Table id={'tabela'+(index+1).toString()+'-2'}  striped bordered hover variante='dark'>
                            <thead>
                                <th>Naziv tarife</th>
                                <th>Obrac. velicina</th>
                                <th>Kolicina za obracun</th>
                                <th>Jedinicna cena</th>
                                <th>Iznos</th>
                            </thead>
                            <tbody>
                                {Object.keys(item[0]).map(it => {
                                
                                if (it == 'id' || 
                                    it == 'idBrojilo' || 
                                    it == 'datumpoc' || 
                                    it == 'datumkr' || 
                                    it == 'maxsnaga' || 
                                    it == 'godina' || 
                                    it == 'mesec' ||
                                    it == 'kategorija') {
                                        
                                    } else {
                                        
                                        const prop = nadjiTabeluPoKategoriji(item[0].kategorija).replace('merenja_', '') + '_' + it
                                        sum2 = sum2 + item[0][it] *  mrezarinaZaFakturu[prop]
                                        return (
                                            <>
                                            <tr>
                                                <td>{dajPunNaziv(it)}</td>
                                                <td>{dajMeru(it)}</td>
                                                <td>{numberWithDots(item[0][it])}</td>
                                                <td>{mrezarinaZaFakturu[prop]}</td>
                                                <td>{numberWithDots((mrezarinaZaFakturu[prop] * item[0][it]).toFixed(2))}</td>
                                                
                                            </tr>
                                            </>
                                        )
                                    }
                                    
                                })}
                                <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>Ukupno:</td>
                                                <td>{numberWithDots(sum2.toFixed(2))}</td>
                                            </tr>
                            </tbody>
                        </Table> 
                        <br/>
                        <br/>
                        <h5>3. Obracun naknada za podsticaj povlascenih proizvodjaca el. energije i unapredjenje energetske efikasnosti</h5>
                        <Table id={'tabela'+(index+1).toString()+'-3'}  striped bordered hover variante='dark'>
                            <thead>
                                <th>Naziv</th>
                                <th>Velicina</th>
                                <th>Kolicina</th>
                                <th>Jed. cena</th>
                                 <th>Iznos</th> 
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Naknada za podsticaj povlascenih proizvodjaca el. energije</td>
                                    <td>kWh</td>
                                    <td>{numberWithDots(sumEN.toFixed(2))}</td>
                                    <td>{mrezarinaZaFakturu && mrezarinaZaFakturu.naknada_oie}</td>
                                    <td>{numberWithDots((sumEN * (mrezarinaZaFakturu && mrezarinaZaFakturu.naknada_oie)).toFixed(2))}</td> 
                                    </tr>
                                    <tr>
                                        <td>Naknada za unapredjenje energetske efikasnosti</td>
                                        <td>kWh</td>
                                        <td>{numberWithDots(sumEN.toFixed(2))}</td>
                                        <td>{mrezarinaZaFakturu && mrezarinaZaFakturu.naknada_ee}</td>
                                        <td>{numberWithDots((sumEN * (mrezarinaZaFakturu && mrezarinaZaFakturu.naknada_ee)).toFixed(2))}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>Ukupno</td>
                                        <td>{numberWithDots(sum3.toFixed(2))}</td>
                                    </tr>
                            </tbody>
                        </Table>
                        <br/>
                        <br/>
                        <h5>4. Rekapitulacija obracuna</h5>
                        <Table id={'tabela'+(index+1).toString()+'-4'}  striped bordered hover variante='dark'>
                            <thead>
                                <tr>
                                    <th>Stavka</th>
                                    <th>Iznos</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                   <td>Isporucena elektricna energija</td>
                                   <td>{numberWithDots(sum1.toFixed(2))}</td>
                                </tr>
                                <tr>
                                   <td>Pristup sistemu za prenos/distribuciju elektricne energije</td>
                                   <td>{numberWithDots(sum2.toFixed(2))}</td>
                                </tr>
                                <tr>
                                   <td>Naknada za podsticaj povlascenih proizvodjaca el. energije</td>
                                   <td>{numberWithDots((sumEN * (mrezarinaZaFakturu && mrezarinaZaFakturu.naknada_oie)).toFixed(2))}</td>
                                </tr>
                                <tr>
                                   <td>Naknada za unapredjenje energetske efikasnosti</td>
                                   <td>{numberWithDots((sumEN * (mrezarinaZaFakturu && mrezarinaZaFakturu.naknada_ee)).toFixed(2))}</td>
                                </tr>
                                <tr>
                                   <td>Osnova za obracun akcize</td>
                                   <td>{numberWithDots((sum1 + sum2 + sum3).toFixed(2))}</td>
                                </tr>
                                <tr>
                                   <td>Iznos obracunate akcize stopa {mrezarinaZaFakturu && mrezarinaZaFakturu.akciza * 100}%</td>
                                   <td>{numberWithDots(((sum1 + sum2 + sum3) * (mrezarinaZaFakturu && mrezarinaZaFakturu.akciza)).toFixed(2))}</td>
                                </tr>
                                <tr>
                                   <td>Osnovica za PDV</td>
                                   <td>{numberWithDots(((sum1 + sum2 + sum3) * (mrezarinaZaFakturu && (mrezarinaZaFakturu.akciza + 1))).toFixed(2))}</td>
                                </tr>
                                <tr>
                                   <td>Porez na dodatu vrednost</td>
                                   <td>{numberWithDots(((sum1 + sum2 + sum3) * (mrezarinaZaFakturu && (mrezarinaZaFakturu.akciza + 1)) * (mrezarinaZaFakturu && (mrezarinaZaFakturu.pdv))).toFixed(2))}</td>
                                </tr>
                                <tr>
                                   <td>Taksa za javni medijski servis</td>
                                   <td>{(mrezarinaZaFakturu && (mrezarinaZaFakturu.naknada_tv)).toFixed(2)}</td>
                                </tr>
                                <tr>
                                   <td>Ukupno za obracun</td>
                                   <td>{numberWithDots((((sum1 + sum2 + sum3) * (mrezarinaZaFakturu && (mrezarinaZaFakturu.akciza + 1))* (mrezarinaZaFakturu && (mrezarinaZaFakturu.pdv + 1)))+(mrezarinaZaFakturu && (mrezarinaZaFakturu.naknada_tv))).toFixed(2))}</td>
                                </tr>
                    </tbody>
                        </Table>
                        </>}
                        </div>
                </>
                
            })}
            </FormContainer>
        </>
    )
}

export default RacuniKlijentaScreen
