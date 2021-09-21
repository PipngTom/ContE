import React, {useState, useEffect}  from 'react'
import {Form, Button, Row, Col, Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import {getSingleMeter} from '../../actions/meterActions';
import { getSingleContractByMeterId } from '../../actions/contractActions';
import { getMrezarina } from '../../actions/mrezarinaActions';
import { getMeteringByMeterId } from '../../actions/meteringActions';
import {kategorija, vrsteSnabdevanja} from '../../constants/brojila'
import {GET_SINGLE_METER_RESET} from '../../constants/meterConstants'

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

    return (
        <div>
            <h1>Kreiranje Fakture</h1>
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
            <h2>Obracun za isporucenu energiju</h2>
            <Table striped bordered hover variante='dark'>
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
                <h2>Obracun za pristup sistemu za prenos/distribuciju elektricne energije</h2>
                <Table striped bordered hover variante='dark'>
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
                <h3>Obracun naknada za podsticaj povlascenih proizvodjaca el. energije i unapredjenje energetske efikasnosti</h3>
            <Table striped bordered hover variante='dark'>
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
                <h3>Rekapitulacija</h3>
            <Table striped bordered hover variante='dark'>
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

        </div>
    )
}

export default NewFakturaScreen
