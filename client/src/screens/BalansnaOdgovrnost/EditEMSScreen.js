import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Table, Button } from 'react-bootstrap';
import Loader from '../../components/Loader';
import { getSinglePodatakEms, snimiPodatkeZaEms } from '../../actions/emsActions';
import { GET_SINGLE_EMS_RESET } from '../../constants/emsConstants';
import { emsSchema } from '../../validations/emsValidations';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const EditEMSScreen = ({ history, match }) => {

    const podaciId = match.params.id

    const dispatch = useDispatch()

    const emsSingle = useSelector(state => state.singleEms)
    const {loading, ems } = emsSingle

    const [podaciEms, setPodaciEms ] = useState({})

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(emsSchema)
    })

    useEffect(() => {

        if (!ems) {
            dispatch(getSinglePodatakEms(podaciId))
        } else {
            setPodaciEms({...podaciEms,
                h1: ems.h1,
                h2: ems.h2,
                h3: ems.h3,
                h4: ems.h4,
                h5: ems.h5,
                h6: ems.h6,
                h7: ems.h7,
                h8: ems.h8,
                h9: ems.h9,
                h10: ems.h10,
                h11: ems.h11,
                h12: ems.h12,
                h13: ems.h13,
                h14: ems.h14,
                h15: ems.h15,
                h16: ems.h16,
                h17: ems.h17,
                h18: ems.h18,
                h19: ems.h19,
                h20: ems.h20,
                h21: ems.h21,
                h22: ems.h22,
                h23: ems.h23,
                h24: ems.h24,
                datum: ems.godina + '-' + (ems.mesec < 10 ? ('0' + ems.mesec) : ems.mesec) + '-' + (ems.dan < 10 ? ('0' + ems.dan) :  ems.dan)})
            setValue('h1', ems.h1) 
            setValue('h2', ems.h2)
            setValue('h3', ems.h3)
            setValue('h4', ems.h4)
            setValue('h5', ems.h5)
            setValue('h6', ems.h6)
            setValue('h7', ems.h7)
            setValue('h8', ems.h8)
            setValue('h9', ems.h9)
            setValue('h10', ems.h10)
            setValue('h11', ems.h11)
            setValue('h12', ems.h12)
            setValue('h13', ems.h13)
            setValue('h14', ems.h14)
            setValue('h15', ems.h15)
            setValue('h16', ems.h16)
            setValue('h17', ems.h17)
            setValue('h18', ems.h18)
            setValue('h19', ems.h19)
            setValue('h20', ems.h20)
            setValue('h21', ems.h21)
            setValue('h22', ems.h22)
            setValue('h23', ems.h23)
            setValue('h24', ems.h24)   
        }
        
        
    }, [dispatch, ems])

    const inputHandler = (e) => {
        setPodaciEms({...podaciEms, [e.target.name]: e.target.value})
    }


    const submitHandler = (data, e) => {
        e.preventDefault()
        const dan = podaciEms.datum.slice(8, 10)
        const mesec = podaciEms.datum.slice(5, 7)
        const godina = podaciEms.datum.slice(0, 4)
        dispatch(snimiPodatkeZaEms(podaciEms, dan, mesec, godina, podaciId))
        history.push('/ems')
        dispatch({type: GET_SINGLE_EMS_RESET})
    }

    return (
        <>
          {loading ? <Loader/> : (<>
               <h1>Ispravka dnevnog Unosa za EMS</h1>
               <br/>
               <Form onSubmit={handleSubmit(submitHandler)} >
                <Row>
                       <h5>Promenite datum</h5>
                       <Col xs={4}>
                           <Form.Control name='datum' type='date' value={podaciEms.datum} onChange={inputHandler} ></Form.Control>
                       </Col>
                   </Row> 
                   <br/>
                    <h5>Ispravite vrednosti</h5>
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
                                   <Form.Control isInvalid={errors.h1?.message ? true : false} type='text' name='h1' value={podaciEms.h1} {...register('h1')} onChange={inputHandler} ></Form.Control>
                                   <Form.Control.Feedback type='invalid'>{errors.h1?.message}</Form.Control.Feedback>
                               </td>
                               <td>
                                   <Form.Control isInvalid={errors.h2?.message ? true : false} type='text' name='h2' value={podaciEms.h2} {...register('h2')} onChange={inputHandler} ></Form.Control>
                                   <Form.Control.Feedback type='invalid'>{errors.h2?.message}</Form.Control.Feedback>
                               </td>
                               <td>
                                   <Form.Control isInvalid={errors.h3?.message ? true : false} type='text' name='h3' value={podaciEms.h3} {...register('h3')} onChange={inputHandler} ></Form.Control>
                                   <Form.Control.Feedback type='invalid'>{errors.h3?.message}</Form.Control.Feedback>
                               </td>
                               <td>
                                   <Form.Control isInvalid={errors.h4?.message ? true : false} type='text' name='h4' value={podaciEms.h4} {...register('h4')} onChange={inputHandler} ></Form.Control>
                                   <Form.Control.Feedback type='invalid'>{errors.h4?.message}</Form.Control.Feedback>
                               </td>
                               <td>
                                   <Form.Control isInvalid={errors.h5?.message ? true : false} type='text' name='h5' value={podaciEms.h5} {...register('h5')} onChange={inputHandler} ></Form.Control>
                                   <Form.Control.Feedback type='invalid'>{errors.h5?.message}</Form.Control.Feedback>
                               </td>
                               <td>
                                   <Form.Control isInvalid={errors.h6?.message ? true : false} type='text' name='h6' value={podaciEms.h6} {...register('h6')} onChange={inputHandler} ></Form.Control>
                                   <Form.Control.Feedback type='invalid'>{errors.h6?.message}</Form.Control.Feedback>
                               </td>
                               <td>
                                   <Form.Control isInvalid={errors.h7?.message ? true : false} type='text' name='h7' value={podaciEms.h7} {...register('h7')} onChange={inputHandler} ></Form.Control>
                                   <Form.Control.Feedback type='invalid'>{errors.h7?.message}</Form.Control.Feedback>
                               </td>
                               <td>
                                    <Form.Control isInvalid={errors.h8?.message ? true : false} type='text' name='h8' value={podaciEms.h8} {...register('h8')} onChange={inputHandler} ></Form.Control>
                                    <Form.Control.Feedback type='invalid'>{errors.h8?.message}</Form.Control.Feedback>
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
                                   <Form.Control isInvalid={errors.h9?.message ? true : false} type='text' name='h9' value={podaciEms.h9} {...register('h9')} onChange={inputHandler} ></Form.Control>
                                   <Form.Control.Feedback type='invalid'>{errors.h9?.message}</Form.Control.Feedback>
                               </td>
                               <td>
                                   <Form.Control isInvalid={errors.h10?.message ? true : false} type='text' name='h10' value={podaciEms.h10} {...register('h10')} onChange={inputHandler} ></Form.Control>
                                   <Form.Control.Feedback type='invalid'>{errors.h10?.message}</Form.Control.Feedback>
                               </td>
                               <td>
                                   <Form.Control isInvalid={errors.h11?.message ? true : false} type='text' name='h11' value={podaciEms.h11} {...register('h11')} onChange={inputHandler} ></Form.Control>
                                   <Form.Control.Feedback type='invalid'>{errors.h11?.message}</Form.Control.Feedback>
                               </td>
                               <td>
                                   <Form.Control isInvalid={errors.h12?.message ? true : false} type='text' name='h12' value={podaciEms.h12} {...register('h12')} onChange={inputHandler} ></Form.Control>
                                   <Form.Control.Feedback type='invalid'>{errors.h12?.message}</Form.Control.Feedback>
                               </td>
                               <td>
                                   <Form.Control isInvalid={errors.h13?.message ? true : false} type='text' name='h13' value={podaciEms.h13} {...register('h13')} onChange={inputHandler} ></Form.Control>
                                   <Form.Control.Feedback type='invalid'>{errors.h13?.message}</Form.Control.Feedback>
                               </td>
                               <td>
                                   <Form.Control isInvalid={errors.h14?.message ? true : false} type='text' name='h14' value={podaciEms.h14} {...register('h14')} onChange={inputHandler} ></Form.Control>
                                   <Form.Control.Feedback type='invalid'>{errors.h14?.message}</Form.Control.Feedback>
                               </td>
                               <td>
                                   <Form.Control isInvalid={errors.h15?.message ? true : false} type='text' name='h15' value={podaciEms.h15} {...register('h15')} onChange={inputHandler} ></Form.Control>
                                   <Form.Control.Feedback type='invalid'>{errors.h15?.message}</Form.Control.Feedback>
                               </td>
                               <td>
                                   <Form.Control isInvalid={errors.h16?.message ? true : false} type='text' name='h16' value={podaciEms.h16} {...register('h16')} onChange={inputHandler} ></Form.Control>
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
                                   <Form.Control isInvalid={errors.h17?.message ? true : false} type='text' name='h17' value={podaciEms.h17} {...register('h17')} onChange={inputHandler} ></Form.Control>
                                   <Form.Control.Feedback type='invalid'>{errors.h17?.message}</Form.Control.Feedback>
                               </td>
                               <td>
                                   <Form.Control isInvalid={errors.h18?.message ? true : false} type='text' name='h18' value={podaciEms.h18} {...register('h18')} onChange={inputHandler} ></Form.Control>
                                   <Form.Control.Feedback type='invalid'>{errors.h18?.message}</Form.Control.Feedback>
                               </td>
                               <td>
                                   <Form.Control isInvalid={errors.h19?.message ? true : false} type='text' name='h19' value={podaciEms.h19} {...register('h19')} onChange={inputHandler} ></Form.Control>
                                   <Form.Control.Feedback type='invalid'>{errors.h19?.message}</Form.Control.Feedback>
                               </td>
                               <td>
                                   <Form.Control isInvalid={errors.h20?.message ? true : false} type='text' name='h20' value={podaciEms.h20} {...register('h20')} onChange={inputHandler} ></Form.Control>
                                   <Form.Control.Feedback type='invalid'>{errors.h20?.message}</Form.Control.Feedback>
                               </td>
                               <td>
                                   <Form.Control isInvalid={errors.h21?.message ? true : false} type='text' name='h21' value={podaciEms.h21} {...register('h21')} onChange={inputHandler} ></Form.Control>
                                   <Form.Control.Feedback type='invalid'>{errors.h21?.message}</Form.Control.Feedback>
                               </td>
                               <td>
                                   <Form.Control isInvalid={errors.h22?.message ? true : false} type='text' name='h22' value={podaciEms.h22} {...register('h22')} onChange={inputHandler} ></Form.Control>
                                   <Form.Control.Feedback type='invalid'>{errors.h22?.message}</Form.Control.Feedback>
                               </td>
                               <td>
                                   <Form.Control isInvalid={errors.h23?.message ? true : false} type='text' name='h23' value={podaciEms.h23} {...register('h23')} onChange={inputHandler} ></Form.Control>
                                   <Form.Control.Feedback type='invalid'>{errors.h23?.message}</Form.Control.Feedback>
                               </td>
                               <td>
                                   <Form.Control isInvalid={errors.h24?.message ? true : false} type='text' name='h24' value={podaciEms.h24} {...register('h24')} onChange={inputHandler} ></Form.Control>
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
                       <Button type='button' variant='primary' size='lg' onClick={() => {
                           dispatch({type: GET_SINGLE_EMS_RESET})
                           history.push('/ems')}} >Nazad</Button>
                       </Col>
                   </Row>
               </Form>
               </>
          )}  
        </>
    )
}

export default EditEMSScreen
