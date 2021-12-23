import React, { useEffect } from 'react';
import { Table, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../actions/userActions';
import { GET_ALL_USERS_RESET } from '../constants/userConstants';
import Loader from '../components/Loader';
 
const KorisniciScreen = ({history}) => {

    const dispatch = useDispatch()

    const allUsers = useSelector(state => state.allUsers)
    const { loading, users } = allUsers

    useEffect(() => {
        dispatch(getAllUsers())
        return () => {
            dispatch({type: GET_ALL_USERS_RESET})
        }
    }, [dispatch])

    const editHandler = (id) => {
        history.push(`/korisnici/${id}`)
    }

    return (
        <>
        {
            loading ? (
                <Loader/>
            ) : (<>
                <br/>
                <Table  striped bordered hover variante='dark'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Ime</th>
                            <th>Email</th>
                            <th>Uloga</th>
                            <th>Izmeni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map((item) => {
                            return <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.uloga}</td>
                                <td>
                                    <Nav.Link onClick={() => editHandler(item.id)}>Detalji</Nav.Link>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            </>
            )
        }
        </>
    )
}

export default KorisniciScreen
