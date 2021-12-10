import React , {useState, useEffect} from 'react'
import {Table, Button, Nav, Modal, Form} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { getAllContracts, deleteSingleContract } from '../../actions/contractActions';
import { getAllClients } from '../../actions/clientActions';
import Loader from '../../components/Loader'
import { GET_ALL_CONTRACTS_RESET } from '../../constants/contractConstants';
import './contracts.css';

const ContractsScreen = ({history}) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedId, setSelectedId] = useState(0)
    const [searchString, setSearchString] = useState('')
    const [searchBroj, setSearchBroj] = useState('')
    const [istekliUgovori, setIstekliUgovori] = useState(false)

    const dispatch = useDispatch()

    const allContracts = useSelector(state => state.allContracts)
    

    const {loading, contracts} = allContracts
    


    useEffect(() => {
        dispatch(getAllClients())
        dispatch(getAllContracts())
        return () => {
            dispatch({type: GET_ALL_CONTRACTS_RESET})
        }
    }, [dispatch])


    const editHandler = (id) => {
        history.push({pathname: `/contracts/edit/${id}`})
    }

    const noviUgovor = () => {
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

    const nazivKlijentaHandler = (e) => {
        setSearchString(e.target.value)
    }

    const brojUgovoraHandler = (e) => {
        setSearchBroj(e.target.value)
    }

    const istekliUgovoriHandler = (e) => {
        setIstekliUgovori(e.target.checked)
    }

    return (
        <>
            <h1>Lista svih ugovora</h1>
            <div className='flex-container'>
                <div className='flex-item-0'>
                <Button type='submit' size='lg' variant='primary' onClick={noviUgovor}>
                    Novi Ugovor
                </Button>
                </div>
                <div className='flex-container-1'>
                    <div className='flex-item-1'></div>
                    <p>Ugovori koji isticu za manje od 3 meseca</p>
                    <div className='flex-item-2'></div>
                    <p>Istekli ugovori</p>
                </div>
            </div>
            {loading ? (
                <Loader/>
            ) : (<>
                <br/>
                <br/>
                <Table striped bordered hover variante='dark'>
                    <thead>
                        <tr>
                            <th>Naziv klijenta</th>
                            <th>Broj ugovora</th>
                            <th>Datum sklapanja ugovora</th>
                            <th>Datum isteka ugovora</th>
                            <th>Cena VT</th>
                            <th>Cena NT</th>
                            <th>Cena JT</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Form.Control type="text" placeholder="Pretrazi" onChange={debounce(nazivKlijentaHandler, 300)} />
                            </td>
                            <td>
                                <Form.Control type='text' placeholder='Pretrazi' onChange={debounce(brojUgovoraHandler, 300)} />
                            </td>
                            <td></td>
                            <td>
                                <Form.Check type='checkbox' label='Istekli ugovori' checked={istekliUgovori} onChange={istekliUgovoriHandler}/>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        {contracts.filter((el) => {

                        const datum = el.datumIsteka.slice(0,10)
                        let partsPoc = datum.split('-')
                        let dateConverted = new Date(partsPoc[0], partsPoc[1]-1, partsPoc[2])


                         return   (searchString === '' || el.nazivKlijenta.toUpperCase().includes(searchString.toUpperCase())) 
                            && (searchBroj === '' || el.brojUgovora.toUpperCase().includes(searchBroj.toUpperCase())) && (istekliUgovori === true ? dateConverted < new Date() : true)

                        })
                        .map(item => {
                            let color;

                            const datum = item.datumIsteka.slice(0,10)
                            let partsPoc = datum.split('-')
                            let dateConverted = new Date(partsPoc[0], partsPoc[1]-1, partsPoc[2])
                            color = dateConverted - new Date() > 0 ? ((new Date(dateConverted - new Date()).getFullYear()-1970 == 0 && new Date(dateConverted - new Date()).getMonth() <3) ? 'rgba(255, 255, 0, 0.4)': '') : 'rgba(255, 0, 0, 0.4)'
                            
                            
                            return  <tr key={item.id} style={{backgroundColor: color}}>
                                <td>{item.nazivKlijenta}</td>
                                <td>{item.brojUgovora}</td>
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

                        }

                            
                        )}
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
                    Da li ste sigurni da zelite da obrišete ugovor?
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
