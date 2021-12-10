import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Card, Row, Col, Button, Modal } from 'react-bootstrap';
import { mrezarinaSchema } from '../validations/mrezarinaValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { saveNewMrezarina } from '../actions/mrezarinaActions';

const NewMrezarinaScreen = ({ history, match }) => {

    const dispatch = useDispatch()

    const nMrezarina = useSelector(state => state.novaMrezarina)
    const {  error } = nMrezarina

    const idZadnje = match.params.id

    const [ showModal, setShowModal ] = useState(false)

    const [mrezarina, setMrezarina] = useState({
        datum: '',
        srednji_napon_vt: '',
        srednji_napon_reak: '',
        srednji_napon_odosnaga: '',
        srednji_napon_nt: '',
        srednji_napon_prereak: '',
        srednji_napon_prekosnaga: '',
        niski_napon_vt: '',
        niski_napon_reak: '',
        niski_napon_odosnaga: '',
        niski_napon_nt: '',
        niski_napon_prereak: '',
        niski_napon_prekosnaga: '',
        sp_dvotarifno_vt: '',
        sp_dvotarifno_nt: '',
        sp_dvotarifno_odosnaga: '',
        sp_domacinstvo_vt: '',
        sp_domacinstvo_nt: '',
        sp_domacinstvo_odosnaga: '',
        sp_jednotarifno_jt: '',
        sp_jednotarifno_odosnaga: '',
        jr_jt: ''
    })



    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(mrezarinaSchema)
    })


    const handleInput = (e) => {
        setMrezarina({...mrezarina, [e.target.name]: e.target.value})
    }

    const handleCloseModal = () => {
        if (!error) {
            history.push('/mrezarina')
        }
        setShowModal(false)
    }

    const submitMrezarina = (data, e) => {
        e.preventDefault()
        dispatch(saveNewMrezarina(mrezarina, idZadnje))
        setShowModal(true)
    }

    return (
      <>
      {/* <h1>New mrezarina</h1> */}
            <Form onSubmit={handleSubmit(submitMrezarina)}>
            <Modal show={showModal} onHide={handleCloseModal} >
                <Modal.Header>
                    <Modal.Title>Obaveštenje</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error ? error : 'Uspesno ste kreirali novu mrezarinu...'}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success' onClick={handleCloseModal}>U redu</Button>
                </Modal.Footer>

            </Modal>
            <Row>
            <Col xs={5}>
            <Form.Group>
                <h3>Važi Od</h3>
                    <Form.Control type='date' name='datum' placeholder='Vazi Od' value={mrezarina.datum} onChange={handleInput} ></Form.Control>
            </Form.Group>
            </Col>
            </Row>
            <Card style={{ width: '100%', marginTop: '10px'}} border='success'>
                <Card.Body>
                    <Card.Title>Srednji Napon</Card.Title>
                    <Row>
                        <Col>
                            <Form.Group controlId='srednji_napon_vt'>
                                <Form.Label>Viša tarifa</Form.Label>
                                <Form.Control isInvalid={errors.srednji_napon_vt?.message ? true : false} type='name' name='srednji_napon_vt' placeholder='Visa tarifa' value={mrezarina.srednji_napon_vt} {...register('srednji_napon_vt')}
                                onChange={handleInput}></Form.Control>
                                <Form.Control.Feedback type='invalid'>{errors.srednji_napon_vt?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='srednji_napon_reak'>
                                <Form.Label>Reaktivna energija</Form.Label>
                                <Form.Control isInvalid={errors.srednji_napon_reak?.message ? true : false} type='name' name='srednji_napon_reak' placeholder='Reaktivna energije' value={mrezarina.srednji_napon_reak} {...register('srednji_napon_reak')}
                                onChange={handleInput}></Form.Control>
                                <Form.Control.Feedback type='invalid'>{errors.srednji_napon_reak?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='srednji_napon_odosnaga'>
                                <Form.Label>Odobrena snaga</Form.Label>
                                <Form.Control isInvalid={errors.srednji_napon_odosnaga?.message ? true : false} type='name' name='srednji_napon_odosnaga' placeholder='Odobrena snaga' value={mrezarina.srednji_napon_odosnaga} {...register('srednji_napon_odosnaga')}
                                onChange={handleInput}></Form.Control>
                                <Form.Control.Feedback type='invalid'>{errors.srednji_napon_odosnaga?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId='srednji_napon_nt'>
                                <Form.Label>Niža tarifa</Form.Label>
                                <Form.Control isInvalid={errors.srednji_napon_nt?.message ? true : false} type='name' name='srednji_napon_nt' placeholder='Niza tarifa' value={mrezarina.srednji_napon_nt} {...register('srednji_napon_nt')}
                                onChange={handleInput}></Form.Control>
                                <Form.Control.Feedback type='invalid'>{errors.srednji_napon_nt?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='srednji_napon_prereak'>
                                <Form.Label>Prekomerna reaktivna energija</Form.Label>
                                <Form.Control isInvalid={errors.srednji_napon_prereak?.message ? true : false} type='name' name='srednji_napon_prereak' placeholder='Reaktivna energije' value={mrezarina.srednji_napon_prereak} {...register('srednji_napon_prereak')}
                                onChange={handleInput}></Form.Control>
                                <Form.Control.Feedback type='invalid'>{errors.srednji_napon_prereak?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='srednji_napon_prekosnaga'>
                                <Form.Label>Odobrena snaga</Form.Label>
                                <Form.Control isInvalid={errors.srednji_napon_prekosnaga?.message ? true : false} type='name' name='srednji_napon_prekosnaga' placeholder='Prekomerna snaga' value={mrezarina.srednji_napon_prekosnaga} {...register('srednji_napon_prekosnaga')}
                                onChange={handleInput}></Form.Control>
                                <Form.Control.Feedback type='invalid'>{errors.srednji_napon_prekosnaga?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

            </Card.Body>
            </Card>
            <Card style={{ width: '100%', marginTop: '10px'}} border='success'>
                <Card.Body>
                    <Card.Title>Niski Napon</Card.Title>
                    <Row>
                        <Col>
                            <Form.Group controlId='niski_napon_vt'>
                                <Form.Label>Viša tarifa</Form.Label>
                                <Form.Control isInvalid={errors.niski_napon_vt?.message ? true : false} type='name' name='niski_napon_vt' placeholder='Visa tarifa' value={mrezarina.niski_napon_vt} {...register('niski_napon_vt')}
                                onChange={handleInput}></Form.Control>
                                <Form.Control.Feedback type='invalid'>{errors.niski_napon_vt?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='niski_napon_reak'>
                                <Form.Label>Reaktivna energija</Form.Label>
                                <Form.Control isInvalid={errors.niski_napon_reak?.message ? true : false} type='name' name='niski_napon_reak' placeholder='Reaktivna energije' value={mrezarina.niski_napon_reak} {...register('niski_napon_reak')}
                                onChange={handleInput}></Form.Control>
                                <Form.Control.Feedback type='invalid'>{errors.niski_napon_reak?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='niski_napon_odosnaga'>
                                <Form.Label>Odobrena snaga</Form.Label>
                                <Form.Control isInvalid={errors.niski_napon_odosnaga?.message ? true : false} type='name' name='niski_napon_odosnaga' placeholder='Odobrena snaga' value={mrezarina.niski_napon_odosnaga} {...register('niski_napon_odosnaga')}
                                onChange={handleInput}></Form.Control>
                                <Form.Control.Feedback type='invalid'>{errors.niski_napon_odosnaga?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId='niski_napon_nt'>
                                <Form.Label>Niža tarifa</Form.Label>
                                <Form.Control isInvalid={errors.niski_napon_nt?.message ? true : false} type='name' name='niski_napon_nt' placeholder='Niza tarifa' value={mrezarina.niski_napon_nt} {...register('niski_napon_nt')}
                                onChange={handleInput}></Form.Control>
                                <Form.Control.Feedback type='invalid'>{errors.niski_napon_nt?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='niski_napon_prereak'>
                                <Form.Label>Prekomerna reaktivna energija</Form.Label>
                                <Form.Control isInvalid={errors.niski_napon_prereak?.message ? true : false} type='name' name='niski_napon_prereak' placeholder='Prekomerna reaktivna energije' value={mrezarina.niski_napon_prereak} {...register('niski_napon_prereak')}
                                onChange={handleInput}></Form.Control>
                                <Form.Control.Feedback type='invalid'>{errors.niski_napon_prereak?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='niski_napon_prekosnaga'>
                                <Form.Label>Odobrena snaga</Form.Label>
                                <Form.Control isInvalid={errors.niski_napon_prekosnaga?.message ? true : false} type='name' name='niski_napon_prekosnaga' placeholder='Prekomerna snaga' value={mrezarina.niski_napon_prekosnaga} {...register('niski_napon_prekosnaga')}
                                onChange={handleInput}></Form.Control>
                                <Form.Control.Feedback type='invalid'>{errors.niski_napon_prekosnaga?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

            </Card.Body>
            </Card>

            <Card style={{ width: '100%', marginTop: '10px'}} border='success'>
                <Card.Body>
                    <Card.Title>Dvotarifno merenje</Card.Title>
                    <Row>
                        <Col>
                            <Form.Group controlId='sp_dvotarifno_vt'>
                                <Form.Label>Viša tarifa</Form.Label>
                                <Form.Control isInvalid={errors.sp_dvotarifno_vt?.message ? true : false} type='name' name='sp_dvotarifno_vt' placeholder='Visa tarifa' value={mrezarina.sp_dvotarifno_vt} {...register('sp_dvotarifno_vt')}
                                onChange={handleInput}></Form.Control>
                                <Form.Control.Feedback type='invalid'>{errors.sp_dvotarifno_vt?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='sp_dvotarifno_nt'>
                                <Form.Label>Niža tarifa</Form.Label>
                                <Form.Control isInvalid={errors.sp_dvotarifno_nt?.message ? true : false} type='name' name='sp_dvotarifno_nt' placeholder='Niza tarifa' value={mrezarina.sp_dvotarifno_nt} {...register('sp_dvotarifno_nt')}
                                onChange={handleInput}></Form.Control>
                                <Form.Control.Feedback type='invalid'>{errors.sp_dvotarifno_nt?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='sp_dvotarifno_odosnaga'>
                                <Form.Label>Odobrena snaga</Form.Label>
                                <Form.Control isInvalid={errors.sp_dvotarifno_odosnaga?.message ? true : false} type='name' name='sp_dvotarifno_odosnaga' placeholder='Odobrena snaga' value={mrezarina.sp_dvotarifno_odosnaga} {...register('sp_dvotarifno_odosnaga')}
                                onChange={handleInput}></Form.Control>
                                <Form.Control.Feedback type='invalid'>{errors.sp_dvotarifno_odosnaga?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row> 

            </Card.Body>
            </Card>
            <Card style={{ width: '100%', marginTop: '10px'}} border='success'>
                <Card.Body>
                    <Card.Title>Upravljana potrošnja</Card.Title>
                    <Row>
                        <Col>
                            <Form.Group controlId='sp_domacinstvo_vt'>
                                <Form.Label>Viša tarifa</Form.Label>
                                <Form.Control isInvalid={errors.sp_domacinstvo_vt?.message ? true : false} type='name' name='sp_domacinstvo_vt' placeholder='Visa tarifa' value={mrezarina.sp_domacinstvo_vt} {...register('sp_domacinstvo_vt')}
                                onChange={handleInput}></Form.Control>
                                <Form.Control.Feedback type='invalid'>{errors.sp_domacinstvo_vt?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='sp_domacinstvo_nt'>
                                <Form.Label>Niža tarifa</Form.Label>
                                <Form.Control isInvalid={errors.sp_domacinstvo_nt?.message ? true : false} type='name' name='sp_domacinstvo_nt' placeholder='Niza tarifa' value={mrezarina.sp_domacinstvo_nt} {...register('sp_domacinstvo_nt')}
                                onChange={handleInput}></Form.Control>
                                <Form.Control.Feedback type='invalid'>{errors.sp_domacinstvo_nt?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='sp_domacinstvo_odosnaga'>
                                <Form.Label>Odobrena snaga</Form.Label>
                                <Form.Control isInvalid={errors.sp_domacinstvo_odosnaga?.message ? true : false} type='name' name='sp_domacinstvo_odosnaga' placeholder='Odobrena snaga' value={mrezarina.sp_domacinstvo_odosnaga} {...register('sp_domacinstvo_odosnaga')}
                                onChange={handleInput}></Form.Control>
                                <Form.Control.Feedback type='invalid'>{errors.sp_domacinstvo_odosnaga?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>  

            </Card.Body>
            </Card>
            <Row>
                <Col xs={8}>
                    <Card style={{ width: '100%', marginTop: '10px'}} border='success'>
                    <Card.Body>
                        <Card.Title>Jednotarifno merenje</Card.Title>
                            <Row>
                                <Col>
                                    <Form.Group controlId='sp_jednotarifno_jt'>
                                        <Form.Label>Jedinstvena tarifa</Form.Label>
                                        <Form.Control isInvalid={errors.sp_jednotarifno_jt?.message ? true : false} type='name' name='sp_jednotarifno_jt' placeholder='Jedinstvena tarifa' value={mrezarina.sp_jednotarifno_jt} {...register('sp_jednotarifno_jt')}
                                        onChange={handleInput}></Form.Control>
                                        <Form.Control.Feedback type='invalid'>{errors.sp_jednotarifno_jt?.message}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId='sp_jednotarifno_odosnaga'>
                                        <Form.Label>Odobrena snaga</Form.Label>
                                        <Form.Control isInvalid={errors.sp_jednotarifno_odosnaga?.message ? true : false} type='name' name='sp_jednotarifno_odosnaga' placeholder='Odobrena snaga' value={mrezarina.sp_jednotarifno_odosnaga} {...register('sp_jednotarifno_odosnaga')}
                                        onChange={handleInput}></Form.Control>
                                        <Form.Control.Feedback type='invalid'>{errors.sp_jednotarifno_odosnaga?.message}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                    </Card.Body>
                    </Card>
                </Col>
                <Col xs={4}>
                    <Card style={{ width: '100%', marginTop: '10px'}} border='success'>
                    <Card.Body>
                        <Card.Title>Javna rasveta</Card.Title>
                            <Row>
                                <Col>
                                    <Form.Group controlId='jr_jt'>
                                        <Form.Label>Javna rasveta</Form.Label>
                                        <Form.Control isInvalid={errors.jr_jt?.message ? true : false} type='name' name='jr_jt' placeholder='JR Jedinstvena tarifa' value={mrezarina.jr_jt} {...register('jr_jt')}
                                        onChange={handleInput}></Form.Control>
                                        <Form.Control.Feedback type='invalid'>{errors.jr_jt?.message}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row> 
                    </Card.Body>
                    </Card>
                </Col>
            </Row>
            <br/>
            <br/>
            <Row>
                <Col xs={6}>
                    <Button size='lg' type='submit' variant='primary'>
                        Sačuvaj
                    </Button>
                </Col>
                <Col xs={6}>
                    <Button type='button' size='lg' variant='primary' onClick={() => history.push('/mrezarina')} >
                        Nazad
                    </Button>
                </Col>
            </Row>
            </Form> 
            </>
    )
}

export default NewMrezarinaScreen
