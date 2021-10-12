import React, {useState, useEffect}  from 'react'
import {Form, Button, Row, Col, Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import {getSingleMeter} from '../../actions/meterActions';
import { getSingleContractByMeterId } from '../../actions/contractActions';
import { getMrezarina } from '../../actions/mrezarinaActions';
import { getMeteringByMeterId } from '../../actions/meteringActions';
import {kategorija, vrsteSnabdevanja} from '../../constants/brojila'
import {GET_SINGLE_METER_RESET} from '../../constants/meterConstants'
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'
import { encodeBase64 } from 'bcryptjs';

const NewFakturaScreen = ({match}) => {

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


    const dispatch = useDispatch()

    useEffect(() => {
        if(!meter){
            console.log('upaopoo')
            dispatch(getSingleContractByMeterId(meterId))
            dispatch(getSingleMeter(meterId))
         //   dispatch(getMrezarina())
        } else {
            const tabela = kategorija.find((item)=>item.sifra == meter.kategorija).tabela
            dispatch(getMeteringByMeterId(meterId, tabela))
        }
        
        
    }, [dispatch, meter])

    const handleChange = (e) => {
        console.log(e.target.value)
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
            if(cur == 'id' || cur == 'idBrojilo' || cur == 'datumpoc' || cur == 'datumkr' || cur == 'maxsnaga'){
             return acc
         } else {
              const property =  kategorija.find((cur)=>cur.sifra == meter.kategorija).tabela.replace('merenja_','')+'_'+cur
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

        var imgData = 'data:image/jpeg;base64,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'

        doc.addImage(imgData, 'JPEG', 20, 10, 550, 30)

        doc.autoTable({
            html: '#tabela0',
            theme: 'striped',
            startY: 70,
            styles: { fontSize: 6 },
            bodyStyles: { cellWidth: 100 }
        })
        doc.setFontSize(8)
        doc.text(400, 80, 'PIB:    112068110')
        doc.text(400, 95, 'MB:     20330270')
        doc.setFontSize(10)
        doc.text(400, 110, 'Extra Energy DOO')
        doc.setFontSize(8)
        doc.text(400, 125, 'Marsala Tita 56, 21460 Vrbas')

        doc.autoTable({
            html: '#tabela1',
            theme: 'grid',
            columnStyles: { 3: { halign: 'right' }}
        })
        doc.setFontSize(12)
        doc.text('2. Obracun za pristup sistemu za prenos/distribuciju elektricne energije', 40, doc.autoTable.previous.finalY + 15)
         doc.autoTable({
            html: '#tabela2', 
            theme: 'grid',
            columnStyles: { 3: { halign: 'right' }}
        }) 
        doc.setFontSize(12)
        doc.text('3. Obracun naknada za podsticaj povl. proizvodjaca el. energije i unapredjenje energetske efikasnosti', 40, doc.autoTable.previous.finalY + 15)
        doc.autoTable({
            html: '#tabela3', theme: 'grid',
            columnStyles: { 1: { halign: 'right' }, 2: { halign: 'right' }, 3: { halign: 'right' }  } 
        }) 
        doc.setFontSize(12)
        doc.text('4. Rekapitulacija', 40, doc.autoTable.previous.finalY + 15)
        doc.autoTable({
            html: '#tabela4',
            theme: 'grid',
            columnStyles: { 1: { halign: 'right' } }
        }) 
    
      
        doc.save('Faktura proba.pdf')
     /*    doc.html(document.querySelector('#content'),{
            //margin: 500,
            callback: function(pdf){
                pdf.save('Faktura proba.pdf')
            },

            
        }) */

    }

    return (
        <>
            <Form>
            <Form.Group controlId='selectedMetering'>
                <Form.Label>Vremenski period</Form.Label>
                <Form.Control as='select'  value={selectedMetering.id}
                onChange={handleChange}>
                    <option value={0}>Izbor perioda</option>
                    {metering && metering.map((item)=>{
                        let partsPoc = item.datumpoc.split('-')
                        let myDatePoc = new Date(partsPoc[0], partsPoc[1]-1, partsPoc[2])
                        let partsKr = item.datumkr.split('-')
                        let myDateKr = new Date(partsKr[0], partsKr[1]-1, partsKr[2])
                       
                        let resDate = new Date((myDatePoc.getTime() + myDateKr.getTime())/2)
                      
                        return <option value={item.id}>{resDate.getFullYear()} {resDate.getMonth()+1}</option>
                    })}
                </Form.Control>
            </Form.Group>
            </Form>
            <br/>
            <p>Obracun za isporucenu energiju</p>
            <Table id='tabela0' collapse striped bordered hover variante='dark'>
                <tbody>
                    <tr>
                        <td>Racun broj:</td>
                        <td>292834234</td>
                    </tr>
                    <tr>
                        <td>Mesto izdavanja:</td>
                        <td>Beograd</td>
                    </tr>
                    <tr>
                        <td>Datum izdavanja:</td>
                        <td>21.02.2021</td>
                    </tr>
                    <tr>
                        <td>Datum prometa i akcize:</td>
                        <td>01.02.2021</td>
                    </tr>
                </tbody>
            </Table>
            {/* <div id='podaci' variante='dark'>
                        <p>Racun broj:</p>
                        <p>292834234</p>
            </div> */}
            <Table id='tabela1' striped bordered hover variante='dark'>
                    <thead>
                        <tr>
                            <th>Stavka</th>
                            <th>kolicina</th>
                            <th>jed cena</th>
                            <th>Iznos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedMetering.vt ? (
                            <>
                            <tr>
                        <td>Visa tarifa</td>
                        <td>{numberWithDots(selectedMetering.vt)}</td>
                        <td>{contract.cenaVT}</td>
                        <td>{numberWithDots((selectedMetering.vt * contract.cenaVT).toFixed(2))}</td>
                        </tr>
                        </>) : ''}
                        {selectedMetering.nt ? (
                            <>
                            <tr>
                        <td>Niza tarifa</td>
                        <td>{numberWithDots(selectedMetering.nt)}</td>
                        <td>{contract.cenaVT}</td>
                        <td>{numberWithDots((selectedMetering.nt * contract.cenaNT).toFixed(2))}</td>
                        </tr>
                        </>) : ''}
                        {selectedMetering.jt ? (
                            <>
                            <tr>
                        <td>Jedinstvena tarifa</td>
                        <td>{numberWithDots(selectedMetering.jt)}</td>
                        <td>{contract.cenaJT}</td>
                        <td>{numberWithDots((selectedMetering.jt * contract.cenaJT).toFixed(2))}</td>
                        </tr>
                        </>) : ''}
                        <tr>
                        <td></td>
                                   <td></td>
                                   <td>Ukupno</td>
                                   <td>{numberWithDots(racunajEnergiju().toFixed(2))}</td>
                        </tr>

                    </tbody>
                </Table>
                <br/>
                <p>Obracun za pristup sistemu za prenos/distribuciju elektricne energije</p>
                <Table id='tabela2' striped bordered hover variante='dark'>
                    <thead>
                        <tr>
                            <th>Stavka</th>
                            <th>kolicina</th>
                            <th>jed cena</th>
                            <th>Iznos</th>
                        </tr>
                    </thead>
                    <tbody>
                       {Object.keys(selectedMetering).map((item)=>{
                           if(item == 'id' || item == 'idBrojilo' || item == 'datumpoc' || item == 'datumkr' || item == 'maxsnaga'){
                               //do not render
                           } else {
                                const property =  kategorija.find((item)=>item.sifra == meter.kategorija).tabela.replace('merenja_','')+'_'+item
                        
                              //  console.log(property)
                              //  console.log(mrezarina[property])
                               return (<>
                               <tr>
                                   <td>{item}</td>
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
                                   <td>Ukupno</td>
                                   <td>
                                   {numberWithDots(racunajMrezarinu().toFixed(2))
                                   }
                                   </td>
                                </tr>
                    </tbody>
                </Table>
                <br/>
                <p>Obracun naknada za podsticaj povlascenih proizvodjaca el. energije i unapredjenje energetske efikasnosti</p>
            <Table id='tabela3' striped bordered hover variante='dark'>
                    <thead>
                        <tr>
                            <th>Stavka</th>
                            <th>kolicina</th>
                            <th>jed cena</th>
                            <th>Iznos</th>
                        </tr>
                    </thead>
                    <tbody>
                       <tr>
                           <td>Naknada za podsticaj povlascenih proizvodjaca el. energije</td>
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
                                   <td>Ukupno</td>
                                   <td>{numberWithDots(racunajNaknade().toFixed(2))}</td>
                        </tr>
                    </tbody>
                </Table>
                <br/>
                <p>Rekapitulacija</p>
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
                <Button type='button' variant='primary outline' onClick={createPdfHandler}>Izvezi u PDF</Button>
        </>
    )
}

export default NewFakturaScreen
