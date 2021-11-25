import React, { useEffect } from 'react'
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMrezarina } from '../actions/mrezarinaActions';
import { GET_ALL_MREZARINA_RESET } from '../constants/mrezarinaConstants';
import { kreirajDatum } from '../constants/datum';

const AllMrezarinaScreen = ({ history }) => {

    const dispatch = useDispatch()

    const allMrezarine = useSelector(state => state.allMrezarine)
    const { mrezarine } = allMrezarine

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

    return (
        <>
            <h3>Lista svih mrezarina</h3>
            <br/>
            <Button type='button' size='lg' variant='primary' onClick={idHandler} >
                Nova Mrezarina
            </Button>
            <br/>
            <Table striped bordered hover variante='dark'>
                <thead>
                    <tr>
                        <th>Mrezarina Broj</th>
                        <th>Vazi Od</th>
                        <th>Vazi Do</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {mrezarine && mrezarine.sort((a,b) => {
                        console.log(kreirajDatum(a.vaziOd))
                        console.log(kreirajDatum(b.vaziOd))
                        return kreirajDatum(b.vaziOd).getTime() - kreirajDatum(a.vaziOd).getTime()}).map(item => {
                        return <tr key={item.id} >
                            <td>Mrezarina broj{' '}{item.id}</td>
                            <td>{item.vaziOd}</td>
                            <td>{item.vaziDo}</td>
                            <td>
                            </td>
                        </tr>
                    })}
                </tbody>
            </Table>
        </>
    )
}

export default AllMrezarinaScreen
