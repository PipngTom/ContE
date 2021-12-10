import React, { useEffect } from 'react'
import { Table, Button, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMrezarina } from '../actions/mrezarinaActions';
import { GET_ALL_MREZARINA_RESET } from '../constants/mrezarinaConstants';
import { kreirajDatum } from '../constants/datum';
import Loader from '../components/Loader';

const AllMrezarinaScreen = ({ history }) => {

    const dispatch = useDispatch()

    const allMrezarine = useSelector(state => state.allMrezarine)
    const { loading, mrezarine } = allMrezarine

    useEffect(() => {
        dispatch(getAllMrezarina())
        return () => {
            dispatch({type: GET_ALL_MREZARINA_RESET})
        }
    }, [dispatch])

    const idHandler = () => {

        const idZadnje = mrezarine.find(item=>item.vaziDo === null).id
        history.push(`/mrezarine/new/${idZadnje}`)
    }

    const mrezarinaHandler = (id) => {
        const zadnjaMrezarina = mrezarine
        .filter(item => item.vaziDo !== null)
        .reduce((prev, cur) => {

                return (kreirajDatum(prev.vaziDo).getTime() > kreirajDatum(cur.vaziDo).getTime()) ? prev : cur
            
        },{vaziDo: '01-10-1980'})
        const idPred = zadnjaMrezarina.id;
        history.push({pathname: `/mrezarina/${id}/${idPred}`})
    }


    return (
        <>
           {loading ? (
               <Loader/>
           ) : (<>
                 <h3>Lista svih mrežarina</h3>
                 <br/>
                 <Button type='button' size='lg' variant='primary' onClick={idHandler} >
                     Nova Mrežarina
                 </Button>
                 <br/>
                 <br/>
                 <Table striped bordered hover variante='dark'>
                     <thead>
                         <tr>
                             <th>Mrežarina Broj</th>
                             <th>Važi Od</th>
                             <th>Važi Do</th>
                             <th></th>
                         </tr>
                     </thead>
                     <tbody>
                         {mrezarine && mrezarine.sort((a,b) => {
                             return kreirajDatum(b.vaziOd).getTime() - kreirajDatum(a.vaziOd).getTime()}).map(item => {
                             return <tr key={item.id} >
                                 <td>Mrežarina broj{' '}{item.id}</td>
                                 <td>{item.vaziOd}</td>
                                 <td>{item.vaziDo}</td>
                                 <td>
                                     <Nav.Link onClick={() => mrezarinaHandler(item.id)} >
                                         Detalji
                                     </Nav.Link>
                                 </td>
                             </tr>
                         })}
                     </tbody>
                 </Table>
           </>)}
        </>
    )
}

export default AllMrezarinaScreen
