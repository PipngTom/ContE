import React , {useState, useEffect} from 'react';
import {Table, Button, Nav, Modal} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getMeteringByMeterId} from '../../actions/meteringActions';
import { getAllMeters, getSingleMeter} from '../../actions/meterActions';
import { deleteSingleMetering} from '../../actions/meteringActions';
import Loader from '../../components/Loader';
import { nadjiNazivMeseca } from '../../constants/datum';
import { nadjiTabeluPoKategoriji } from '../../constants/brojila';
import { METERING_SAVE_RESET } from '../../constants/meteringConstants';

const AllMeteringScreen = ({match, history}) => {

    const [selectedId, setSelectedId] = useState(0)
    const [selectedTabela, setSelectedTabela] = useState('')
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const meterId = match.params.id;

    const dispatch = useDispatch()

    const allMetering = useSelector(state => state.allMeteringByMeterId)
    const singleMeter = useSelector(state => state.singleMeter)
    

    const {loading, error, metering} = allMetering
    const {loading : meterLoading, error: meterError, meter} = singleMeter

   
    

    useEffect(() => {
        dispatch(getAllMeters())
        dispatch({type: METERING_SAVE_RESET})
        
        if(meter){
            const tabela = nadjiTabeluPoKategoriji(meter.kategorija)
            setSelectedTabela(tabela)
            dispatch(getMeteringByMeterId(meter.id, tabela))
        } else {
            dispatch(getSingleMeter(meterId))
        }
        
        
    }, [dispatch, meter])

    const editHandler = (id) => {
        history.push({pathname: `/unosi/edit/${id}`})
    }

    const deleteHandler = (id) => {
        setSelectedId(id)
        setShowDeleteModal(true)
    }

    const handleDeleteClose = () => {
        setShowDeleteModal(false)
    }

    const handleDeleteAccept = () => {
        dispatch(deleteSingleMetering(selectedId, selectedTabela))
        setShowDeleteModal(false)
    }

    const newHandler = () => {
        
        history.push({pathname: `/unosi/new`})
    }

    return (
        <div>
            <h2>ED broj: {meter && meter.mestoMerenja}</h2>
            <Nav.Link onClick={newHandler}>Novo merenje</Nav.Link>
             {loading ? (
                <Loader/>
            ) : (<>
                
                <Table striped bordered hover variante='dark'>
                    <thead>
                        <tr>
                            {metering[0] && Object.keys(metering[0]).filter((item)=>!(item=='id' || item=='idBrojilo')).map((item)=>(
                                <th>{item}</th>
                            ))}
                            <th></th>
                        </tr>
                        
                    </thead>
                    <tbody>
                       {metering.map(item => (
                            <tr key={item.id}>
                                {Object.keys(item).filter((elem)=>!(elem=='id'|| elem=='idBrojilo')).map((el)=>{
                                    console.log(el)
                                    if(el == 'mesec'){
                                        return <td>{nadjiNazivMeseca(item[el])}</td>
                                    }
                                   return <td>{item[el]}</td>
                                })}
                                
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
                    <Modal.Title>Brisanje merenja</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Da li ste sigurni da zelite da obrisete merenje?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success' onClick={handleDeleteClose}>Nazad</Button>
                    <Button variant='success' onClick={handleDeleteAccept}>DA</Button>
                </Modal.Footer>

            </Modal>
        </div>
    )
}

export default AllMeteringScreen
