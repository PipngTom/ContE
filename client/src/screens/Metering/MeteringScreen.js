import React , {useState, useEffect} from 'react'
import {Table, Button, Nav, Modal, Form} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { getAllMeters, deleteSingleMeter, getSingleMeter } from '../../actions/meterActions';
import Loader from '../../components/Loader'
import {kategorija, vrsteSnabdevanja} from '../../constants/brojila'

const MeteringScreen = ({history}) => {

    const [searchString, setsearchString] = useState('')
    const [searchStringEdBroj, setsearchStringEdBroj] = useState('')
    const [selectedId, setSelectedId] = useState(0)

    const dispatch = useDispatch()

    const allMeters = useSelector(state => state.allMeters)
    

    const {loading, error, meters} = allMeters
    


    useEffect(() => {
        dispatch(getAllMeters())
    }, [dispatch])

    
    const allMeteringHandler = (id) => {
        dispatch(getSingleMeter(id))
        //dispatch getMeteringByMeterId action
        history.push({pathname: `/allmetering/${id}`})
    }

    const handleTypeNazivKlijenta=(e)=>{
        console.log(e.target.value);
        setsearchString(e.target.value)   
      }

      const handleTypeEdBroj=(e)=>{
        console.log(e.target.value);
        setsearchStringEdBroj(e.target.value)   
      }
 
    return (
        <>
            <h1>Lista svih brojila</h1>
            {loading ? (
                <Loader/>
            ) : (<>
                
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
                                <td>{kategorija.find((el)=>el.sifra==item.kategorija).naziv}</td>
                                <td>{vrsteSnabdevanja.find((el)=>el.sifra==item.vrstaSnabdevanja).naziv}</td>
                                <td>
                                    <Nav.Link onClick={()=>allMeteringHandler(item.id)}>Lista merenja</Nav.Link>
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

export default MeteringScreen
