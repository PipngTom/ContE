import React , {useState, useEffect} from 'react'
import {Table, Button, Nav, Modal} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getAllContracts, deleteSingleContract } from '../../actions/contractActions';
import Loader from '../../components/Loader'
import {kategorija, vrsteSnabdevanja} from '../../constants/brojila'

const ContractsScreen = ({history}) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedId, setSelectedId] = useState(0)

    const dispatch = useDispatch()

    const allContracts = useSelector(state => state.allContracts)
    

    const {loading, error, contracts} = allContracts
    


    useEffect(() => {
        dispatch(getAllContracts())
    }, [dispatch])

    const editHandler = (id) => {
        console.log(id)
        history.push({pathname: `/contracts/edit/${id}`})
    }

    const noviUgovor = () => {
        console.log('jhdjdj')
        history.push({pathname: `/contracts/new`})
    }

    const deleteHandler = (id) => {
        setSelectedId(id)
        setShowDeleteModal(true)
    }

    const handleDeleteClose = () => {
        setShowDeleteModal(false)
    }

    const handleDeleteAccept = () => {
        dispatch(deleteSingleContract(selectedId))
        setShowDeleteModal(false)
    }

    return (
        <>
            <h1>Lista svih ugovora</h1>
            {loading ? (
                <Loader/>
            ) : (<>
                <Button type='submit' variant='primary' onClick={noviUgovor}>
                    Novi Ugovor
                </Button>
                <br/>
                <Table striped bordered hover variante='dark'>
                    <thead>
                        <tr>
                            <th>Naziv klijenta</th>
                            <th>Datum sklapanja ugovora</th>
                            <th>Datum isteka ugovora</th>
                            <th>Cena VT</th>
                            <th>Cena NT</th>
                            <th>Cena JT</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {contracts.map(item => (
                            <tr key={item.id}>
                                <td>{item.nazivKlijenta}</td>
                                <td>{item.datumSklapanja.slice(0,10)}</td>
                                <td>{item.datumIsteka.slice(0,10)}</td>
                                <td>{item.cenaVT}</td>
                                <td>{item.cenaNT}</td>
                                <td>{item.cenaJT}</td>
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
                    <Modal.Title>Brisanje ugovora</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Da li ste sigurni da zelite da obrisete ugovor?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success' onClick={handleDeleteClose}>Nazad</Button>
                    <Button variant='success' onClick={handleDeleteAccept}>DA</Button>
                </Modal.Footer>

            </Modal>
            
        </>
    )
}

export default ContractsScreen
