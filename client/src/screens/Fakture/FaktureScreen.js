import React , {useState, useEffect} from 'react'
import {Table, Nav,  Form} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getAllMeters, deleteSingleMeter } from '../../actions/meterActions';
import { getMrezarina } from '../../actions/mrezarinaActions';
import Loader from '../../components/Loader';
import debounce from 'lodash.debounce';
import { nadjiNazivPoKategoriji, nadjiNazivVrsteSnabdevanja } from '../../constants/brojila';
import {GET_SINGLE_METER_RESET} from '../../constants/meterConstants';

const FaktureScreen = ({history}) => {

    const [searchString, setsearchString] = useState('')
    const [searchStringEdBroj, setsearchStringEdBroj] = useState('')

    const dispatch = useDispatch()

    const allMeters = useSelector(state => state.allMeters)
    

    const {loading, error, meters} = allMeters
    


    useEffect(() => {
        dispatch(getAllMeters())
        dispatch(getMrezarina())
        
        return () => {
            dispatch({
            type: GET_SINGLE_METER_RESET
          })
        } 
    }, [dispatch])

    const createFakture = (id) => {
        history.push({pathname: `/fakture/new/${id}`})
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
                                    <Nav.Link onClick={()=>createFakture(item.id)}>Kreiraj fakturu</Nav.Link>
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

export default FaktureScreen
