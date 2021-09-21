import React, {useState, useEffect} from 'react'
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { getMrezarina, updateMrezarina} from '../actions/mrezarinaActions';

const MrezarinaScreen = () => {

    const [mrezarina, setMrezarina] = useState({})

    const reduxMrezarina = useSelector(state => state.mrezarina)

    const {loading, error, mrezarina: mrezarinaFromRedux} = reduxMrezarina

    const dispatch = useDispatch()

    useEffect(() => {
        if(!mrezarinaFromRedux){
            dispatch(getMrezarina())
        } else{
            setMrezarina({...mrezarina,
            id: mrezarinaFromRedux.id,
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
            pdv: mrezarinaFromRedux.pdv,
            akciza: mrezarinaFromRedux.akciza,
            naknada_tv: mrezarinaFromRedux.naknada_tv,
            naknada_ee: mrezarinaFromRedux.naknada_ee,
            naknada_oie: mrezarinaFromRedux.naknada_oie,


        })
        }  
        
    }, [dispatch, mrezarinaFromRedux])

    const handleInput = (e) => {
        setMrezarina({...mrezarina, [e.target.name] : e.target.value})
    }

    const submitMrezarina = () => {
       // console.log(mrezarina)
        dispatch(updateMrezarina(mrezarina))
    }

    return (
        <div>
            <h1>Mrezarina</h1>
            <Row>
                <Col xs={4}></Col>
                <Col xs={4}>
                    <Button type='submit' variant='primary' onClick={submitMrezarina}>
                        Sačuvaj
                    </Button>
                </Col>
                <Col xs={4}></Col>
            </Row>
            {loading ? (
                <Loader/>
            ) : (<>
            <Card style={{ width: '100%', marginTop: '10px'}} border='success'>
                <Card.Body>
                    <Card.Title>Srednji Napon</Card.Title>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group controlId='srednji_napon_vt'>
                                <Form.Label>Visa tarifa</Form.Label>
                                <Form.Control type='name' name='srednji_napon_vt' placeholder='Visa tarifa' value={mrezarina.srednji_napon_vt}
                                onChange={handleInput}></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='srednji_napon_reak'>
                                <Form.Label>Reaktivna energija</Form.Label>
                                <Form.Control type='name' name='srednji_napon_reak' placeholder='Reaktivna energije' value={mrezarina.srednji_napon_reak}
                                onChange={handleInput}></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='srednji_napon_odosnaga'>
                                <Form.Label>Odobrena snaga</Form.Label>
                                <Form.Control type='name' name='srednji_napon_odosnaga' placeholder='Odobrena snaga' value={mrezarina.srednji_napon_odosnaga}
                                onChange={handleInput}></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId='srednji_napon_nt'>
                                <Form.Label>Niza tarifa</Form.Label>
                                <Form.Control type='name' name='srednji_napon_nt' placeholder='Niza tarifa' value={mrezarina.srednji_napon_nt}
                                onChange={handleInput}></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='srednji_napon_prereak'>
                                <Form.Label>Prekomerna reaktivna energija</Form.Label>
                                <Form.Control type='name' name='srednji_napon_prereak' placeholder='Reaktivna energije' value={mrezarina.srednji_napon_prereak}
                                onChange={handleInput}></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='srednji_napon_prekosnaga'>
                                <Form.Label>Odobrena snaga</Form.Label>
                                <Form.Control type='name' name='srednji_napon_prekosnaga' placeholder='Prekomerna snaga' value={mrezarina.srednji_napon_prekosnaga}
                                onChange={handleInput}></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>  

            </Card.Body>
            </Card>
            <Card style={{ width: '100%', marginTop: '10px'}} border='success'>
                <Card.Body>
                    <Card.Title>Niski Napon</Card.Title>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group controlId='niski_napon_vt'>
                                <Form.Label>Visa tarifa</Form.Label>
                                <Form.Control type='name' name='niski_napon_vt' placeholder='Visa tarifa' value={mrezarina.niski_napon_vt}
                                onChange={handleInput}></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='niski_napon_reak'>
                                <Form.Label>Reaktivna energija</Form.Label>
                                <Form.Control type='name' name='niski_napon_reak' placeholder='Reaktivna energije' value={mrezarina.niski_napon_reak}
                                onChange={handleInput}></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='niski_napon_odosnaga'>
                                <Form.Label>Odobrena snaga</Form.Label>
                                <Form.Control type='name' name='niski_napon_odosnaga' placeholder='Odobrena snaga' value={mrezarina.niski_napon_odosnaga}
                                onChange={handleInput}></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId='niski_napon_nt'>
                                <Form.Label>Niza tarifa</Form.Label>
                                <Form.Control type='name' name='niski_napon_nt' placeholder='Niza tarifa' value={mrezarina.niski_napon_nt}
                                onChange={handleInput}></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='niski_napon_prereak'>
                                <Form.Label>Prekomerna reaktivna energija</Form.Label>
                                <Form.Control type='name' name='niski_napon_prereak' placeholder='Prekomerna reaktivna energije' value={mrezarina.niski_napon_prereak}
                                onChange={handleInput}></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='niski_napon_prekosnaga'>
                                <Form.Label>Odobrena snaga</Form.Label>
                                <Form.Control type='name' name='niski_napon_prekosnaga' placeholder='Prekomerna snaga' value={mrezarina.niski_napon_prekosnaga}
                                onChange={handleInput}></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>  

            </Card.Body>
            </Card>

            <Card style={{ width: '100%', marginTop: '10px'}} border='success'>
                <Card.Body>
                    <Card.Title>Dvotarifno merenje</Card.Title>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group controlId='sp_dvotarifno_vt'>
                                <Form.Label>Visa tarifa</Form.Label>
                                <Form.Control type='name' name='sp_dvotarifno_vt' placeholder='Visa tarifa' value={mrezarina.sp_dvotarifno_vt}
                                onChange={handleInput}></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='sp_dvotarifno_nt'>
                                <Form.Label>Niza tarifa</Form.Label>
                                <Form.Control type='name' name='sp_dvotarifno_nt' placeholder='Niza tarifa' value={mrezarina.sp_dvotarifno_nt}
                                onChange={handleInput}></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='sp_dvotarifno_odosnaga'>
                                <Form.Label>Odobrena snaga</Form.Label>
                                <Form.Control type='name' name='sp_dvotarifno_odosnaga' placeholder='Odobrena snaga' value={mrezarina.sp_dvotarifno_odosnaga}
                                onChange={handleInput}></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>  

            </Card.Body>
            </Card>
            <Card style={{ width: '100%', marginTop: '10px'}} border='success'>
                <Card.Body>
                    <Card.Title>Upravljana potrosnja</Card.Title>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group controlId='sp_domacinstvo_vt'>
                                <Form.Label>Visa tarifa</Form.Label>
                                <Form.Control type='name' name='sp_domacinstvo_vt' placeholder='Visa tarifa' value={mrezarina.sp_domacinstvo_vt}
                                onChange={handleInput}></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='sp_domacinstvo_nt'>
                                <Form.Label>Niza tarifa</Form.Label>
                                <Form.Control type='name' name='sp_domacinstvo_nt' placeholder='Niza tarifa' value={mrezarina.sp_domacinstvo_nt}
                                onChange={handleInput}></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='sp_domacinstvo_odosnaga'>
                                <Form.Label>Odobrena snaga</Form.Label>
                                <Form.Control type='name' name='sp_domacinstvo_odosnaga' placeholder='Odobrena snaga' value={mrezarina.sp_domacinstvo_odosnaga}
                                onChange={handleInput}></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>  

            </Card.Body>
            </Card>
            <Row>
                <Col xs={8}>
                    <Card style={{ width: '100%', marginTop: '10px'}} border='success'>
                    <Card.Body>
                        <Card.Title>Jednotarifno merenje</Card.Title>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group controlId='sp_jednotarifno_jt'>
                                        <Form.Label>Jedinstvena tarifa</Form.Label>
                                        <Form.Control type='name' name='sp_jednotarifno_jt' placeholder='Jedinstvena tarifa' value={mrezarina.sp_jednotarifno_jt}
                                        onChange={handleInput}></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId='sp_jednotarifno_odosnaga'>
                                        <Form.Label>Odobrena snaga</Form.Label>
                                        <Form.Control type='name' name='sp_jednotarifno_odosnaga' placeholder='Odobrena snaga' value={mrezarina.sp_jednotarifno_odosnaga}
                                        onChange={handleInput}></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>  
                    </Card.Body>
                    </Card>
                </Col>
                <Col xs={4}>
                    <Card style={{ width: '100%', marginTop: '10px'}} border='success'>
                    <Card.Body>
                        <Card.Title>Javna rasveta</Card.Title>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group controlId='jr_jt'>
                                        <Form.Label>Javna rasveta</Form.Label>
                                        <Form.Control type='name' name='jr_jt' placeholder='JR Jedinstvena tarifa' value={mrezarina.jr_jt}
                                        onChange={handleInput}></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>  
                    </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Card style={{ width: '100%', marginTop: '10px'}} border='success'>
                <Card.Body>
                    <Card.Title>Upravljana potrosnja</Card.Title>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group controlId='pdv'>
                                <Form.Label>PDV</Form.Label>
                                <Form.Control type='name' name='pdv' placeholder='PDV' value={mrezarina.pdv}
                                onChange={handleInput}></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='akciza'>
                                <Form.Label>Akciza</Form.Label>
                                <Form.Control type='name' name='akciza' placeholder='Akciza' value={mrezarina.akciza}
                                onChange={handleInput}></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='naknada_tv'>
                                <Form.Label>TV naknada</Form.Label>
                                <Form.Control type='name' name='naknada_tv' placeholder='TV naknada' value={mrezarina.naknada_tv}
                                onChange={handleInput}></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='naknada_ee'>
                                <Form.Label>Naknada za energetsku efikasnost</Form.Label>
                                <Form.Control type='name' name='naknada_ee' placeholder='EE naknada' value={mrezarina.naknada_ee}
                                onChange={handleInput}></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='naknada_oie'>
                                <Form.Label>Naknada za povl. proizvodjace</Form.Label>
                                <Form.Control type='name' name='naknada_oie' placeholder='OIE naknada' value={mrezarina.naknada_oie}
                                onChange={handleInput}></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>  

            </Card.Body>
            </Card>
            </>)}
        </div>
    )
}

export default MrezarinaScreen
