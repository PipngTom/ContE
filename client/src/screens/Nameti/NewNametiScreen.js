import React, { useState } from 'react'
import { Row, Col, Form, Button, Modal} from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { nametiSchema } from '../../validations/nametiValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { snimiNamete } from '../../actions/nametiActions';

const NewNametiScreen = ({ history, match }) => {

    const idZadnje = match.params.id

    const dispatch = useDispatch()

    const noviNameti = useSelector(state => state.newNameti)
    const { error } = noviNameti

    const [nameti, setNameti] = useState({
        vaziOd: '',
        pdv: '',
        akciza: '',
        naknada_tv: '',
        naknada_ee: '',
        naknada_oie: ''
    })

    const [showModal, setShowModal] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(nametiSchema)
    })

    const handleInput = (e) => {
        setNameti({...nameti, [e.target.name]: e.target.value})
    }

    const handleCloseModal = () => {
        if (!error) {
            history.push('/nameti')
        }
        setShowModal(false)
    }

    const submitNameti = (data, e) => {
        e.preventDefault()
        dispatch(snimiNamete(nameti, idZadnje))
        //history.push('/nameti')
        setShowModal(true)
    }

    return (
        <>
            <FormContainer>
            <Form onSubmit={handleSubmit(submitNameti)} >
            <Modal show={showModal} onHide={handleCloseModal} >
                <Modal.Header>
                    <Modal.Title>Obaveštenje</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error ? error : 'Uspesno ste kreirali nove namete...'}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success' onClick={handleCloseModal}>U redu</Button>
                </Modal.Footer>

            </Modal>
            <Row>
            <Col xs={6}>
            <Form.Group>
                <Form.Label>Važi Od</Form.Label>
                    <Form.Control type='date' name='vaziOd' placeholder='Vazi Od' value={nameti.vaziOd} onChange={handleInput} ></Form.Control>
            </Form.Group>
            </Col>
            </Row>
            <br/>
            <Row>
                <Col xs={6}>
                    <Form.Group controlId='pdv'>
                        <Form.Label>PDV</Form.Label>
                        <Form.Control isInvalid={errors.pdv?.message ? true : false} type='text' name='pdv' placeholder='PDV' value={nameti.pdv} {...register('pdv')} onChange={handleInput} ></Form.Control>
                        <Form.Control.Feedback type='invalid'>{errors.pdv?.message}</Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col xs={6}>
                    <Form.Group controlId='akciza'>
                        <Form.Label>Akciza</Form.Label>
                        <Form.Control isInvalid={errors.akciza?.message ? true : false} type='text' name='akciza' placeholder='Akciza' value={nameti.akciza} {...register('akciza')} onChange={handleInput} ></Form.Control>
                        <Form.Control.Feedback type='invalid'>{errors.akciza?.message}</Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <br/>
            <Row >
                <Col xs={6}>
                    <Form.Group controlId='naknada_tv'>
                        <Form.Label>TV Naknada</Form.Label>
                        <Form.Control isInvalid={errors.naknada_tv?.message ? true : false} type='text' name='naknada_tv' placeholder='TV Naknada' value={nameti.naknada_tv} {...register('naknada_tv')} onChange={handleInput} ></Form.Control>
                        <Form.Control.Feedback type='invalid'>{errors.naknada_tv?.message}</Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col xs={6}>
                    <Form.Group controlId='naknada_ee'>
                        <Form.Label>Naknada za energetsku efikasnost</Form.Label>
                        <Form.Control isInvalid={errors.naknada_ee?.message ? true : false} type='text' name='naknada_ee' placeholder='Naknada za EE' value={nameti.naknada_ee} {...register('naknada_ee')} onChange={handleInput} ></Form.Control>
                        <Form.Control.Feedback type='invalid'>{errors.naknada_ee?.message}</Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col xs={6}>
                    <Form.Group controlId='naknada_oie'>
                        <Form.Label>Naknada za povl. proizvođače</Form.Label>
                        <Form.Control isInvalid={errors.naknada_oie?.message ? true : false} type='text' name='naknada_oie' placeholder='Naknada za povl. proizvođače' value={nameti.naknada_oie} {...register('naknada_oie')} onChange={handleInput} ></Form.Control>
                        <Form.Control.Feedback type='invalid'>{errors.naknada_oie?.message}</Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <br/>
            <br/>
            <Row>
                <Col xs={6}>
                    <Button type='submit' variant='primary' >Sačuvaj</Button>
                </Col>
                <Col xs={6}>
                    <Button type='button' variant='primary' onClick={() => history.push('/nameti')} >Nazad</Button>
                </Col>
            </Row>
            </Form>
            </FormContainer>
        </>
    )
}

export default NewNametiScreen
