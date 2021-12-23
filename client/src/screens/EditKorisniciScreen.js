import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUser, updateUser } from '../actions/userActions';
import { GET_SINGLE_USER_RESET } from '../constants/userConstants';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';

const EditKorisniciScreen = ({match, history}) => {

    const id = match.params.id

    const dispatch = useDispatch()

    const singleUser = useSelector(state => state.singleUser)
    const { loading, user } = singleUser

    const [podaci, setPodaci] = useState({
        ime: '',
        email: '',
        uloga: ''
    })

    useEffect(() => {
        if (!user) {
            dispatch(getSingleUser(id))
        } else {
            setPodaci({
                ime: user.name,
                email: user.email,
                uloga: user.uloga
            })
        }
        
    }, [dispatch, user])

    const updateHandler = (e) => {
        setPodaci({...podaci, [e.target.name] : e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser(podaci, id))
        history.push('/korisnici')
        dispatch({type: GET_SINGLE_USER_RESET})
    }

    return (
        <>
        {loading ? (
            <Loader/>
        ) : (<>
            <FormContainer>
        <Form onSubmit={submitHandler}>
            <Row>
                <Col xs={6}>
                <h5>Ime</h5>
                <Form.Control type='text' name='ime' placeholder='Ime' value={podaci.ime} onChange={updateHandler}></Form.Control>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col xs={6}>
                <h5>Email</h5>
                <Form.Control type='text' name='email' placeholder='Email' value={podaci.email} onChange={updateHandler}></Form.Control>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col xs={6}>
                <h5>Uloga</h5>
                <Form.Control as='select' name='uloga' value={podaci.uloga} onChange={updateHandler}>
                <option value='korisnik'>Korisnik</option>
                <option value='admin'>Admin</option>
                <option value='super_admin'>Super Admin</option>
                </Form.Control>
                </Col>
            </Row>
            <br/>
            <br/>
            <Row>
                <Col xs={4}>
                    <Button type='submit' variant='primary'>Sačuvaj</Button>
                </Col>
                <Col xs={4}>
                    <Button type='button' variant='primary' onClick={() => {
                         history.push('/korisnici')
                        dispatch({type: GET_SINGLE_USER_RESET})
                    }}>Nazad</Button>
                </Col>
            </Row>
            </Form>
        </FormContainer>
        </>)}
        </>
    )
}

export default EditKorisniciScreen
