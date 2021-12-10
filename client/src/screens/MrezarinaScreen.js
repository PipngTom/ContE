import React, {useState, useEffect} from 'react'
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { mrezarinaSchema } from '../validations/mrezarinaValidation';
import { getMrezarina, updateMrezarina} from '../actions/mrezarinaActions';
import { GET_MREZARINA_RESET } from '../constants/mrezarinaConstants';

const MrezarinaScreen = ({ history, match }) => {

    const mrezarinaId = match.params.id

    const idPrethodne = match.params.idpret

    const [mrezarina, setMrezarina] = useState({})
    

    const reduxMrezarina = useSelector(state => state.mrezarina)

    const {loading, mrezarina: mrezarinaFromRedux} = reduxMrezarina

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(mrezarinaSchema)
    })

    const dispatch = useDispatch()

    useEffect(() => {

           if(!mrezarinaFromRedux) {
                dispatch(getMrezarina(mrezarinaId))
            } else {
                setMrezarina({...mrezarina,
                    id: mrezarinaFromRedux.id,
                    vaziOd: mrezarinaFromRedux.vaziOd.slice(0, 10),
                    vaziDo: mrezarinaFromRedux.vaziDo ? mrezarinaFromRedux.vaziDo.slice(0, 10) : null,
                    srednji_napon_vt: mrezarinaFromRedux.srednji_napon_vt,
                    srednji_napon_reak: mrezarinaFromRedux.srednji_napon_reak,
                    srednji_napon_odosnaga: mrezarinaFromRedux.srednji_napon_odosnaga,
                    srednji_napon_nt: mrezarinaFromRedux.srednji_napon_nt,
                    srednji_napon_prereak: mrezarinaFromRedux.srednji_napon_prereak,
                    srednji_napon_prekosnaga: mrezarinaFromRedux.srednji_napon_prekosnaga,
                    niski_napon_vt: mrezarinaFromRedux.niski_napon_vt,
                    niski_napon_reak: mrezarinaFromRedux.niski_napon_reak,
                    niski_napon_odosnaga: mrezarinaFromRedux.niski_napon_odosnaga,
                    niski_napon_nt: mrezarinaFromRedux.niski_napon_nt,
                    niski_napon_prereak: mrezarinaFromRedux.niski_napon_prereak,
                    niski_napon_prekosnaga: mrezarinaFromRedux.niski_napon_prekosnaga,
                    sp_dvotarifno_vt: mrezarinaFromRedux.sp_dvotarifno_vt,
                    sp_dvotarifno_nt: mrezarinaFromRedux.sp_dvotarifno_nt,
                    sp_dvotarifno_odosnaga: mrezarinaFromRedux.sp_dvotarifno_odosnaga,
                    sp_domacinstvo_vt: mrezarinaFromRedux.sp_domacinstvo_vt,
                    sp_domacinstvo_nt: mrezarinaFromRedux.sp_domacinstvo_nt,
                    sp_domacinstvo_odosnaga: mrezarinaFromRedux.sp_domacinstvo_odosnaga,
                    sp_jednotarifno_jt: mrezarinaFromRedux.sp_jednotarifno_jt,
                    sp_jednotarifno_odosnaga: mrezarinaFromRedux.sp_jednotarifno_odosnaga,
                    jr_jt: mrezarinaFromRedux.jr_jt,
                   })
        setValue('srednji_napon_vt', mrezarinaFromRedux.srednji_napon_vt)
        setValue('srednji_napon_reak', mrezarinaFromRedux.srednji_napon_reak)
        setValue('srednji_napon_odosnaga', mrezarinaFromRedux.srednji_napon_odosnaga)
        setValue('srednji_napon_nt', mrezarinaFromRedux.srednji_napon_nt)
        setValue('srednji_napon_prereak', mrezarinaFromRedux.srednji_napon_prereak)
        setValue('srednji_napon_prekosnaga', mrezarinaFromRedux.srednji_napon_prekosnaga)
        setValue('niski_napon_vt', mrezarinaFromRedux.niski_napon_vt)
        setValue('niski_napon_reak', mrezarinaFromRedux.niski_napon_reak)
        setValue('niski_napon_odosnaga', mrezarinaFromRedux.niski_napon_odosnaga)
        setValue('niski_napon_nt', mrezarinaFromRedux.niski_napon_nt)
        setValue('niski_napon_prereak', mrezarinaFromRedux.niski_napon_prereak)
        setValue('niski_napon_prekosnaga', mrezarinaFromRedux.niski_napon_prekosnaga)
        setValue('sp_dvotarifno_vt', mrezarinaFromRedux.sp_dvotarifno_vt)
        setValue('sp_dvotarifno_nt', mrezarinaFromRedux.sp_dvotarifno_nt)
        setValue('sp_dvotarifno_odosnaga', mrezarinaFromRedux.sp_dvotarifno_odosnaga)
        setValue('sp_domacinstvo_vt', mrezarinaFromRedux.sp_domacinstvo_vt)
        setValue('sp_domacinstvo_nt', mrezarinaFromRedux.sp_domacinstvo_nt)
        setValue('sp_domacinstvo_odosnaga', mrezarinaFromRedux.sp_domacinstvo_odosnaga)
        setValue('sp_jednotarifno_jt', mrezarinaFromRedux.sp_jednotarifno_jt)
        setValue('sp_jednotarifno_odosnaga', mrezarinaFromRedux.sp_jednotarifno_odosnaga)
        setValue('jr_jt', mrezarinaFromRedux.jr_jt)
        }
            
        
    }, [dispatch, mrezarinaFromRedux])

    const handleInput = (e) => {
        setMrezarina({...mrezarina, [e.target.name] : e.target.value})
    }


    const submitMrezarina = async (data, e) => {
        e.preventDefault()
        dispatch(updateMrezarina(mrezarina, idPrethodne))
        history.push('/mrezarina')
        dispatch({type: GET_MREZARINA_RESET})
    }

    return (
        <div>
            <h1>Mrežarina</h1>
            <br/>
            {loading ? (
                <Loader/>
            ) : (<>
            <Form onSubmit={handleSubmit(submitMrezarina)}>
                <Row>
                    <Col xs={4}>
                    <h5>Važi Od</h5>
                    <Form.Control type='date' name='vaziOd' value={mrezarina.vaziOd} onChange={handleInput} ></Form.Control>
                    </Col>
                    {mrezarinaFromRedux && mrezarinaFromRedux.vaziDo!==null && <Col xs={4}>
                    <h5>Važi Do</h5>
                    <Form.Control type='date' name='vaziDo' value={mrezarina.vaziDo} onChange={handleInput} ></Form.Control>
                    </Col>}
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
                                <Form.Control.Feedback type='invalid'>{errors.srednji_napon_vt?.message}</Form.Control.Feedback>
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
                                        <Form.Control isInvalid={errors.sp_jednotarifno_odosnaga?.messsage ? true : false} type='name' name='sp_jednotarifno_odosnaga' placeholder='Odobrena snaga' value={mrezarina.sp_jednotarifno_odosnaga} {...register('sp_jednotarifno_odosnaga')}
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
            <Row>
               {mrezarinaFromRedux && mrezarinaFromRedux.vaziDo === null && <Col xs={4}>
                    <Button size='lg' type='submit' variant='primary'>
                        Sačuvaj
                    </Button>
                </Col>} 
                <Col xs={4}>
                    <Button type='button' variant='primary' size='lg' onClick={() => {
                        history.push('/mrezarina')
                        dispatch({type: GET_MREZARINA_RESET})
                        }}>
                        Nazad
                    </Button>
                </Col>
            </Row>
            </Form>
            </>)}
        </div>
    )
}

export default MrezarinaScreen
