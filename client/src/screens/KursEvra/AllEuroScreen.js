import React, { useEffect } from 'react';
import { Row, Col, Table, Nav, Button } from 'react-bootstrap';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEuro } from '../../actions/kursEuraActions';
import { GET_ALL_KURS_EURA_RESET } from '../../constants/kursEuraConstants';

const AllEuroScreen = ({history}) => {

    const dispatch = useDispatch()

    const all = useSelector(state => state.allEuro)
    const { loading, euros } = all

    useEffect(() => {
        dispatch(getAllEuro())
        return () => {
            dispatch({ type: GET_ALL_KURS_EURA_RESET })
        }
    }, [dispatch])

    const updateHandler = (id) => {
        history.push(`/kursevra/edit/${id}`)
    }

    return (
        <>
           {loading ? (
               <Loader/>
           ) : (<>
                <h3>Lista srednjih kurseva za određeni datum</h3>
                <br/>
                <br/>
                <Button type='button' variant='primary' onClick={() => history.push('/kursevra/new')}>Novi Srednji Kurs</Button>
            <Table striped bordered hover variante='dark'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Datum</th>
                        <th>Srednji kurs</th>
                        <th>Detalji</th>
                    </tr>
                </thead>
                <tbody>
                    {euros && euros.map((item => {
                        return <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.datum}</td>
                            <td>{item.euro}</td>
                            <td>
                                <Nav.Link onClick={() => updateHandler(item.id)} >Detalji</Nav.Link>
                            </td>
                        </tr>
                    }))}
                </tbody>
            </Table>
           </>)} 
        </>
    )
}

export default AllEuroScreen
