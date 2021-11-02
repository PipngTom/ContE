import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Modal, Nav, Table } from 'react-bootstrap';
import debounce from 'lodash.debounce';
import { getAllClients } from '../../actions/clientActions';
import Loader from '../../components/Loader';

const FakturaZaKlijentaScreen = ({history}) => {

    const dispatch = useDispatch()

    const [searchString, setsearchString] = useState('')

    const allClients = useSelector(state => state.allClients)
    const {loading, clients} = allClients

    const mrezarina = useSelector(state => state.mrezarina)
    const {mrezarina: mrezarinaZaFakturu} = mrezarina

     const allMeteringByMeterId = useSelector(state => state.allMeteringByMeterId)
     const {error, metering} = allMeteringByMeterId

     const singleContract = useSelector(state => state.singleContract)
    const {contract} = singleContract

    useEffect(() => {
        dispatch(getAllClients())
    } , [dispatch])

    const racuniHandler = (id) => {
        history.push({pathname: `/fakturaklijent/racuni/${id}`})
    }


    const handleTypeNazivKlijenta=(e)=>{
    
        setsearchString(e.target.value)
        
      }

    return (
        <>
        <h1>Lista svih klijenata</h1>
        {loading ? (
            <Loader/>
        ) : (<>
            {/* <Button type='submit' variant='primary' onClick={noviKlijent}>
                Novi klijent
            </Button> */}
            <br/>
            <Table striped bordered hover variante='dark'>
                <thead>
                    <tr>
                        <th>Naziv klijenta</th>
                        <th>Adresa</th>
                        <th>Kontakt mail</th>
                        <th>Telefon</th>
                        <th>PIB</th>
                        <th>Maticni broj</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                        <Form.Control type="text" placeholder="Pretrazi klijenta" onChange={debounce(handleTypeNazivKlijenta, 300)} />
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    {clients.filter((el)=> searchString==='' || el.nazivKlijenta.toUpperCase().includes(searchString.toUpperCase()))
                    .map(item => (
                        <tr key={item.id}>
                            <td>{item.nazivKlijenta}</td>
                            <td>{item.adresaKlijenta}</td>
                            <td>{item.kontaktMail}</td>
                            <td>{item.kontaktTelefon}</td>
                            <td>{item.pib}</td>
                            <td>{item.maticniBroj}</td>
                            <td>
                                <Nav.Link onClick={()=> racuniHandler(item.id)}>Računi</Nav.Link>
                                {/* <Nav.Link onClick={()=>deleteHandler(item.id)}>Delete</Nav.Link> */}
                            </td>
                        </tr>  
                    ))}
                </tbody>
            </Table>
            </>
        )}
        
    </>
    )
}

export default FakturaZaKlijentaScreen
