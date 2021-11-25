import React , {useState, useEffect} from 'react';
import {Table, Button, Nav, Modal, Form} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { getAllMeters, deleteSingleMeter, getSingleMeter } from '../../actions/meterActions';
import { getAllClients } from '../../actions/clientActions';
import Loader from '../../components/Loader';
import { nadjiNazivPoKategoriji, nadjiNazivVrsteSnabdevanja } from '../../constants/brojila';
import { GET_ALL_METERS_RESET } from '../../constants/meterConstants';

const MetersScreen = ({history}) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedId, setSelectedId] = useState(0)
    const [searchString, setsearchString] = useState('')
    const [searchStringEdBroj, setsearchStringEdBroj] = useState('')

    const dispatch = useDispatch()

    const allMeters = useSelector(state => state.allMeters)
    

    const {loading, error, meters} = allMeters
    


    useEffect(() => {
        dispatch(getAllMeters())
        dispatch(getAllClients())
        return () => {
            dispatch({type: GET_ALL_METERS_RESET})
        }
    }, [dispatch])

    const editHandler = (id) => {
        history.push({pathname: `/meters/edit/${id}`})
        dispatch(getSingleMeter(id))
    }

    const novoBrojilo = () => {
        history.push({pathname: `/meters/new`})
    }

    const deleteHandler = (id) => {
        setSelectedId(id)
        setShowDeleteModal(true)
    }

    const handleDeleteClose = () => {
        setShowDeleteModal(false)
    }

    const handleDeleteAccept = () => {
        dispatch(deleteSingleMeter(selectedId))
        setShowDeleteModal(false)
    }

    const handleTypeNazivKlijenta=(e)=>{
        setsearchString(e.target.value)   
      }

      const handleTypeEdBroj=(e)=>{
        setsearchStringEdBroj(e.target.value)   
      }

    return (
        <>
            <h1>Lista svih brojila</h1>
            {loading ? (
                <Loader/>
            ) : (<>
                <Button type='submit' variant='primary' onClick={novoBrojilo}>
                    Novo Brojilo
                </Button>
                <br/>
                <Table striped bordered hover variante='dark'>
                    <thead>
                        <tr>
                            <th>Naziv klijenta</th>
                            <th>Sifra mernog mesta</th>
                            <th>Adresa mernog mesta</th>
                            <th>Kategorija</th>
                            <th>Vrsta snabdevanja</th>
                            <th></th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        <tr>
                            <td>
                            <Form.Control type="text" placeholder="Pretrazi klijenta" onChange={debounce(handleTypeNazivKlijenta, 300)} />
                            </td>
                            <td>
                            <Form.Control type="text" placeholder="Pretrazi ED broj" onChange={debounce(handleTypeEdBroj, 300)} />
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        {meters.filter((el)=>(searchString==='' || el.nazivKlijenta.toUpperCase().includes(searchString.toUpperCase()))
                        && (searchStringEdBroj==='' || el.mestoMerenja.toUpperCase().includes(searchStringEdBroj.toUpperCase())))
                        .map(item => (
                            <tr key={item.id}>
                                <td>{item.nazivKlijenta}</td>
                                <td>{item.mestoMerenja}</td>
                                <td>{item.adresaMerenja}</td>
                                <td>{nadjiNazivPoKategoriji(item.kategorija)}</td>
                                <td>{nadjiNazivVrsteSnabdevanja(item.vrstaSnabdevanja)}</td>
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
                    <Modal.Title>Brisanje brojila</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Da li ste sigurni da zelite da obrisete brojilo?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success' onClick={handleDeleteClose}>Nazad</Button>
                    <Button variant='success' onClick={handleDeleteAccept}>DA</Button>
                </Modal.Footer>

            </Modal>
            
        </>
    )
}

export default MetersScreen
