import React, {useState, useEffect} from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import FormContainer from '../../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { noviUgovor, getSingleContract } from '../../actions/contractActions';
import {kategorija, vrsteSnabdevanja} from '../../constants/brojila'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { GET_SINGLE_CONTRACT_RESET} from '../../constants/contractConstants'

const schema = yup.object().shape({
    cenaVT: yup.number().typeError('Unesite brojcanu vrednost').positive('Unesite pozitivnu vrednost').required(),
    cenaNT: yup.number().typeError('Unesite brojcanu vrednost').positive('Unesite pozitivnu vrednost').required(),
    cenaJT: yup.number().typeError('Unesite brojcanu vrednost').positive('Unesite pozitivnu vrednost').required()
  });


const NewContractScreen = ({match, history}) => {

    const { register, handleSubmit, formState: { errors }, setValue   } = useForm(
        {
       resolver: yupResolver(schema)
   } 
   )  
    const dispatch = useDispatch()

    const contractId = match.params.id;

    const singleContract = useSelector(state => state.singleContract)
    const {loading, error, contract} = singleContract

    const allClients = useSelector(state => state.allClients)
    const {loading: loadingClients, error: errorClients, clients} = allClients

    

    const [ugovor, setUgovor] = useState({
        idKlijent: '',
        datumSklapanja: '',
        datumIsteka: '',
        cenaVT: '',
        cenaNT: '',
        cenaJT: ''
    })

    useEffect(() => {
        
        console.log(errors)
        console.log(register('cenaVT'))
        if(contractId)//EDIT MODE
        {
            if(!contract || contract.id != contractId){
                dispatch(getSingleContract(contractId))
                console.log('EDIT MODE need to dispatch getSingleClient')
            } else{
                setUgovor({...ugovor,
                idKlijent: contract.idKlijent,
                datumSklapanja: contract.datumSklapanja.slice(0,10),
                datumIsteka: contract.datumIsteka.slice(0,10),
                cenaVT: contract.cenaVT,
                cenaNT: contract.cenaNT,
                cenaJT: contract.cenaJT
            })
            setValue("cenaVT", contract.cenaVT)
            setValue("cenaNT", contract.cenaNT)
            setValue("cenaJT", contract.cenaJT) 
            
            }  
        }
        console.log('initial render for NEW MODE')
        

    },[dispatch, contract, contractId])

    const handleInput = (e) => {
    
        setUgovor({...ugovor, [e.target.name] : e.target.value})
      }

    const submitUgovor = async (data, e) => {
        e.preventDefault()
        
        let isValid = await schema.isValid(ugovor)
        console.log(isValid)
        
        console.log('YYYYYYYYYYYYYYYYYYYYYYYY', data, e)
         if(contractId){
            dispatch(noviUgovor(ugovor, contractId))
        } else {
            dispatch(noviUgovor(ugovor))
        }
        dispatch({type: GET_SINGLE_CONTRACT_RESET})
        history.push({pathname: `/contracts`}) 

    }
    const errorHandler = async (errors, e) => {
        console.log('BBBBBBB', errors, e)
        let isValid = await schema.isValid(ugovor)
        console.log(isValid)

    }
    /* const onSubmit = (data, e) => console.log(data, e);
    const onError = (errors, e) => console.log(errors, e); */

    return (
        <>
        <div>   
            <h2>Ugovor</h2>
        </div>
        <FormContainer>
            <Form onSubmit={handleSubmit(submitUgovor, errorHandler)}>
            <Form.Group controlId='nazivKlijenta'>
                <Form.Label>Naziv klijenta</Form.Label>
                <Form.Control as='select' name='idKlijent' value={ugovor.idKlijent}
                onChange={handleInput}>
                    <option value={0}>Izaberi klijenta</option>
                    {clients && clients.map((item)=>(
                        <option value={item.id}>{item.nazivKlijenta}</option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='datumSklapanja'>
                <Form.Label>Datum sklapanja ugovora</Form.Label>
                <Form.Control type='date' name='datumSklapanja'value={ugovor.datumSklapanja}
                onChange={handleInput}></Form.Control>
            </Form.Group>
            <Form.Group controlId='datumIsteka'>
                <Form.Label>Datum isteka ugovora</Form.Label>
                <Form.Control type='date' name='datumIsteka' value={ugovor.datumIsteka}
                onChange={handleInput}></Form.Control>
            </Form.Group>
            <Form.Group controlId='cenaVT'>
                <Form.Label>Cena vise tarife</Form.Label>
                <Form.Control isInvalid={errors.cenaVT?.message ? true : false}  type='text' name='cenaVT' placeholder='VT Cena' value={ugovor.cenaVT} {...register('cenaVT')}
                onChange={handleInput}></Form.Control>
                <Form.Control.Feedback type='invalid'>
                    {errors.cenaVT?.message}
                </Form.Control.Feedback>
                {/* <p style={{color: errors.cenaVT?.message ? 'red' : ''}}>{errors.cenaVT?.message}</p> */}
            </Form.Group>
            <Form.Group controlId='cenaNT'>
                <Form.Label>Cena nize tarife</Form.Label>
                <Form.Control style={{borderColor: errors.cenaNT?.message ? 'red' : ''}} type='name' name='cenaNT' placeholder='NT Cena' value={ugovor.cenaNT} {...register('cenaNT')}
                onChange={handleInput}></Form.Control>
                <p style={{color: errors.cenaNT?.message ? 'red' : ''}}>{errors.cenaNT?.message}</p>
            </Form.Group>
            <Form.Group controlId='cenaJT'>
                <Form.Label>Cena jedinstvene tarife</Form.Label>
                <Form.Control style={{borderColor: errors.cenaJT?.message ? 'red' : ''}} type='name' name='cenaJT' placeholder='JT Cena' value={ugovor.cenaJT} {...register('cenaJT')}
                onChange={handleInput}></Form.Control>
                <p style={{color: errors.cenaJT?.message ? 'red' : ''}}>{errors.cenaJT?.message}</p>
            </Form.Group>
            <br/>
            <Row>
                <Col xs={3}></Col>
                 <Col xs={3}>
                    <Button type='submit' variant='primary'>
                    Sačuvaj
                    </Button>
                </Col>
               {/* <Col xs={3}>
                    <Button type='submit' variant='primary' onClick={()=>history.push({pathname: `/contracts`})}>
                    Nazad
                    </Button>
                </Col> */}
                <Col xs={3}></Col>
            </Row>
            
            </Form>
            </FormContainer>
            
        </>
        
    )
}

export default NewContractScreen
