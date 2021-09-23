import React , {useState, useEffect} from 'react'
import {Table, Button, Nav, Modal, Form} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { getAllClients, deleteSingleClient } from '../../actions/clientActions';
import Loader from '../../components/Loader'

const ClientsScreen = ({history}) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedId, setSelectedId] = useState(0)
    const [searchString, setsearchString] = useState('')

    const dispatch = useDispatch()

    const allClients = useSelector(state => state.allClients)

    const {loading, error, clients} = allClients


    useEffect(() => {
        dispatch(getAllClients())
    }, [dispatch])

    const editHandler = (id) => {
        console.log(id)
        history.push({pathname: `/clients/edit/${id}`})
    }

    const noviKlijent = () => {
        history.push({pathname: `/clients/new`})
    }

    const deleteHandler = (id) => {
        setSelectedId(id)
        setShowDeleteModal(true)
    }

    const handleDeleteClose = () => {
        setShowDeleteModal(false)
    }

    const handleDeleteAccept = () => {
        dispatch(deleteSingleClient(selectedId))
        setShowDeleteModal(false)
    }

    const handleTypeNazivKlijenta=(e)=>{
       
        console.log(e.target.value);
        setsearchString(e.target.value)
        
      }

    return (
        <>
            <h1>Lista svih klijenata</h1>
            {loading ? (
                <Loader/>
            ) : (<>
                <Button type='submit' variant='primary' onClick={noviKlijent}>
                    Novi klijent
                </Button>
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
                        {clients.filter((el)=>searchString==='' || el.nazivKlijenta.toUpperCase().includes(searchString.toUpperCase()))
                        .map(item => (
                            <tr key={item.id}>
                                <td>{item.nazivKlijenta}</td>
                                <td>{item.adresaKlijenta}</td>
                                <td>{item.kontaktMail}</td>
                                <td>{item.kontaktTelefon}</td>
                                <td>{item.pib}</td>
                                <td>{item.maticniBroj}</td>
                                <td>
                                    <Nav.Link onClick={()=>editHandler(item.id)}>Edit</Nav.Link>
                                    <Nav.Link onClick={()=>deleteHandler(item.id)}>Delete</Nav.Link>
                                </td>
                            </tr>  
                        ))}
                    </tbody>
                </Table>
                </>
            )}
            <Modal
                show={showDeleteModal}
                onHide={handleDeleteClose}
            >
                <Modal.Header>
                    <Modal.Title>Brisanje klijenta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Da li ste sigurni da zelite da obrisete klijenta?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success' onClick={handleDeleteClose}>Nazad</Button>
                    <Button variant='success' onClick={handleDeleteAccept}>DA</Button>
                </Modal.Footer>

            </Modal>
            
        </>
    )
}

export default ClientsScreen
