import React , {useState, useEffect} from 'react'
import {Table, Button, Nav, Modal} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getAllMeters, deleteSingleMeter } from '../../actions/meterActions';
import { getMrezarina } from '../../actions/mrezarinaActions';
import Loader from '../../components/Loader'
import {kategorija, vrsteSnabdevanja} from '../../constants/brojila'
import {GET_SINGLE_METER_RESET} from '../../constants/meterConstants'

const FaktureScreen = ({history}) => {

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
        console.log(id)
        history.push({pathname: `/fakture/new/${id}`})
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
                        {meters.map(item => (
                            <tr key={item.id}>
                                <td>{item.nazivKlijenta}</td>
                                <td>{item.mestoMerenja}</td>
                                <td>{item.adresaMerenja}</td>
                                <td>{kategorija.find((el)=>el.sifra==item.kategorija).naziv}</td>
                                <td>{vrsteSnabdevanja.find((el)=>el.sifra==item.vrstaSnabdevanja).naziv}</td>
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
