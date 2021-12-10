import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Row, Col, Form, Table, Button } from 'react-bootstrap';
import { emsSchema } from '../../validations/emsValidations';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { snimiPodatkeZaEms } from '../../actions/emsActions';

const EMSScreen = ({ history }) => {

    const dispatch = useDispatch()


    const [datum, setDatum] = useState()
    const [brojevi, setBrojevi] = useState({
        h1: '',
        h2: '',
        h3: '',
        h4: '',
        h5: '',
        h6: '',
        h7: '',
        h8: '',
        h9: '',
        h10: '',
        h11: '',
        h12: '',
        h13: '',
        h14: '',
        h15: '',
        h16: '',
        h17: '',
        h18: '',
        h19: '',
        h20: '',
        h21: '',
        h22: '',
        h23: '',
        h24: ''
    })

    const {  register, handleSubmit, formState: { errors }  } = useForm({
        resolver: yupResolver(emsSchema)
    })

    const dateHandler = (e) => {
        setDatum(e.target.value)
    }

    const inputHandler = (e) => {
        setBrojevi({...brojevi, [e.target.name]: e.target.value})
    }

    const submitHandler = (data, e) => {
        e.preventDefault()
        const dmG = datum.split('-')
        const dan = dmG[2]
        const mesec = dmG[1]
        const godina = dmG[0]
        dispatch(snimiPodatkeZaEms(brojevi, dan, mesec, godina))
        history.push('/ems')
        
    }

    return (
        <>
        <h1>Dnevni Unos za EMS</h1>
        <br/>
        <Form onSubmit={handleSubmit(submitHandler)} >
        <Row>
                <h5>Izaberite datum</h5>
                <Col xs={4}>
                    <Form.Control type='date' value={datum} onChange={dateHandler} ></Form.Control>
                </Col>
            </Row>
            <br/>
             <h5>Unesite vrednosti</h5>
            <Table  striped bordered hover variante='dark'>
                <thead>
                    <tr>
                        <th>1h</th>
                        <th>2h</th>
                        <th>3h</th>
                        <th>4h</th>
                        <th>5h</th>
                        <th>6h</th>
                        <th>7h</th>
                        <th>8h</th>
                    </tr>
                </thead> 
                <tbody>
                    <tr>
                        <td>
                            <Form.Control isInvalid={errors.h1?.message ? true : false} type='text' name='h1' value={brojevi.h1} {...register('h1')} onChange={inputHandler} ></Form.Control>
                            <Form.Control.Feedback type='invalid'>{errors.h1?.message}</Form.Control.Feedback>
                        </td>
                        <td>
                            <Form.Control isInvalid={errors.h2?.message ? true : false} type='text' name='h2' value={brojevi.h2} {...register('h2')} onChange={inputHandler} ></Form.Control>
                            <Form.Control.Feedback type='invalid'>{errors.h2?.message}</Form.Control.Feedback>
                        </td>
                        <td>
                            <Form.Control isInvalid={errors.h3?.message ? true : false} type='text' name='h3' value={brojevi.h3} {...register('h3')} onChange={inputHandler} ></Form.Control>
                            <Form.Control.Feedback type='invalid'>{errors.h3?.message}</Form.Control.Feedback>
                        </td>
                        <td>
                            <Form.Control isInvalid={errors.h4?.message ? true : false} type='text' name='h4' value={brojevi.h4} {...register('h4')} onChange={inputHandler} ></Form.Control>
                            <Form.Control.Feedback type='invalid'>{errors.h4?.message}</Form.Control.Feedback>
                        </td>
                        <td>
                            <Form.Control isInvalid={errors.h5?.message ? true : false} type='text' name='h5' value={brojevi.h5} {...register('h5')} onChange={inputHandler} ></Form.Control>
                            <Form.Control.Feedback type='invalid'>{errors.h5?.message}</Form.Control.Feedback>
                        </td>
                        <td>
                            <Form.Control isInvalid={errors.h6?.message ? true : false} type='text' name='h6' value={brojevi.h6} {...register('h6')} onChange={inputHandler} ></Form.Control>
                            <Form.Control.Feedback type='invalid'>{errors.h6?.message}</Form.Control.Feedback>
                        </td>
                        <td>
                            <Form.Control isInvalid={errors.h7?.message ? true : false} type='text' name='h7' value={brojevi.h7} {...register('h7')}  onChange={inputHandler}></Form.Control>
                            <Form.Control.Feedback type='invalid'>{errors.h7?.message}</Form.Control.Feedback>
                        </td>
                        <td>
                        <   Form.Control isInvalid={errors.h8?.message ? true : false} type='text' name='h8' value={brojevi.h8} {...register('h8')} onChange={inputHandler} ></Form.Control>
                        <Form.Control.Feedback type='invalid'>{errors.h9?.message}</Form.Control.Feedback>
                        </td>
                    </tr>
                    </tbody>
            </Table> 
            <br/>
            <Table  striped bordered hover variante='dark'>
                <thead>
                    <tr>
                        <th>9h</th>
                        <th>10h</th>
                        <th>11h</th>
                        <th>12h</th>
                        <th>13h</th>
                        <th>14h</th>
                        <th>15h</th>
                        <th>16h</th>
                    </tr>
                </thead> 
                <tbody>
                    <tr>
                        <td>
                            <Form.Control isInvalid={errors.h9?.message ? true : false} type='text' name='h9' value={brojevi.h9} {...register('h9')} onChange={inputHandler} ></Form.Control>
                            <Form.Control.Feedback type='invalid'>{errors.h9?.message}</Form.Control.Feedback>
                        </td>
                        <td>
                            <Form.Control isInvalid={errors.h10?.message ? true : false} type='text' name='h10' value={brojevi.h10} {...register('h10')}  onChange={inputHandler}></Form.Control>
                            <Form.Control.Feedback type='invalid'>{errors.h10?.message}</Form.Control.Feedback>
                        </td>
                        <td>
                            <Form.Control isInvalid={errors.h11?.message ? true : false} type='text' name='h11' value={brojevi.h11} {...register('h11')} onChange={inputHandler} ></Form.Control>
                            <Form.Control.Feedback type='invalid'>{errors.h11?.message}</Form.Control.Feedback>
                        </td>
                        <td>
                            <Form.Control isInvalid={errors.h12?.message ? true : false} type='text' name='h12' value={brojevi.h12} {...register('h12')}  onChange={inputHandler}></Form.Control>
                            <Form.Control.Feedback type='invalid'>{errors.h12?.message}</Form.Control.Feedback>
                        </td>
                        <td>
                            <Form.Control isInvalid={errors.h13?.message ? true : false} type='text' name='h13' value={brojevi.h13} {...register('h13')} onChange={inputHandler} ></Form.Control>
                            <Form.Control.Feedback type='invalid'>{errors.h13?.message}</Form.Control.Feedback>
                        </td>
                        <td>
                            <Form.Control isInvalid={errors.h14?.message ? true : false} type='text' name='h14' value={brojevi.h14} {...register('h14')} onChange={inputHandler} ></Form.Control>
                            <Form.Control.Feedback type='invalid'>{errors.h14?.message}</Form.Control.Feedback>
                        </td>
                        <td>
                            <Form.Control isInvalid={errors.h15?.message ? true : false} type='text' name='h15' value={brojevi.h15} {...register('h15')} onChange={inputHandler} ></Form.Control>
                            <Form.Control.Feedback type='invalid'>{errors.h15?.message}</Form.Control.Feedback>
                        </td>
                        <td>
                            <Form.Control isInvalid={errors.h16?.message ? true : false} type='text' name='h16' value={brojevi.h16} {...register('h16')} onChange={inputHandler} ></Form.Control>
                            <Form.Control.Feedback type='invalid'>{errors.h16?.message}</Form.Control.Feedback>
                        </td>
                    </tr>
                    </tbody>
            </Table> 
            <br/>
            <Table  striped bordered hover variante='dark'>
                <thead>
                    <tr>
                        <th>17h</th>
                        <th>18h</th>
                        <th>19h</th>
                        <th>20h</th>
                        <th>21h</th>
                        <th>22h</th>
                        <th>23h</th>
                        <th>24h</th>
                    </tr>
                </thead> 
                <tbody>
                    <tr>
                        <td>
                            <Form.Control isInvalid={errors.h17?.message ? true : false} type='text' name='h17' value={brojevi.h17} {...register('h17')} onChange={inputHandler} ></Form.Control>
                            <Form.Control.Feedback type='invalid'>{errors.h17?.message}</Form.Control.Feedback>
                        </td>
                        <td>
                            <Form.Control isInvalid={errors.h18?.message ? true : false} type='text' name='h18' value={brojevi.h18} {...register('h18')} onChange={inputHandler} ></Form.Control>
                            <Form.Control.Feedback type='invalid'>{errors.h18?.message}</Form.Control.Feedback>
                        </td>
                        <td>
                            <Form.Control isInvalid={errors.h19?.message ? true : false} type='text' name='h19' value={brojevi.h19} {...register('h19')}  onChange={inputHandler}></Form.Control>
                            <Form.Control.Feedback type='invalid'>{errors.h19?.message}</Form.Control.Feedback>
                        </td>
                        <td>
                            <Form.Control isInvalid={errors.h20?.message ? true : false} type='text' name='h20' value={brojevi.h20} {...register('h20')} onChange={inputHandler} ></Form.Control>
                            <Form.Control.Feedback type='invalid'>{errors.h20?.message}</Form.Control.Feedback>
                        </td>
                        <td>
                            <Form.Control isInvalid={errors.h21?.message ? true : false} type='text' name='h21' value={brojevi.h21} {...register('h21')} onChange={inputHandler} ></Form.Control>
                            <Form.Control.Feedback type='invalid'>{errors.h21?.message}</Form.Control.Feedback>
                        </td>
                        <td>
                            <Form.Control isInvalid={errors.h22?.message ? true : false} type='text' name='h22' value={brojevi.h22} {...register('h22')} onChange={inputHandler} ></Form.Control>
                            <Form.Control.Feedback type='invalid'>{errors.h22?.message}</Form.Control.Feedback>
                        </td>
                        <td>
                            <Form.Control isInvalid={errors.h23?.message ? true : false} type='text' name='h23' value={brojevi.h23} {...register('h23')} onChange={inputHandler}  ></Form.Control>
                            <Form.Control.Feedback type='invalid'>{errors.h23?.message}</Form.Control.Feedback>
                        </td>
                        <td>
                            <Form.Control isInvalid={errors.h24?.message ? true : false} type='text' name='h24' value={brojevi.h24} {...register('h24')} onChange={inputHandler}  ></Form.Control>
                            <Form.Control.Feedback type='invalid'>{errors.h24?.message}</Form.Control.Feedback>
                        </td>
                    </tr>
                    </tbody>
            </Table> 
            <br/>
            <Row>
                <Col xs={4}>
                <Button type='submit' variant='primary' size='lg'>Snimi</Button>
                </Col>
                <Col xs={4}>
                <Button type='button' variant='primary' size='lg' onClick={() => history.push('/ems')} >Nazad</Button>
                </Col>
            </Row>
        </Form>
        </>
    )
}

export default EMSScreen
