import React, {useState, useEffect} from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import FormContainer from '../../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { noviUgovor, getSingleContract } from '../../actions/contractActions';
import {kategorija, vrsteSnabdevanja} from '../../constants/brojila'


const NewContractScreen = ({match, history}) => {

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
            }  
        }
        console.log('initial render for NEW MODE')
        

    },[dispatch, contract, contractId])

    const handleInput = (e) => {
        
        setUgovor({...ugovor, [e.target.name] : e.target.value})
      }

    const submitUgovor = () => {
        if(contractId){
            dispatch(noviUgovor(ugovor, contractId))
        } else {
            dispatch(noviUgovor(ugovor))
        }
        
        history.push({pathname: `/contracts`})

    }

    return (
        <>
        <div>   
            <h2>Ugovor</h2>
        </div>
        <FormContainer>
            <Form>
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
                <Form.Control type='name' name='cenaVT' placeholder='VT Cena' value={ugovor.cenaVT}
                onChange={handleInput}></Form.Control>
            </Form.Group>
            <Form.Group controlId='cenaNT'>
                <Form.Label>Cena nize tarife</Form.Label>
                <Form.Control type='name' name='cenaNT' placeholder='NT Cena' value={ugovor.cenaNT}
                onChange={handleInput}></Form.Control>
            </Form.Group>
            <Form.Group controlId='cenaJT'>
                <Form.Label>Cena jedinstvene tarife</Form.Label>
                <Form.Control type='name' name='cenaJT' placeholder='JT Cena' value={ugovor.cenaJT}
                onChange={handleInput}></Form.Control>
            </Form.Group>
            <br/>
            
            
            </Form>
            </FormContainer>
            <Row>
                <Col xs={3}></Col>
                <Col xs={3}>
                    <Button type='submit' variant='primary' onClick={submitUgovor}>
                    Sačuvaj
                    </Button>
                </Col>
                <Col xs={3}>
                    <Button type='submit' variant='primary' onClick={()=>history.push({pathname: `/contracts`})}>
                    Nazad
                    </Button>
                </Col>
                <Col xs={3}></Col>
            </Row>
        </>
        
    )
}

export default NewContractScreen
