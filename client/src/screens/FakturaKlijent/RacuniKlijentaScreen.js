import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Table, Form, Button } from 'react-bootstrap';
import { getAllMetersByClientId } from '../../actions/meterActions';
import { getSingleClient } from '../../actions/clientActions';
import { getMrezarinaPoDatumu } from '../../actions/mrezarinaActions';
import { getNametiPoDatumu } from '../../actions/nametiActions';
import { getSingleContractByClientId } from '../../actions/contractActions';
import { getFakturaMetering } from '../../actions/meteringActions';
import { backupFaktura } from '../../actions/backupFakturaActions';
import { kursEura } from '../../actions/kursEuraActions';
import { nadjiTabeluPoKategoriji, nadjiNazivPoKategoriji, nadjiNazivVrsteSnabdevanja } from '../../constants/brojila';
import { nadjiPocetakObracuna, nadjiKrajObracuna, nadjiNazivMeseca } from '../../constants/datum';
import { dajPunNaziv, dajMeru } from '../Fakture/pomocnaFunkcija';
import { backupFunkcija } from './backupFunkcija';
import FormContainer from '../../components/FormContainer';
import { imgData1 } from './img'; 
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as DejaVuSans from './DejaVuSans-normal';
import { FAKTURA_METERING_RESET } from '../../constants/meteringConstants';

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

    const trenutniNameti = useSelector(state => state.jNamet)
    const { namet } = trenutniNameti


    useEffect(() => {
        if (clientId){
            dispatch(getAllMetersByClientId(clientId))
            dispatch(getSingleClient(clientId))
            dispatch({type: FAKTURA_METERING_RESET})
        }
        
        
    }, [dispatch, clientId])

    const mesecHandler = (e) => {
        setMesecMerenja(e.target.value)
    }

    const godinaHandler = (e) => {
        setGodinaMerenja(e.target.value)
    }

    const createPdfHandler = () => {

        var doc = new jsPDF('p','pt', 'a4')
        doc.setFont('DejaVuSans', 'normal');

        var y= 30
            doc.setLineWidth(2)
            doc.text(150, y = y + 30, `Račun za električnu energiju - ${nadjiNazivMeseca(mesecMerenja.toString()).toUpperCase()}${' '}${godinaMerenja}`)
    
            
    
            doc.addImage(imgData1, 'PNG', 20, 10, 129, 32)
    
            doc.autoTable({
                html: '#tabelaglavna',
                theme: 'striped',
                startY: 70,
                styles: { fontSize: 6, font: 'DejaVuSans' },
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
            doc.text('1. Zbirni obračun po mestima merenja', 40, doc.autoTable.previous.finalY + 15)
            doc.autoTable({
                html: `#zbirnatabelax`,
                theme: 'grid',
                styles: { cellPadding: 4, font: 'DejaVuSans' },
                headStyles:  { halign: 'center', valign: 'middle'} ,
                columnStyles: { 0: { halign: 'center', valign: 'middle' }, 1: { halign: 'right', cellWidth: 80 }, 2: { halign: 'right', cellWidth: 100 }, 3: { halign: 'right'}, 4: { halign: 'right' }, 5: { halign: 'right', cellWidth: '100' }}
            })

            doc.setFontSize(12)
            doc.text('2. Rekapitulacija zbirnog računa', 40, doc.autoTable.previous.finalY + 15)
            doc.autoTable({
                html: `#zbirnatabelay`,
                theme: 'grid',
                styles: { cellPadding: 4, font: 'DejaVuSans' },
                headStyles:  { halign: 'center', valign: 'middle'} ,
                columnStyles: { 1: { halign: 'right', cellWidth: 70 }, 2: { halign: 'right', cellWidth: 110 }}
            })
            doc.addPage() 
        
        fakMetering.forEach((_, index)=>{
            var y= 30
            doc.setLineWidth(2)
            doc.text(150, y = y + 30, `Račun za eletričnu energiju - ${nadjiNazivMeseca(mesecMerenja.toString()).toUpperCase()}${' '}${godinaMerenja}`)
    
            
    
            doc.addImage(imgData1, 'JPEG', 20, 10, 129, 32)
    
            doc.autoTable({
                html: `#tabelay${index+1}`,
                theme: 'striped',
                startY: 70,
                styles: { fontSize: 6, font: 'DejaVuSans' },
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

    
            doc.setFontSize(10)
            doc.text('1. Obračun za isporučenu energiju', 40, doc.autoTable.previous.finalY + 15)
            
            doc.autoTable({
                html: `#tabela${index+1}-1`,
                theme: 'grid',
                styles: { cellPadding: 2, font: 'DejaVuSans' },
                headStyles:  { halign: 'center', valign: 'middle'} ,
                columnStyles: { 1: { halign: 'center', cellWidth: 50 }, 2: { halign: 'right', cellWidth: 80 }, 3: { halign: 'right', cellWidth: 90 }, 4: { halign: 'right'}}
            })
            doc.setFontSize(10)
            doc.text('2. Obračun za pristup sistemu za prenos/distribuciju električne energije', 40, doc.autoTable.previous.finalY + 15)
             doc.autoTable({
                html: `#tabela${index+1}-2`, 
                theme: 'grid',
                styles: {cellPadding: 2, font: 'DejaVuSans'},
                headStyles: { halign: 'center', valign: 'middle'} ,
                columnStyles: {1: {halign: 'center', cellWidth: 50}, 2: {halign: 'right', cellWidth: 80}, 3: { halign: 'right', cellWidth: 80 }, 4: {halign: 'right'}}
            }) 
            doc.setFontSize(10)
            doc.text('3. Obračun naknada za podsticaj povl. proizvodjača el. energije i unapređenje energetske efikasnosti', 40, doc.autoTable.previous.finalY + 15)
            doc.autoTable({
                html: `#tabela${index+1}-3`, theme: 'grid',
                styles: {cellPadding: 2, font: 'DejaVuSans'},
                headStyles: { halign: 'center'} ,
                columnStyles: { 0: { cellWidth: 300 }, 1: { halign: 'center', cellWidth: 60 }, 2: { halign: 'right' }, 3: { halign: 'right' }, 4: {halign: 'right'}  } 
            }) 
            doc.setFontSize(10)
            doc.text('4. Rekapitulacija', 40, doc.autoTable.previous.finalY + 15)
            doc.autoTable({
                html: `#tabela${index+1}-4`,
                theme: 'grid',
                styles: {cellPadding: 2, font: 'DejaVuSans'},
                columnStyles: { 1: { halign: 'right' } }
            })
            if (index < fakMetering.length - 1)
            doc.addPage() 
        })
       
        const faktura = backupFunkcija(client, fakMetering, contract, metersByClientId, mrezarinaZaFakturu, namet, mesecMerenja, godinaMerenja)
        dispatch(backupFaktura(faktura))
        
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
      // const datumUgovora = nadjiVazeciUgovor(mesecMerenja) + godinaMerenja
      const datumUgovora = godinaMerenja + '-' + (Number(mesecMerenja)+1).toString() + '-15'
       dispatch(getSingleContractByClientId(clientId, datumUgovora))
       dispatch(getMrezarinaPoDatumu(datumUgovora))
       dispatch(getNametiPoDatumu(datumUgovora))
       dispatch(kursEura(datumUgovora))
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
                        <td>Period obračuna:</td>
                        <td>{nadjiPocetakObracuna(mesecMerenja) + godinaMerenja}{' - '}{nadjiKrajObracuna(mesecMerenja) + godinaMerenja}</td>
                    </tr>
                    <tr>
                        <td>Broj pojedinačnih obračuna:</td>
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
                        <td>Matični broj:</td>
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

                    return  <> <h5>1. ZBIRNI OBRAČUN PO MESTIMA MERENJA</h5>
                    <Table id='zbirnatabelax' striped bordered collapse hover variante='dark'>
                        <thead>
                        <tr>
                            <th>Redni broj</th>
                            <th>Broj mesta merenja</th>
                            <th>Naziv mesta merenja</th>
                            <th>Za isporučenu aktivnu EE</th>
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
                        

                        let sum1 = (item[0].vt ? (item[0].vt * (contract && contract.cenaVT)) : 0) + (item[0].nt ? (item[0].nt * (contract && contract.cenaNT)) : 0) + (item[0].jt ? (item[0].jt * (contract && contract.cenaJT)) : 0)
                        sumEnergija = sumEnergija + sum1
                        
                        let sum3 = sumEN * ((namet && namet.naknadaEe) + (namet && namet.naknadaOie))
                        sumNaknada = sumNaknada + sum3
                         
                        return       <tr>
                                    <td>{index+1}</td>
                                    <td>{metersByClientId.length !==0 && metersByClientId.find(el => el.id == item[0].idBrojilo).mestoMerenja}</td>
                                    <td>{metersByClientId.length !==0 && metersByClientId.find(el => el.id == item[0].idBrojilo).adresaMerenja}</td>
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
                            <h5>2. REKAPITULACIJA ZBIRNOG RAČUNA</h5>
                            <tbody>
                                <tr>
                                    <td>Isporučena električna energija</td>
                                    <td>1</td>
                                    <td>{numberWithDots(sumEnergija.toFixed(2))}</td>
                                </tr>
                                <tr>
                                    <td>Odobreni popust (Rabat %)</td>
                                    <td>2=1*0</td>
                                    <td>0,00</td>
                                </tr>
                                <tr>
                                    <td>Pristup sistemu za prenos/distribuciju eletrične energije</td>
                                    <td>3</td>
                                    <td>{numberWithDots(sumMrezarina.toFixed(2))}</td>
                                </tr>
                                <tr>
                                    <td>Naknada za podsticaj povlašćenih proizvodjača el. energije i unapređenje EE</td>
                                    <td>4</td>
                                    <td>{numberWithDots(sumNaknada.toFixed(2))}</td>
                                </tr>
                                <tr>
                                    <td>Osnovica za obračun akcize</td>
                                    <td>5=1+2+3+4</td>
                                    <td>{numberWithDots((sumEnergija + sumMrezarina + sumNaknada).toFixed(2))}</td>
                                </tr>
                                <tr>
                                    <td>Iznos obračunate akcize</td>
                                    <td>6=5*0.075</td>
                                    <td>{numberWithDots(((sumEnergija + sumMrezarina + sumNaknada) * 0.075).toFixed(2))}</td>
                                </tr>
                                <tr>
                                    <td>Oslobođen plaćanja akcize u skladu sa članom 40lj stav 1 Zakona o akcizama</td>
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
                                    <td>{numberWithDots(((sumEnergija + sumMrezarina + sumNaknada) * 0.215).toFixed(2))}</td>
                                </tr>
                                 <tr>
                                    <td>Taksa za javni medijski servis</td>
                                    <td>10</td>
                                    <td>{metersByClientId && metersByClientId.reduce((acc, curr) => {
                                        return acc + curr.taksa
                                    }, 0 ) * (namet && namet.naknadaTv)}</td>
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
                                    <td>{numberWithDots(((sumEnergija + sumMrezarina + sumNaknada) * 0.215).toFixed(2))}</td>
                                </tr>
                                <tr>
                                    <td>Ukupno za uplatu</td>
                                    <td>15=13+14+10</td>
                                    <td>{numberWithDots(((sumEnergija + sumMrezarina + sumNaknada) * 1.29 + (metersByClientId && metersByClientId.reduce((acc, curr) => {
                                        return acc + curr.taksa
                                    }, 0 ) * (namet && namet.naknadaTv))).toFixed(2))}</td>
                                </tr>
                            </tbody>
                        </Table>
                        </>
                })}
             
            
        
            {fakMetering && fakMetering.map((item, index)=>{
                

                let sum2 = 0;
                

                let sumEN = (item[0].vt ? item[0].vt : 0) + (item[0].nt ? item[0].nt : 0) + (item[0].jt ? item[0].jt : 0)
                

                let sum1 = (item[0].vt ? (item[0].vt *(contract && contract.cenaVT)) : 0) + (item[0].nt ? (item[0].nt * (contract && contract.cenaNT)) : 0) + (item[0].jt ? (item[0].jt * (contract && contract.cenaJT)) : 0)
                
                let sum3 = sumEN * ((namet && namet.naknadaEe) + (namet && namet.naknadaOie))

                return <><div style={{backgroundColor: '#e6f2ff', marginTop: '20px', padding: '30px', boxShadow: "1px 3px 1px #9E9E9E"}}>{item.length !== 0 &&
                    <>
                    
                    <h3>Račun broj {index+1}</h3>
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
                        <td>{metersByClientId.length !== 0 && nadjiNazivVrsteSnabdevanja(metersByClientId.find(el => {
                            return el.id == item[0].idBrojilo}).vrstaSnabdevanja)}</td>
                    </tr>
                    <tr>
                        <td>Odobrena snaga</td>
                        <td>{item[0].odosnaga}{' '}kW</td>
                    </tr>
                    <tr>
                        <td>Period obračuna</td>
                        <td>{item[0].datumpoc}{' - '}{item[0].datumkr}</td>
                    </tr>
                    <tr>
                        <td>Mesto merenja:</td>
                        <td>{metersByClientId.length !==0 && metersByClientId.find(el => el.id == item[0].idBrojilo).mestoMerenja}</td>
                    </tr>
                    <tr>
                        <td>Adresa merenja:</td>
                        <td>{metersByClientId.length !==0 && metersByClientId.find((el)=>el.id == item[0].idBrojilo).adresaMerenja}</td>
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
                        <td>Matični broj:</td>
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
                <h5>1. Obračun za isporučenu energiju</h5>
                <Table id={'tabela'+(index+1).toString()+'-1'} striped bordered hover variante='dark'>
                            <thead>
                                <tr>
                                    <th>Naziv</th>
                                    <th>Jed. mere</th>
                                    <th>Isporučena količina</th>
                                    <th>Jedinična cena</th>
                                    <th>Iznos</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {(item[0].vt || item[0].vt === 0) ? <tr><td>Viša tarifa</td><td>kWh</td><td>{item[0].vt}</td><td>{contract && contract.cenaVT}</td><td>{numberWithDots(((contract && contract.cenaVT) * item[0].vt).toFixed(2))}</td></tr> : ''}
                                {(item[0].nt || item[0].nt === 0) ? <tr><td>Niža tarifa</td><td>kWh</td><td>{item[0].nt}</td><td>{contract && contract.cenaNT}</td><td>{numberWithDots(((contract && contract.cenaNT) * item[0].nt).toFixed(2))}</td></tr> : ''}
                                {(item[0].jt || item[0].jt === 0) ? <tr><td>Jedinstvena tarifa</td><td>kWh</td><td>{item[0].jt}</td><td>{contract && contract.cenaJT}</td><td>{numberWithDots(((contract && contract.cenaJT) * item[0].jt).toFixed(2))}</td></tr> : ''}
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
                         <h5>2. Obračun za pristup sistemu za prenos/distribuciju električne energije</h5>
                        <Table id={'tabela'+(index+1).toString()+'-2'}  striped bordered hover variante='dark'>
                            <thead>
                                <tr>
                                <th>Naziv tarife</th>
                                <th>Obrač. veličina</th>
                                <th>Količina za obračun</th>
                                <th>Jedinična cena</th>
                                <th>Iznos</th>
                                </tr>
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
                                        sum2 = sum2 + item[0][it] *  (mrezarinaZaFakturu && mrezarinaZaFakturu[prop])
                                        return (
                                            <>
                                            <tr>
                                                <td>{dajPunNaziv(it)}</td>
                                                <td>{dajMeru(it)}</td>
                                                <td>{numberWithDots(item[0][it])}</td>
                                                <td>{mrezarinaZaFakturu && mrezarinaZaFakturu[prop]}</td>
                                                <td>{numberWithDots(((mrezarinaZaFakturu && mrezarinaZaFakturu[prop]) * item[0][it]).toFixed(2))}</td>
                                                
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
                        <h5>3. Obračun naknada za podsticaj povlašćenih proizvođača el. energije i unapređenje energetske efikasnosti</h5>
                        <Table id={'tabela'+(index+1).toString()+'-3'}  striped bordered hover variante='dark'>
                            <thead>
                                <tr>
                                <th>Naziv</th>
                                <th>Veličina</th>
                                <th>Količina</th>
                                <th>Jed. cena</th>
                                 <th>Iznos</th> 
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Naknada za podsticaj povlašćenih proizvođača el. energije</td>
                                    <td>kWh</td>
                                    <td>{numberWithDots(sumEN.toFixed(2))}</td>
                                    <td>{namet && namet.naknadaOie}</td>
                                    <td>{numberWithDots((sumEN * (namet && namet.naknadaOie)).toFixed(2))}</td> 
                                    </tr>
                                    <tr>
                                        <td>Naknada za unapređenje energetske efikasnosti</td>
                                        <td>kWh</td>
                                        <td>{numberWithDots(sumEN.toFixed(2))}</td>
                                        <td>{namet && namet.naknadaEe}</td>
                                        <td>{numberWithDots((sumEN * (namet && namet.naknadaEe)).toFixed(2))}</td>
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
                        <h5>4. Rekapitulacija obračuna</h5>
                        <Table id={'tabela'+(index+1).toString()+'-4'}  striped bordered hover variante='dark'>
                            <thead>
                                <tr>
                                    <th>Stavka</th>
                                    <th>Iznos</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                   <td>Isporučena električna energija</td>
                                   <td>{numberWithDots(sum1.toFixed(2))}</td>
                                </tr>
                                <tr>
                                   <td>Pristup sistemu za prenos/distribuciju električne energije</td>
                                   <td>{numberWithDots(sum2.toFixed(2))}</td>
                                </tr>
                                <tr>
                                   <td>Naknada za podsticaj povlašćenih proizvođača el. energije</td>
                                   <td>{numberWithDots((sumEN * (namet && namet.naknadaOie)).toFixed(2))}</td>
                                </tr>
                                <tr>
                                   <td>Naknada za unapređenje energetske efikasnosti</td>
                                   <td>{numberWithDots((sumEN * (namet && namet.naknadaEe)).toFixed(2))}</td>
                                </tr>
                                <tr>
                                   <td>Osnova za obračun akcize</td>
                                   <td>{numberWithDots((sum1 + sum2 + sum3).toFixed(2))}</td>
                                </tr>
                                <tr>
                                   <td>Iznos obračunate akcize stopa {namet && namet.akciza * 100}%</td>
                                   <td>{numberWithDots(((sum1 + sum2 + sum3) * (namet && namet.akciza)).toFixed(2))}</td>
                                </tr>
                                <tr>
                                   <td>Osnovica za PDV</td>
                                   <td>{numberWithDots(((sum1 + sum2 + sum3) * (namet && (namet.akciza + 1))).toFixed(2))}</td>
                                </tr>
                                <tr>
                                   <td>Porez na dodatu vrednost</td>
                                   <td>{numberWithDots(((sum1 + sum2 + sum3) * (namet && (namet.akciza + 1)) * (namet && (namet.pdv))).toFixed(2))}</td>
                                </tr>
                                <tr>
                                   <td>Taksa za javni medijski servis</td>
                                   <td>{(metersByClientId.length !== 0 && (metersByClientId.find(br => br.id == item[0].idBrojilo).taksa == 1)) ? (namet && namet.naknadaTv) : 0}</td>
                                </tr>
                                <tr>
                                    <td>Ukupno za obračun</td>
                                    <td>{numberWithDots(((sum1 + sum2 + sum3) * (namet && (namet.akciza + 1)) * (namet && (namet.pdv + 1)) + (metersByClientId.length !== 0 && metersByClientId.find(br => br.id == item[0].idBrojilo).taksa == 1 ? (namet && namet.naknadaTv) : 0)).toFixed(2))}</td>
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
