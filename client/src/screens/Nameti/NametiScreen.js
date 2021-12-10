import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getNamete, updateNameti } from '../../actions/nametiActions';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { nametiSchema } from '../../validations/nametiValidation';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { GET_NAMETI_RESET } from '../../constants/nametiConstants';

const NametiScreen = ({ match, history }) => {

    const id = match.params.id

    const idPret = match.params.idpret

    const dispatch = useDispatch()

    const jNamet = useSelector(state => state.jNamet)
    const { loading, namet } = jNamet

    const [podaci, setPodaci] = useState({})

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(nametiSchema)
    })

    useEffect(() => {
        if (!namet) {
            dispatch(getNamete(id))
        } else {
            setPodaci({...podaci,
                id: namet.id,
                vaziOd: namet.vaziOd,
                vaziDo: namet.vaziDo,
                pdv: namet.pdv,
                akciza: namet.akciza,
                naknada_tv: namet.naknadaTv,
                naknada_ee: namet.naknadaEe,
                naknada_oie: namet.naknadaOie

            })
            setValue('pdv', namet.pdv)
            setValue('akciza', namet.akciza)
            setValue('naknada_tv', namet.naknadaTv)
            setValue('naknada_ee', namet.naknadaEe)
            setValue('naknada_oie', namet.naknadaOie)
        }
    }, [dispatch, namet])

    const handleInput = (e) => {
        setPodaci({...podaci, [e.target.name]: e.target.value})
    }

    const submitNameti = (data, e) => {
        e.preventDefault()
        dispatch(updateNameti(podaci, idPret))
        history.push('/nameti')
        dispatch({type: GET_NAMETI_RESET})
    }

    return (
        <>
        {loading ? ( <Loader/> ) : (<>
            <FormContainer>
            <Form onSubmit={handleSubmit(submitNameti)} >
            <Row>
            <Col xs={6}>
            <Form.Group>
                <Form.Label>Važi Od</Form.Label>
                    <Form.Control type='date' name='vaziOd' placeholder='Vazi Od' value={podaci.vaziOd} onChange={handleInput} ></Form.Control>
            </Form.Group>
            </Col>
            </Row>
            <br/>
            {namet && namet.vaziDo !== null && <Row>
            <Col xs={6}>
            <Form.Group>
                <Form.Label>Važi Do</Form.Label>
                    <Form.Control type='date' name='vaziDo' placeholder='Vazi Od' value={podaci.vaziDo} onChange={handleInput} ></Form.Control>
            </Form.Group>
            </Col>
            </Row>}
            <br/>
            <Row>
                <Col xs={6}>
                    <Form.Group controlId='pdv'>
                        <Form.Label>PDV</Form.Label>
                        <Form.Control isInvalid={errors.pdv?.message ? true : false} type='text' name='pdv' placeholder='PDV' value={podaci.pdv} {...register('pdv')} onChange={handleInput} ></Form.Control>
                        <Form.Control.Feedback type='invalid'>{errors.pdv?.message}</Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col xs={6}>
                    <Form.Group controlId='akciza'>
                        <Form.Label>Akciza</Form.Label>
                        <Form.Control isInvalid={errors.akciza?.message ? true : false} type='text' name='akciza' placeholder='Akciza' value={podaci.akciza} {...register('akciza')} onChange={handleInput} ></Form.Control>
                        <Form.Control.Feedback type='invalid'>{errors.akciza?.message}</Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <br/>
            <Row >
                <Col xs={6}>
                    <Form.Group controlId='naknada_tv'>
                        <Form.Label>TV Naknada</Form.Label>
                        <Form.Control isInvalid={errors.naknada_tv?.message ? true : false} type='text' name='naknada_tv' placeholder='TV Naknada' value={podaci.naknada_tv} {...register('naknada_tv')} onChange={handleInput} ></Form.Control>
                        <Form.Control.Feedback type='invalid'>{errors.naknada_tv?.message}</Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col xs={6}>
                    <Form.Group controlId='naknada_ee'>
                        <Form.Label>Naknada za energetsku efikasnost</Form.Label>
                        <Form.Control isInvalid={errors.naknada_ee?.message ? true : false} type='text' name='naknada_ee' placeholder='Naknada za EE' value={podaci.naknada_ee} {...register('naknada_ee')} onChange={handleInput} ></Form.Control>
                        <Form.Control.Feedback type='invalid'>{errors.naknada_ee?.message}</Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col xs={6}>
                    <Form.Group controlId='naknada_oie'>
                        <Form.Label>Naknada za povl. proizvođače</Form.Label>
                        <Form.Control isInvalid={errors.naknada_oie?.message ? true : false} type='text' name='naknada_oie' placeholder='Naknada za povl. proizvođače' value={podaci.naknada_oie} {...register('naknada_oie')} onChange={handleInput} ></Form.Control>
                        <Form.Control.Feedback type='invalid'>{errors.naknada_oie?.message}</Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <br/>
            <br/>
            <Row>
                {namet && namet.vaziDo == null && <Col xs={6}>
                    <Button type='submit' variant='primary' >Sačuvaj</Button>
                </Col>}
                <Col xs={6}>
                    <Button type='button' variant='primary' onClick={() => {
                        history.push('/nameti')
                        dispatch({type: GET_NAMETI_RESET})
                    }} >Nazad</Button>
                </Col>
            </Row>
            </Form>
            </FormContainer>
        </>)}
        </>
    )
}

export default NametiScreen
