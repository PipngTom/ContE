import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { snimiEuro, getKursEura } from '../../actions/kursEuraActions';
import { GET_KURS_EURA_RESET } from '../../constants/kursEuraConstants';


const KursEvraScreen = ({match, history}) => {

    const id = match.params.id

    const dispatch = useDispatch()

    const skEuro = useSelector(state => state.kursE)
    const { euro } = skEuro


    const [datum, setDatum] = useState('')
    const [srednji, setSrednji] = useState('')

    useEffect(() => {
        if (!euro || euro.id != id) {
            dispatch(getKursEura(id))
        } else {
            setDatum(euro.datum)
            setSrednji(euro.euro)
        }
    }, [dispatch, id, euro])


    const datumHandler = (e) => {
        setDatum(e.target.value)
    }

    const euroHandler = (e) => {
        setSrednji(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (id) {
            dispatch(snimiEuro(datum, srednji, id))
        } else {
            dispatch(snimiEuro(datum, srednji))
        }
       
        history.push('/kursevra')
        dispatch({type: GET_KURS_EURA_RESET})
    }

    return (
        <>
            <br/>
            <FormContainer>
            <h3>Srednji kurs Evra</h3>
            <br/>
                <Form onSubmit={submitHandler} >
                    <Row>
                        <Col xs={6}>
                            <h5>Izaberite datum</h5>
                            <br/>
                            <Form.Control type='date' value={datum} onChange={datumHandler}></Form.Control>
                        </Col>
                    </Row>
                    <br/>
                    <br/>
                    <Row>
                        <Col xs={6}>
                        <h5>Upišite Srednji kurs Evra za izabrani datum</h5>
                        <br/>
                            <Form.Control type='text' value={srednji} onChange={euroHandler}></Form.Control>
                        </Col>
                    </Row>
                    <br/>
                    <br/>
                    <Row>
                        <Col xs={6}>
                            <Button type='submit' size='lg' variant='primary'>Snimite</Button>
                        </Col>
                        <Col xs={6}>
                            <Button type='button' size='lg' variant='primary' onClick={() => {
                                history.push('/kursevra')
                                dispatch({type: GET_KURS_EURA_RESET})
                            }} >Nazad</Button>
                        </Col>
                    </Row>
                </Form>
            </FormContainer>
        </>
    )
}

export default KursEvraScreen
