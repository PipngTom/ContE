import React, {useState, useEffect} from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { noviKlijent, getSingleClient } from '../actions/clientActions';


const NewClientScreen = ({match, history}) => {

    const dispatch = useDispatch()

    const clientId = match.params.id;

    const singleClient = useSelector(state => state.singleClient)

    const {loading, error, client} = singleClient

    const [klijent, setKlijent] = useState({
        nazivKlijenta: '',
        adresaKlijenta: '',
        kontaktMail: '',
        kontaktTelefon: '',
        pib: '',
        maticniBroj: '',
        nazivBanke: '',
        racunBanka: ''

    })

    useEffect(() => {
        if(clientId)//EDIT MODE
        {
            if(!client || client.id != clientId){
                dispatch(getSingleClient(clientId))
                console.log('EDIT MODE need to dispatch getSingleClient')
            } else{
                setKlijent({...klijent,
                nazivKlijenta: client.nazivKlijenta,
                adresaKlijenta: client.adresaKlijenta,
                kontaktMail: client.kontaktMail,
                kontaktTelefon: client.kontaktTelefon,
                pib: client.pib,
                maticniBroj: client.maticniBroj,
                nazivBanke: client.nazivBanke,
                racunBanka: client.racunBanka
            
            })
            }  
        }
        console.log('initial render for NEW MODE')
        

    },[dispatch, client, clientId])

    const handleInput = (e) => {
        
        setKlijent({...klijent, [e.target.name] : e.target.value})
      }

    const submitKlijent = () => {
        if(clientId){
            dispatch(noviKlijent(klijent, clientId))
        } else {
            dispatch(noviKlijent(klijent))
        }
        
        history.push({pathname: `/clients`})

    }

    return (
        <>
        <div>   
            <h1>Client screen</h1>
        </div>
        <FormContainer>
            <Form>
            <Form.Group controlId='nazivKlijenta'>
                <Form.Label>Naziv klijenta</Form.Label>
                <Form.Control type='name' name='nazivKlijenta' placeholder='Naziv klijenta' value={klijent.nazivKlijenta}
                onChange={handleInput}></Form.Control>
            </Form.Group>
            <Form.Group controlId='adresaKlijenta'>
                <Form.Label>Adresa klijenta</Form.Label>
                <Form.Control type='name' name='adresaKlijenta' placeholder='Adresa klijenta' value={klijent.adresaKlijenta}
                onChange={handleInput}></Form.Control>
            </Form.Group>
            <Form.Group controlId='kontaktMail'>
                <Form.Label>Kontakt mail</Form.Label>
                <Form.Control type='name' name='kontaktMail' placeholder='Kontakt mail' value={klijent.kontaktMail}
                onChange={handleInput}></Form.Control>
            </Form.Group>
            <Form.Group controlId='kontaktTelefon'>
                <Form.Label>Kontakt telefon</Form.Label>
                <Form.Control type='name' name='kontaktTelefon' placeholder='Kontakt telefon' value={klijent.kontaktTelefon}
                onChange={handleInput}></Form.Control>
            </Form.Group>
            <Form.Group controlId='pib'>
                <Form.Label>PIB</Form.Label>
                <Form.Control type='name' name='pib' placeholder='Niska tarifa' value={klijent.pib}
                onChange={handleInput}></Form.Control>
            </Form.Group>
            <Form.Group controlId='maticniBroj'>
                <Form.Label>Maticni broj</Form.Label>
                <Form.Control type='name' name='maticniBroj' placeholder='Maticni broj' value={klijent.maticniBroj}
                onChange={handleInput}></Form.Control>
            </Form.Group>
            <Form.Group controlId='nazivBanke'>
                <Form.Label>Banka</Form.Label>
                <Form.Control type='name' name='nazivBanke' placeholder='Banka' value={klijent.nazivBanke}
                onChange={handleInput}></Form.Control>
            </Form.Group>
            <Form.Group controlId='racunBanka'>
                <Form.Label>Racun u banci</Form.Label>
                <Form.Control type='name' name='racunBanka' placeholder='Racun u banci' value={klijent.racunBanka}
                onChange={handleInput}></Form.Control>
            </Form.Group>
            <br/>
            
            
            </Form>
            </FormContainer>
            <Row>
                <Col xs={3}></Col>
                <Col xs={3}>
                    <Button type='submit' variant='primary' onClick={submitKlijent}>
                    Sačuvaj
                    </Button>
                </Col>
                <Col xs={3}>
                    <Button type='submit' variant='primary' onClick={()=>history.push({pathname: `/clients`})}>
                    Nazad
                    </Button>
                </Col>
                <Col xs={3}></Col>
            </Row>
        </>
        
    )
}

export default NewClientScreen
