import React, {useState, useEffect}  from 'react';
import {Form, Button, Row, Col, Table} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {getSingleMeter} from '../../actions/meterActions';
import { getSingleContractByMeterId } from '../../actions/contractActions';
import { getSingleClientByMeterId } from '../../actions/clientActions';
import { getMeteringByMeterId } from '../../actions/meteringActions';
import { nadjiTabeluPoKategoriji} from '../../constants/brojila';
import { dajPunNaziv, dajMeru } from '../Fakture/pomocnaFunkcija';
import { imgData } from './img'; 
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import FormContainer from '../../components/FormContainer';

const NewFakturaScreen = ({ match }) => {

    const [selectedMetering, setSelectedMetering] = useState({})

    const meterId = match.params.id;

    const singleMeter = useSelector(state => state.singleMeter)
    
    const {loading: singleMeterLoading, error: singleMeterError, meter} = singleMeter

    const allMeteringByMeterId = useSelector(state => state.allMeteringByMeterId)
    
    const {loading, error, metering} = allMeteringByMeterId

    const singleContract = useSelector(state => state.singleContract)
    
    const {contract} = singleContract

    const mrezarina = useSelector(state => state.mrezarina)
    
    const {mrezarina: mrezarinaZaFakturu} = mrezarina

    const singleClient = useSelector(state => state.singleClient)

    const {client} = singleClient


    const dispatch = useDispatch()

    useEffect(() => {
        if(!meter){
            dispatch(getSingleContractByMeterId(meterId))
            dispatch(getSingleMeter(meterId))
            dispatch(getSingleClientByMeterId(meterId))
        } else {
            const tabela = nadjiTabeluPoKategoriji(meter.kategorija)
            dispatch(getMeteringByMeterId(meterId, tabela))
        }
        
        
    }, [dispatch, meter])

    const handleChange = (e) => {
        if(e.target.value != 0){
            setSelectedMetering(metering.find((item)=>item.id==e.target.value))
        } else {
            setSelectedMetering({id: 0})
        }
        
    }

    const racunajEnergiju = () => {
        return ((selectedMetering.vt ? selectedMetering.vt * contract.cenaVT : 0) + 
                                   (selectedMetering.nt ? selectedMetering.nt * contract.cenaNT : 0) + 
                                   (selectedMetering.jt ? selectedMetering.jt * contract.cenaJT : 0))
    }

    const racunajMrezarinu = () => {
        return Object.keys(selectedMetering).reduce((acc, cur)=>{
            if(cur == 'id' || cur == 'idBrojilo' || cur == 'datumpoc' || cur == 'datumkr' || cur == 'maxsnaga' || cur == 'godina' || cur == 'mesec'){
             return acc
         } else {
              const property =  nadjiTabeluPoKategoriji(meter.kategorija).replace('merenja_','')+'_'+cur
              return acc + mrezarinaZaFakturu[property] * selectedMetering[cur]
         }

        }, 0)

    }

    const racunajNaknade = () => {
        return ((selectedMetering.vt ? selectedMetering.vt : 0) + 
                                   (selectedMetering.nt ? selectedMetering.nt : 0) + 
                                   (selectedMetering.jt ? selectedMetering.jt : 0)) * (mrezarinaZaFakturu && (mrezarinaZaFakturu.naknada_ee + mrezarinaZaFakturu.naknada_oie))
    }

    const racunajOIE = () => {
        return (((selectedMetering.vt ? selectedMetering.vt : 0) + 
                                   (selectedMetering.nt ? selectedMetering.nt : 0) + 
                                   (selectedMetering.jt ? selectedMetering.jt : 0)) * (mrezarinaZaFakturu && mrezarinaZaFakturu.naknada_oie))
    }

    const racunajEE = () => {
        return (((selectedMetering.vt ? selectedMetering.vt : 0) + 
                                   (selectedMetering.nt ? selectedMetering.nt : 0) + 
                                   (selectedMetering.jt ? selectedMetering.jt : 0)) * (mrezarinaZaFakturu && mrezarinaZaFakturu.naknada_ee))
    }

    const numberWithDots = (x) => {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    const createPdfHandler = () => {

        var doc = new jsPDF('p','pt', 'a4')

        var y= 30
        doc.setLineWidth(2)
        doc.text(200, y = y + 30, 'Racun za elektricnu energiju')

        

        doc.addImage(imgData, 'JPEG', 20, 10, 550, 30)

        doc.autoTable({
            html: '#tabela0',
            theme: 'striped',
            startY: 70,
            styles: { fontSize: 6 },
            bodyStyles: { cellWidth: 100 }
        })
        doc.setFontSize(10)
        doc.text(400, 80, `PIB:    ${client.pib}`)
        doc.text(400, 95, `MB:     ${client.maticniBroj}`)
        doc.setFontSize(12)
        doc.text(400, 110, `${client.nazivKlijenta}`)
        doc.setFontSize(10)
        doc.text(400, 125, `${client.adresaKlijenta}, 21460 Vrbas`)
        doc.setFontSize(10)
        doc.text(400, 140, `${client.kontaktMail}`)

        doc.setFontSize(12)
        doc.text('1. Obracun za isporucenu energiju', 40, doc.autoTable.previous.finalY + 15)
        doc.autoTable({
            html: '#tabela1',
            theme: 'grid',
            styles: { cellPadding: 2 },
            headStyles:  { halign: 'center', valign: 'middle'} ,
            columnStyles: { 1: { halign: 'center', cellWidth: 50 }, 2: { halign: 'right', cellWidth: 80 }, 3: { halign: 'right', cellWidth: 90 }, 4: { halign: 'right'}}
        })
        doc.setFontSize(12)
        doc.text('2. Obracun za pristup sistemu za prenos/distribuciju elektricne energije', 40, doc.autoTable.previous.finalY + 15)
         doc.autoTable({
            html: '#tabela2', 
            theme: 'grid',
            styles: {cellPadding: 2},
            headStyles: { halign: 'center', valign: 'middle'} ,
            columnStyles: {1: {halign: 'center', cellWidth: 50}, 2: {halign: 'right', cellWidth: 80}, 3: { halign: 'right', cellWidth: 80 }, 4: {halign: 'right'}}
        }) 
        doc.setFontSize(12)
        doc.text('3. Obracun naknada za podsticaj povl. proizvodjaca el. energije i unapredjenje energetske efikasnosti', 40, doc.autoTable.previous.finalY + 15)
        doc.autoTable({
            html: '#tabela3', theme: 'grid',
            styles: {cellPadding: 2},
            headStyles: { halign: 'center'} ,
            columnStyles: { 0: { cellWidth: 300 }, 1: { halign: 'center', cellWidth: 60 }, 2: { halign: 'right' }, 3: { halign: 'right' }, 4: {halign: 'right'}  } 
        }) 
        doc.setFontSize(12)
        doc.text('4. Rekapitulacija', 40, doc.autoTable.previous.finalY + 15)
        doc.autoTable({
            html: '#tabela4',
            theme: 'grid',
            styles: {cellPadding: 2},
            columnStyles: { 1: { halign: 'right' } }
        }) 
    
      
        doc.save('Faktura proba.pdf')
    }

    return (
        <>
        <FormContainer>
            <Form>
            <Form.Group controlId='selectedMetering'>
                <h4>Vremenski period</h4>
                <Form.Control as='select'  value={selectedMetering.id}
                onChange={handleChange}>
                    <option value={0}>Izbor perioda</option>
                    {metering && metering.map((item)=>{
                        console.log(item.datumpoc)
                        let partsPoc = item.datumpoc.split('.')
                        let myDatePoc = new Date(partsPoc[2], partsPoc[1]-1, partsPoc[0])
                        let partsKr = item.datumkr.split('.')
                        let myDateKr = new Date(partsKr[2], partsKr[1]-1, partsKr[0])
                       
                        let resDate = new Date((myDatePoc.getTime() + myDateKr.getTime())/2)
                      
                        return <option value={item.id}>{resDate.getFullYear()} {resDate.getMonth()+1}</option>
                    })}
                </Form.Control>
            </Form.Group>
            </Form>
            <br/>
            <Row>
            <Col>
            <Table id='tabela0' collapse  hover variante='dark'>
                <tbody>
                    <tr>
                        <td>Racun broj:</td>
                        <td>{client && client.racunBanka}</td>
                    </tr>
                    <tr>
                        <td>Datum izdavanja:</td>
                        <td>21.02.2021</td>
                    </tr>
                    <tr>
                        <td>Datum prometa i akcize:</td>
                        <td>01.02.2021</td>
                    </tr>
                    <tr>
                        <td>Mesto izdavanja:</td>
                        <td>Beograd</td>
                    </tr>
                    <tr>
                        <td>Org. deo:</td>
                        <td>{client && client.nazivKlijenta}</td>
                    </tr>
                    <tr>
                        <td>Vrsta snabdevanja:</td>
                        <td>Komercijalno snabdevanje</td>
                    </tr>
                    <tr>
                        <td>Period obracunavanja:</td>
                        <td>02.01.2021 - 01.02.2021</td>
                    </tr>
                    <tr>
                        <td>Mesto merenja:</td>
                        <td>{meter && meter.mestoMerenja}</td>
                    </tr>
                    <tr>
                        <td>Adresa merenja:</td>
                        <td>{meter && meter.adresaMerenja}</td>
                    </tr>
                </tbody>
            </Table>
            </Col>
            <Col>
            <Table id='tabela0' collapse hover variante='dark'>
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
            <h4>1. Obracun za isporucenu energiju</h4>
            <Table id='tabela1' striped bordered hover variante='dark'>
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
                        {selectedMetering.vt ? (
                            <>
                            <tr>
                        <td>Visa tarifa</td>
                        <td>kWh</td>
                        <td>{numberWithDots(selectedMetering.vt)}</td>
                        <td>{contract.cenaVT}</td>
                        <td>{numberWithDots((selectedMetering.vt * contract.cenaVT).toFixed(2))}</td>
                        </tr>
                        </>) : ''}
                        {selectedMetering.nt ? (
                            <>
                            <tr>
                        <td>Niza tarifa</td>
                        <td>kWh</td>
                        <td>{numberWithDots(selectedMetering.nt)}</td>
                        <td>{contract.cenaVT}</td>
                        <td>{numberWithDots((selectedMetering.nt * contract.cenaNT).toFixed(2))}</td>
                        </tr>
                        </>) : ''}
                        {selectedMetering.jt ? (
                            <>
                            <tr>
                        <td>Jedinstvena tarifa</td>
                        <td>kWh</td>
                        <td>{numberWithDots(selectedMetering.jt)}</td>
                        <td>{contract.cenaJT}</td>
                        <td>{numberWithDots((selectedMetering.jt * contract.cenaJT).toFixed(2))}</td>
                        </tr>
                        </>) : ''}
                        <tr>
                        <td></td>
                                   <td></td>
                                   <td></td>
                                   <td>Ukupno</td>
                                   <td>{numberWithDots(racunajEnergiju().toFixed(2))}</td>
                        </tr>

                    </tbody>
                </Table>
                <br/>
                <h4>2. Obracun za pristup sistemu za prenos/distribuciju elektricne energije</h4>
                <Table id='tabela2' striped bordered hover variante='dark'>
                    <thead>
                        <tr>
                            <th>Naziv tarife</th>
                            <th>Obrac. velicina</th>
                            <th>Kolicina za obracun</th>
                            <th>Jedinicna cena</th>
                            <th>Iznos</th>
                        </tr>
                    </thead>
                    <tbody>
                       {Object.keys(selectedMetering).map((item)=>{
                           if(item == 'id' || item == 'idBrojilo' || item == 'datumpoc' || item == 'datumkr' || item == 'maxsnaga' || item == 'godina' || item == 'mesec' || item == 'kategorija'){

                           } else {
                                const property =  nadjiTabeluPoKategoriji(meter.kategorija).replace('merenja_','')+'_'+item
                    
                               return (<>
                               <tr>
                                   <td>{dajPunNaziv(item)}</td>
                                    <td>{dajMeru(item)}</td>
                                   <td>{numberWithDots(selectedMetering[item])}</td>
                                   <td>{mrezarinaZaFakturu[property]}</td>
                                   <td>{numberWithDots((mrezarinaZaFakturu[property] * selectedMetering[item]).toFixed(2))}</td>
                               </tr>
                               
                               
                               </>
                               )
                               
                           }

                       })
                       
                       }
                                <tr>
                                   <td></td>
                                   <td></td>
                                   <td></td>
                                   <td>Ukupno</td>
                                   <td>
                                   {numberWithDots(racunajMrezarinu().toFixed(2))
                                   }
                                   </td>
                                </tr>
                    </tbody>
                </Table>
                <br/>
                <h4>3. Obracun naknada za podsticaj povlascenih proizvodjaca el. energije i unapredjenje energetske efikasnosti</h4>
            <Table id='tabela3' striped bordered hover variante='dark'>
                    <thead>
                        <tr>
                            <th>Naziv tarife</th>
                            <th>Velicina</th>
                            <th>Kolicina</th>
                            <th>Jed. cena</th>
                            <th>Iznos</th>
                        </tr>
                    </thead>
                    <tbody>
                       <tr>
                           <td>Naknada za podsticaj povlascenih proizvodjaca el. energije</td>
                           <td>kWh</td>
                           <td>{numberWithDots((selectedMetering.vt ? selectedMetering.vt : 0) + 
                                   (selectedMetering.nt ? selectedMetering.nt : 0) + 
                                   (selectedMetering.jt ? selectedMetering.jt : 0))}</td>
                           <td>
                               {mrezarinaZaFakturu && mrezarinaZaFakturu.naknada_oie}
                           </td>
                           <td>
                           {numberWithDots(racunajOIE().toFixed(2))}
                           </td>
                       </tr>
                       <tr>
                           <td>Naknada za unapredjenje energetske efikasnosti</td>
                           <td>kWh</td>
                           <td>{numberWithDots((selectedMetering.vt ? selectedMetering.vt : 0) + 
                                   (selectedMetering.nt ? selectedMetering.nt : 0) + 
                                   (selectedMetering.jt ? selectedMetering.jt : 0))}</td>
                           <td>
                               {mrezarinaZaFakturu && mrezarinaZaFakturu.naknada_ee}
                           </td>
                           <td>
                           {numberWithDots(racunajEE().toFixed(2))}
                           </td>
                       </tr>
                       <tr>
                                   <td></td>
                                   <td></td>
                                   <td></td>
                                   <td>Ukupno</td>
                                   <td>{numberWithDots(racunajNaknade().toFixed(2))}</td>
                        </tr>
                    </tbody>
                </Table>
                <br/>
                <h4>4. Rekapitulacija obracuna</h4>
            <Table id='tabela4' striped bordered hover variante='dark'>
                    <thead>
                        <tr>
                            <th>Stavka</th>
                            <th>Iznos</th>
                        </tr>
                    </thead>
                    <tbody>
                                <tr>
                                   <td>Isporucena elektricna energija</td>
                                   <td>{numberWithDots(racunajEnergiju().toFixed(2))}</td>
                                </tr>
                                <tr>
                                   <td>Pristup sistemu za prenos/distribuciju elektricne energije</td>
                                   <td>{numberWithDots(racunajMrezarinu().toFixed(2))}</td>
                                </tr>
                                <tr>
                                   <td>Naknada za podsticaj povlascenih proizvodjaca el. energije</td>
                                   <td>{numberWithDots(racunajOIE().toFixed(2))}</td>
                                </tr>
                                <tr>
                                   <td>Naknada za unapredjenje energetske efikasnosti</td>
                                   <td>{numberWithDots(racunajEE().toFixed(2))}</td>
                                </tr>
                                <tr>
                                   <td>Osnova za obracun akcize</td>
                                   <td>{numberWithDots((racunajEnergiju() + racunajMrezarinu() + racunajEE()+ racunajOIE()).toFixed(2))}</td>
                                </tr>
                                <tr>
                                   <td>Iznos obracunate akcize stopa {mrezarinaZaFakturu && mrezarinaZaFakturu.akciza*100}%</td>
                                   <td>{numberWithDots(((racunajEnergiju() + racunajMrezarinu() + racunajEE()+ racunajOIE()) * (mrezarinaZaFakturu && mrezarinaZaFakturu.akciza)).toFixed(2))}</td>
                                </tr>
                                <tr>
                                   <td>Osnovica za PDV</td>
                                   <td>{numberWithDots(((racunajEnergiju() + racunajMrezarinu() + racunajEE()+ racunajOIE()) * (mrezarinaZaFakturu && (mrezarinaZaFakturu.akciza + 1))).toFixed(2))}</td>
                                </tr>
                                <tr>
                                   <td>Porez na dodatu vrednost</td>
                                   <td>{numberWithDots(((racunajEnergiju() + racunajMrezarinu() + racunajEE()+ racunajOIE()) * (mrezarinaZaFakturu && (mrezarinaZaFakturu.akciza + 1))* (mrezarinaZaFakturu && (mrezarinaZaFakturu.pdv))).toFixed(2))}</td>
                                </tr>
                                <tr>
                                   <td>Taksa za javni medijski servis</td>
                                   <td>{(mrezarinaZaFakturu && (mrezarinaZaFakturu.naknada_tv)).toFixed(2)}</td>
                                </tr>
                                <tr>
                                   <td>Ukupno za obracun</td>
                                   <td>{numberWithDots((((racunajEnergiju() + racunajMrezarinu() + racunajEE()+ racunajOIE()) * (mrezarinaZaFakturu && (mrezarinaZaFakturu.akciza + 1))* (mrezarinaZaFakturu && (mrezarinaZaFakturu.pdv + 1)))+(mrezarinaZaFakturu && (mrezarinaZaFakturu.naknada_tv))).toFixed(2))}</td>
                                </tr>
                    </tbody>
                </Table>
                <Button type='button' size='lg' variant='primary' onClick={createPdfHandler}>Izvezi u PDF</Button>
                </FormContainer>
        </>
    )
}

export default NewFakturaScreen
