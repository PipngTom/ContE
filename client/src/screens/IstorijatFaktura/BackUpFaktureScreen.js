import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table, Form, Button } from 'react-bootstrap';
import { getBackupFakture } from '../../actions/backupFakturaActions';
import { nadjiNazivMeseca } from '../../constants/datum';
import { imgData } from '../FakturaKlijent/img';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import FormContainer from '../../components/FormContainer';
import { getSingleClient } from '../../actions/clientActions';

const BackUpFaktureScreen = ({match}) => {

    const clientId = match.params.id

    const dispatch = useDispatch()

    const [mesecMerenja, setMesecMerenja] = useState(new Date().getMonth())
    const [godinaMerenja, setGodinaMerenja] = useState(new Date().getFullYear())
    const [show, setShow] = useState(false)

    // const allClients = useSelector(state => state.allClients)
    // const {clients} = allClients

    const singleClient = useSelector(state => state.singleClient)
    const { client } = singleClient

    const rezFakture = useSelector(state => state.fakture)
    const { rFakture } = rezFakture

    useEffect(() => {
        if (clientId) {
            dispatch(getSingleClient)
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

        var y= 30
            doc.setLineWidth(2)
            doc.text(150, y = y + 30, `Racun za elektricnu energiju - ${nadjiNazivMeseca(mesecMerenja.toString()).toUpperCase()}${' '}${godinaMerenja}`)
    
            
    
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
        
            rFakture.pojedinacniRacuni.forEach((_, index)=>{
            var y= 30
            doc.setLineWidth(2)
            doc.text(150, y = y + 30, `Racun za eletricnu energiju - ${nadjiNazivMeseca(mesecMerenja.toString()).toUpperCase()}${' '}${godinaMerenja}`)
    
            
    
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
            if (index < rFakture.pojedinacniRacuni.length - 1)
            doc.addPage() 
        })
       
        doc.save('BFaktura.pdf')
    }

    const numberWithDots = (x) => {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    const buttonHandler = () => {
        setShow(true)
        dispatch(getBackupFakture(clientId, mesecMerenja, godinaMerenja))
    }

    return (
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
            <h3>Klijent:{'  '}{client && client.nazivKlijenta}</h3>
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
            {rFakture && <Row>
            <Col>
            <Table id='tabelaglavna' collapse hover variante='dark'>
                <tbody>
                    <tr>
                        <td>Org. deo:</td>
                        <td>{rFakture && rFakture.zbirniRacun.orgDeo}</td>
                    </tr>
                    <tr>
                        <td>Vrsta snabdevanja:</td>
                          <td>{rFakture && rFakture.zbirniRacun.vrstaSnabdevanja}</td>  
                    </tr>
                    <tr>
                        <td>Period obracuna:</td>
                        <td>{rFakture && rFakture.zbirniRacun.periodObracuna}</td>
                    </tr>
                    <tr>
                        <td>Broj pojedinacnih obracuna:</td>
                        <td>{rFakture && rFakture.zbirniRacun.brojPojedinacnihObracuna}</td>
                    </tr>
                </tbody>
            </Table>
            </Col>
            <Col>
            <Table id='tabelax' collapse hover variante='dark'>
                <tbody>
                    <tr>
                        <td>PIB:</td>
                        <td>{rFakture && rFakture.zbirniRacun.pib}</td>
                    </tr>
                    <tr>
                        <td>Maticni broj:</td>
                        <td>{rFakture && rFakture.zbirniRacun.maticniBroj}</td>
                    </tr>
                    <tr>
                        <td>Klijent:</td>
                        <td>{rFakture && rFakture.zbirniRacun.klijent}</td>
                    </tr>
                    <tr>
                        <td>Adresa:</td>
                        <td>{rFakture && rFakture.zbirniRacun.adresa}</td>
                    </tr>
                    <tr>
                        <td>Kontakt mail:</td>
                        <td>{rFakture && rFakture.zbirniRacun.kontaktMail}</td>
                    </tr>
                </tbody>
            </Table>
            </Col>
            </Row>}
            <br/>
            <br/>
               {rFakture && <><h5>1. ZBIRNI OBRACUN PO MESTIMA MERENJA</h5>
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
                    {rFakture.zbirniRacun.tabela1.map((item) => {
                       return <tr>
                       <td>{item.col1}</td>
                       <td>{item.col2}</td>
                       <td>{item.col3}</td>
                       <td>{numberWithDots(item.col4.toFixed(2))}</td>
                       <td>{numberWithDots(item.col5.toFixed(2))}</td>
                       <td>{numberWithDots(item.col6.toFixed(2))}</td>
                   </tr>
                    })}
                        
                    </tbody>
                </Table></>}
                <br/>
                <br/>
                {rFakture && <><h5>2. REKAPITULACIJA ZBIRNOG RACUNA</h5>
                <Table id='zbirnatabelay' striped bordered collapse hover variante='dark'>
                    <tbody>
                        {rFakture && rFakture.zbirniRacun.tabela2.map(item => {
                            return <tr>
                                <td>{item.col1}</td>
                                <td>{item.col2}</td>
                                <td>{numberWithDots(item.col3.toFixed(2))}</td>
                            </tr>
                        })}
                    </tbody>
                </Table></>}
                
                    {rFakture && rFakture.pojedinacniRacuni.map((item, index) => (
                        <>
                        <br/>
                        <br/>
                        <h3>Racun broj {index+1}</h3>
                        <br/>
                        <Row>
                        <Col>
                            <Table id={'tabelay' + (index+1).toString()} collapse hover variante='dark'>
                                <tbody>
                                    <tr>
                                        <td>Org deo:</td>
                                        <td>{item.orgDeo}</td>
                                    </tr>
                                    <tr>
                                        <td>Kategorija:</td>
                                        <td>{item.kategorija}</td>
                                    </tr>
                                    <tr>
                                        <td>Vrsta snabdevanja:</td>
                                        <td>{item.vrstaSnabdevanja}</td>
                                    </tr>
                                    <tr>
                                        <td>Odobrena snaga:</td>
                                        <td>{item.odSnaga}{' '}kW</td>
                                    </tr>
                                    <tr>
                                        <td>Period obracuna:</td>
                                        <td>{item.periodOb}</td>
                                    </tr>
                                    <tr>
                                        <td>Mesto merenja:</td>
                                        <td>{item.mestoM}</td>
                                    </tr>
                                    <tr>
                                        <td>Adresa merenja:</td>
                                        <td>{item.adresaM}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                        <Col>
                            <Table id={'tabelax' + (index+1).toString()} collapse hover variante='dark'>
                                <tbody>
                                    <tr>
                                        <td>PIB:</td>
                                        <td>{item.pib}</td>
                                    </tr>
                                    <tr>
                                        <td>Maticni broj:</td>
                                        <td>{item.maticniB}</td>
                                    </tr>
                                    <tr>
                                        <td>Klijent:</td>
                                        <td>{item.klijent}</td>
                                    </tr>
                                    <tr>
                                        <td>Adresa:</td>
                                        <td>{item.adresa}</td>
                                    </tr>
                                    <tr>
                                        <td>Kontakt mail:</td>
                                        <td>{item.kontMail}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                        </Row>
                        <br/>
                        <h5>1. Obracun za isporucenu energiju</h5>
                    <Table id={'tabela'+(index+1).toString()+'-1'} striped bordered collapse hover variante='dark'>
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
                        {item.tabela1.map(it=>(
                            <tr>
                                <td>{it.col1}</td>
                                <td>{it.col2}</td>
                                <td>{it.col3}</td>
                                <td>{it.col4}</td>
                                <td>{numberWithDots(it.col5.toFixed(2))}</td>
                                
                            </tr>
                        )
                            )}
                            
                      
                    </tbody>
                </Table>
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
                        {item.tabela2.map(it => (
                            <tr>
                                <td>{it.col1}</td>
                                <td>{it.col2}</td>
                                <td>{numberWithDots(it.col3)}</td>
                                <td>{it.col4}</td>
                                <td>{numberWithDots(it.col5.toFixed(2))}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
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
                        {item.tabela3.map(it => (
                            <tr>
                                <td>{it.col1}</td>
                                <td>{it.col2}</td>
                                <td>{numberWithDots(it.col3)}</td>
                                <td>{it.col4}</td>
                                <td>{numberWithDots(it.col5.toFixed(2))}</td>
                            </tr>
                        ))}
                    </tbody>  
                </Table>
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
                        {item.tabela4.map(it => (
                            <tr>
                                <td>{it.col1}</td>
                                <td>{numberWithDots(it.col2.toFixed(2))}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                </>))}
                
        </FormContainer>
    )
}

export default BackUpFaktureScreen
