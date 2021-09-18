import React , {useState, useEffect} from 'react'
import {Table, Button, Nav, Modal} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getAllMeters, deleteSingleMeter } from '../../actions/meterActions';
import Loader from '../../components/Loader'
import {kategorija, vrsteSnabdevanja} from '../../constants/brojila'

const MetersScreen = ({history}) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedId, setSelectedId] = useState(0)

    const dispatch = useDispatch()

    const allMeters = useSelector(state => state.allMeters)
    

    const {loading, error, meters} = allMeters
    


    useEffect(() => {
        dispatch(getAllMeters())
    }, [dispatch])

    const editHandler = (id) => {
        console.log(id)
        history.push({pathname: `/meters/edit/${id}`})
    }

    const novoBrojilo = () => {
        console.log('jhdjdj')
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
                        {meters.map(item => (
                            <tr key={item.id}>
                                <td>{item.nazivKlijenta}</td>
                                <td>{item.mestoMerenja}</td>
                                <td>{item.adresaMerenja}</td>
                                <td>{kategorija.find((el)=>el.sifra==item.kategorija).naziv}</td>
                                <td>{vrsteSnabdevanja.find((el)=>el.sifra==item.vrstaSnabdevanja).naziv}</td>
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
