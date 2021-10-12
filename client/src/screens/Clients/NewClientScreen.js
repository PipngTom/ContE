import React, {useState, useEffect} from 'react'
import {Form, Button, Row, Col, Select} from 'react-bootstrap'
import FormContainer from '../../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { noviKlijent, getSingleClient } from '../../actions/clientActions';
import {GET_SINGLE_CLIENT_RESET} from '../../constants/clientConstants'


const NewClientScreen = ({match, history}) => {

    const dispatch = useDispatch()

    const clientId = match.params.id;

    const singleClient = useSelector(state => state.singleClient)

    const {loading, error, client} = singleClient

    const [klijent, setKlijent] = useState({
        nazivKlijenta: '',
        adresaKlijenta: '',
        postanskiBroj: '',
        opstina: '',
        kontaktMail: '',
        kontaktTelefon: '',
        pib: '',
        glavniPibUgovora: '',
        maticniBroj: '',
        nazivBanke: '',
        racunBanka: '',
        pdv: '',
        odgovornoLice: '',
        kontaktOsoba: '',
        sajt: '',
        tipPotrosaca: ''

    })

    const [check, setCheck] = useState({
      firma: false,
      balansOdg: false,
      zbirniRacun: false,
      podUgovorom: false
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
                postanskiBroj: client.postanskiBroj,
                opstina: client.opstina,
                kontaktMail: client.kontaktMail,
                kontaktTelefon: client.kontaktTelefon,
                pib: client.pib,
                glavniPibUgovora: client.glavniPibUgovora,
                maticniBroj: client.maticniBroj,
                nazivBanke: client.nazivBanke,
                racunBanka: client.racunBanka,
                pdv: client.pdv,
                odgovornoLice: client.odgovornoLice,
                kontaktOsoba: client.kontaktOsoba,
                tipPotrosaca: client.tipPotrosaca,
                sajt: client.sajt
            
            })
            setCheck({...check,
            firma: client.firma,
            balansOdg: client.uBalansnojOdgovornosti,
            zbirniRacun: client.zbirniRacun,
            podUgovorom: client.podUgovorom})
            }  
        }
        console.log('initial render for NEW MODE')
        

    },[dispatch, client, clientId])

    const handleInput = (e) => {
        
        setKlijent({...klijent, [e.target.name] : e.target.value})
      }

    const handleCheck = (e) => {
      setCheck({...check, [e.target.name]: e.target.checked ? 1 : 0})
    }

    const submitKlijent = () => {
        if(clientId){
            dispatch(noviKlijent({...klijent, ...check}, clientId))
        } else {
            dispatch(noviKlijent({...klijent, ...check}))
        }
        dispatch({type: GET_SINGLE_CLIENT_RESET})
        
        history.push({pathname: `/clients`})

    }

    return (
        <>
        <FormContainer>
        <Form>
  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Naziv klijenta</Form.Label>
      <Form.Control type="text" name='nazivKlijenta' value={klijent.nazivKlijenta} onChange={handleInput} />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Adresa klijenta</Form.Label>
      <Form.Control type="text" name='adresaKlijenta' value={klijent.adresaKlijenta} onChange={handleInput} />
    </Form.Group>
  </Row>
  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridEmail1">
      <Form.Label>Postanski broj</Form.Label>
      <Form.Control type="text" name='postanskiBroj' value={klijent.postanskiBroj} onChange={handleInput} />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword2">
      <Form.Label>Opstina</Form.Label>
      <Form.Control type="text" name='opstina' value={klijent.opstina} onChange={handleInput} />
    </Form.Group>
  </Row>

    <Row className="mb-3">
  <Form.Group controlId="formGridAddress1">
    <Form.Label>Kontakt mail</Form.Label>
    <Form.Control type='email' name='kontaktMail' value={klijent.kontaktMail} onChange={handleInput}/>
  </Form.Group>

  <Form.Group  controlId="formGridAddress2">
    <Form.Label>Kontakt telefon</Form.Label>
    <Form.Control type='text' name='kontaktTelefon' value={klijent.kontaktTelefon} onChange={handleInput} />
  </Form.Group>
    </Row>
  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>PIB</Form.Label>
      <Form.Control type='text' name='pib' value={klijent.pib} onChange={handleInput} />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>Glavni PIB ugovora</Form.Label>
      <Form.Control type='text' name='glavniPibUgovora' value={klijent.glavniPibUgovora} onChange={handleInput} />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>Maticni broj</Form.Label>
      <Form.Control type='text' name='maticniBroj' value={klijent.maticniBroj} onChange={handleInput} />
    </Form.Group>
  </Row>
  <Row className="mb-3">
  <Form.Group controlId="formGridAddress1">
    <Form.Label>Naziv banke</Form.Label>
    <Form.Control type='text' name='nazivBanke' value={klijent.nazivBanke} onChange={handleInput} />
  </Form.Group>
      </Row>
      <Row className='mb-3'>
  <Form.Group as={Col} controlId="formGridAddress2">
    <Form.Label>Racun</Form.Label>
    <Form.Control type='text' name='racunBanka' value={klijent.racunBanka} onChange={handleInput} />
  </Form.Group>

  <Form.Group as={Col} controlId="formGridAddress2">
    <Form.Label>PDV</Form.Label>
    <Form.Control type='text' name='pdv' value={klijent.pdv} onChange={handleInput} />
  </Form.Group>
    </Row>

    <Row className="mb-3">
  <Form.Group as={Col} controlId="formGridAddress1">
    <Form.Label>Odgovorno lice</Form.Label>
    <Form.Control type='text' name='odgovornoLice' value={klijent.odgovornoLice} onChange={handleInput} />
  </Form.Group>

  <Form.Group as={Col} controlId="formGridAddress2">
    <Form.Label>Kontakt osoba</Form.Label>
    <Form.Control type='text' name='kontaktOsoba' value={klijent.kontaktOsoba} onChange={handleInput} />
  </Form.Group>
    </Row>

    <Row className="mb-3">
  <Form.Group as={Col} controlId="formGridAddress1">
    <Form.Label>Sajt</Form.Label>
    <Form.Control type='text' name='sajt' value={klijent.sajt} onChange={handleInput} />
  </Form.Group>
  </Row>
  <Row className='mb-3'>
 <Form.Group id="formGridCheckbox" >
    <Form.Check type="checkbox" label="Firma" name='firma' checked={check.firma} onChange={handleCheck}  />
  </Form.Group> 
  
    </Row>
    <Row className='mb-3'>
 <Form.Group id="formGridCheckbox" >
    <Form.Check type="checkbox" label="Balansno odgovoran" name='balansOdg' checked={check.balansOdg} onChange={handleCheck}  />
  </Form.Group> 
  
    </Row>
    <Row className='mb-3'>
 <Form.Group id="formGridCheckbox" >
    <Form.Check type="checkbox" label="Zbirni racun" name='zbirniRacun' checked={check.zbirniRacun} onChange={handleCheck}  />
  </Form.Group> 
  
    </Row>
    <Row className='mb-3'>
 <Form.Group id="formGridCheckbox" >
    <Form.Check type="checkbox" label="Pod ugovorom" name='podUgovorom' checked={check.podUgovorom} onChange={handleCheck}  />
  </Form.Group> 
  
    </Row>
    <Row className='mb-3'>
    <Form.Group controlId="formGridState">
      <Form.Label>Tip potrosaca</Form.Label>
      <Form.Control as='select' name='tipPotrosaca' value={klijent.tipPotrosaca} onChange={handleInput}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </Form.Control>
    </Form.Group>
    </Row> 


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
