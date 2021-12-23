import React , {useState, useEffect} from 'react'
import {Table, Button, Nav, Modal, Form} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { getAllContracts, deleteSingleContract } from '../../actions/contractActions';
import { getAllClients } from '../../actions/clientActions';
import Loader from '../../components/Loader'
import { GET_ALL_CONTRACTS_RESET } from '../../constants/contractConstants';
import './contracts.css';

//Component for rendering all contracts 
const ContractsScreen = ({history}) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedId, setSelectedId] = useState(0)
    const [searchString, setSearchString] = useState('')
    const [searchBroj, setSearchBroj] = useState('')
    const [istekliUgovori, setIstekliUgovori] = useState(false)

    const dispatch = useDispatch()

    //Selecting a state from reducer for displaying values from reducer in template
    const allContracts = useSelector(state => state.allContracts)
    

    const {loading, contracts} = allContracts
    


    useEffect(() => {
        //Loading reducer with all clients and all contracts on first rendering of component
        dispatch(getAllClients())
        dispatch(getAllContracts())
        return () => {
            //Clearing all contracts from state on exiting from component
            dispatch({type: GET_ALL_CONTRACTS_RESET})
        }
    }, [dispatch])


    //Navigating to edit contract component with specify id
    const editHandler = (id) => {
        history.push({pathname: `/contracts/edit/${id}`})
    }

    //Navigating to new contract component
    const noviUgovor = () => {
        history.push({pathname: `/contracts/new`})
    }

    //Delete handler with specify id and close modal handler
    const deleteHandler = (id) => {
        setSelectedId(id)
        setShowDeleteModal(true)
    }

    //Close modal handler with local state hook
    const handleDeleteClose = () => {
        setShowDeleteModal(false)
    }

    //Completed delete single contract with unique id 
    const handleDeleteAccept = () => {
        dispatch(deleteSingleContract(selectedId))
        setShowDeleteModal(false)
    }

    //handler for filtering of a client name
    const nazivKlijentaHandler = (e) => {
        setSearchString(e.target.value)
    }

    //handler for filtering of a contract number
    const brojUgovoraHandler = (e) => {
        setSearchBroj(e.target.value)
    }

    //handler for filtering of expired contracts
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
                        {/* Filtering contracts for name of client, number of contract and expired contracts */}
                        {contracts.filter((el) => {

                        {/* Converted date from backend for comparing date values in order to get expired contracts */}
                        const datum = el.datumIsteka.slice(0,10)
                        let partsPoc = datum.split('-')
                        let dateConverted = new Date(partsPoc[0], partsPoc[1]-1, partsPoc[2])

                            {/* Ternary operator for showing expired contracts questioning local state boolean and if it is true it shows contracts which date is lower than current date */}
                         return   (searchString === '' || el.nazivKlijenta.toUpperCase().includes(searchString.toUpperCase())) 
                            && (searchBroj === '' || el.brojUgovora.toUpperCase().includes(searchBroj.toUpperCase())) && (istekliUgovori === true ? dateConverted < new Date() : true)

                        })
                        .map(item => {
                            {/* Iterating through contracts to show items of contracts from redux */}
                            let color;

                            {/* Converted date from backend for comparing date values in order to get specify color in a case when contract expires */}
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
