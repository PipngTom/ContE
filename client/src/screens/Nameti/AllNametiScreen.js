import React, { useEffect } from 'react';
import { Button, Table, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNameti } from '../../actions/nametiActions';
import Loader from '../../components/Loader';
import { kreirajDatum } from '../../constants/datum';
import { GET_ALL_NAMETI_RESET } from '../../constants/nametiConstants';

const AllNametiScreen = ({ history }) => {

    const dispatch = useDispatch()

    const nametiAll = useSelector(state => state.allNameti)
    const { loading, nameti } = nametiAll

    useEffect(() => {
        dispatch(getAllNameti())
        return () => {
            dispatch({type: GET_ALL_NAMETI_RESET})
        }
    }, [dispatch])

    const idHandler = () => {
        const idZadnje = nameti.find(item => item.vaziDo === null).id
        history.push(`/namet/new/${idZadnje}`)
    }

    const nametiHandler = (id) => {
        const zadnjiNameti = nameti
        .filter(item => item.vaziDo !== null)
        .reduce((prev, cur) => {

                return (kreirajDatum(prev.vaziDo).getTime() > kreirajDatum(cur.vaziDo).getTime()) ? prev : cur
            
        },{vaziDo: '01-10-1980'})
        const idPred = zadnjiNameti.id;
        history.push(`/nameti/${id}/${idPred}`)
    }

    return (
        <>
        {loading ? (
            <Loader/>
        ) : (<>
            <h3>Lista svih nameta</h3>
        <br/>
        <Button type='button' variant='primary' size='lg' onClick={idHandler} >Novi Nameti</Button>
        <br/>
        <br/>
            <Table  striped bordered hover variante='dark'>
                <thead>
                <tr>
                    <th>Naknada broj</th>
                    <th>Važi Od</th>
                    <th>Važi Do</th>
                </tr>
                </thead>
                <tbody>
                    {nameti && nameti.sort((a,b) => {
                        return kreirajDatum(b.vaziOd).getTime() - kreirajDatum(a.vaziOd).getTime()
                    }).map(item => {
                        return <tr key={item.id}>
                            <td>Naknada broj{' '}{item.id}</td>
                            <td>{item.vaziOd}</td>
                            <td>{item.vaziDo}</td>
                            <td>
                                <Nav.Link onClick={() => nametiHandler(item.id)}>
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

export default AllNametiScreen
