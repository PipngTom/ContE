import React, {useState, useEffect} from 'react'
import {Form, Button, Row, Col, Modal} from 'react-bootstrap'
import FormContainer from '../../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { noviUgovor, getSingleContract } from '../../actions/contractActions';
import { ugovorSchema } from '../../validations/ugovorValidation';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { GET_SINGLE_CONTRACT_RESET, GET_ALL_CONTRACTS_RESET} from '../../constants/contractConstants';


const NewContractScreen = ({match, history}) => {
    const [showModal, setShowModal] = useState(false)

    const { register, handleSubmit, formState: { errors }, setValue   } = useForm(
        {
       resolver: yupResolver(ugovorSchema)
   } 
   )  
    const dispatch = useDispatch()

    const contractId = match.params.id;

    const singleContract = useSelector(state => state.singleContract)
    const {loading, error, contract} = singleContract

    const allClients = useSelector(state => state.allClients)
    const {loading: loadingClients, error: errorClients, clients} = allClients

    const savedContract = useSelector(state => state.savedContract)
    const { error: savedContractError } = savedContract

    

    const [ugovor, setUgovor] = useState({
        idKlijent: '',
        brojUgovora: '',
        datumSklapanja: '',
        datumIsteka: '',
        cenaVT: '',
        cenaNT: '',
        cenaJT: ''
    })

    useEffect(() => {
        
        if(contractId)//EDIT MODE
        {
            if(!contract || contract.id != contractId){
                dispatch(getSingleContract(contractId))
            } else{
                setUgovor({...ugovor,
                idKlijent: contract.idKlijent,
                brojUgovora: contract.brojUgovora,
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
        
       
        

    },[dispatch, contract, contractId, savedContractError])

    const handleInput = (e) => {
    
        setUgovor({...ugovor, [e.target.name] : e.target.value})
      }

    const submitUgovor = async (data, e) => {
        e.preventDefault()
        
         if(contractId){
            dispatch(noviUgovor(ugovor, contractId))
        } else {
            dispatch(noviUgovor(ugovor))
        }
        dispatch({type: GET_SINGLE_CONTRACT_RESET})
        //dispatch({type: GET_ALL_CONTRACTS_RESET})
        setShowModal(true)
      //      history.push({pathname: `/contracts`})
    
        

    }

    const handleDeleteClose = () => {
        if(!savedContractError){
            history.push({pathname: `/contracts`})
        }
        setShowModal(false)
    }
  

    return (
        <>
        <div>   
            <h2>Ugovor</h2>
            
        </div>
        <Modal
                show={showModal}
                onHide={handleDeleteClose}
            >
                <Modal.Header>
                    <Modal.Title>Obaveštenje</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {savedContractError ? savedContractError : 'Uspesno ste kreirali nov ugovor'}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success' onClick={handleDeleteClose}>U redu</Button>
                </Modal.Footer>

            </Modal>
        <FormContainer>
            <Form onSubmit={handleSubmit(submitUgovor)}>
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
            <Form.Group controlId='brojUgovora'>
                <Form.Label>Broj ugovora</Form.Label>
                <Form.Control type='text' name='brojUgovora' value={ugovor.brojUgovora} placeholder='Broj ugovora'
                onChange={handleInput}>
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
                <Form.Label>Cena više tarife</Form.Label>
                <Form.Control isInvalid={errors.cenaVT?.message ? true : false}  type='text' name='cenaVT' placeholder='VT Cena' value={ugovor.cenaVT} {...register('cenaVT')}
                onChange={handleInput}></Form.Control>
                <Form.Control.Feedback type='invalid'>
                    {errors.cenaVT?.message}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='cenaNT'>
                <Form.Label>Cena niže tarife</Form.Label>
                <Form.Control isInvalid={errors.cenaNT?.message ? true : false} type='text' name='cenaNT' placeholder='NT Cena' value={ugovor.cenaNT} {...register('cenaNT')}
                onChange={handleInput}></Form.Control>
                 <Form.Control.Feedback type='invalid'>
                    {errors.cenaNT?.message}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='cenaJT'>
                <Form.Label>Cena jedinstvene tarife</Form.Label>
                <Form.Control isInvalid={errors.cenaJT?.message ? true : false} type='text' name='cenaJT' placeholder='JT Cena' value={ugovor.cenaJT} {...register('cenaJT')}
                onChange={handleInput}></Form.Control>
                 <Form.Control.Feedback type='invalid'>
                    {errors.cenaJT?.message}
                </Form.Control.Feedback>
            </Form.Group>
            <br/>
            <Row>
                 <Col xs={3}>
                    <Button type='submit' variant='outline-primary'>
                    Sačuvaj
                    </Button>
                </Col>
               <Col xs={3}>
                    <Button type='submit' variant='outline-primary' onClick={()=>history.push({pathname: `/contracts`})}>
                    Nazad
                    </Button>
                </Col>
                <Col xs={3}></Col>
            </Row>
            
            </Form>
            </FormContainer>
            
        </>
        
    )
}

export default NewContractScreen
