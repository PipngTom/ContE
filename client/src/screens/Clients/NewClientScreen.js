import React, {useState, useEffect} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { clientSchema } from '../../validations/clientValidation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { noviKlijent, getSingleClient } from '../../actions/clientActions';
import {GET_SINGLE_CLIENT_RESET} from '../../constants/clientConstants';

//Component for editing and creating new client depending of id
const NewClientScreen = ({match, history}) => {

    const dispatch = useDispatch()

    //Built-in methods from react hook form library for form validation
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
      //resolver connects react-hook-form library with yup library
      resolver: yupResolver(clientSchema)
    })

    //Id is taken from params and indicates whom single client is it 
    const clientId = match.params.id;

    //Selecting a state from reducer for displaying values from reducer in template
    const singleClient = useSelector(state => state.singleClient)

    const {client} = singleClient

    //Setting a local state for new client 
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
          //If client from redux is not yet in reducer then dispatch getSingleClient method to get that single client 
            if(!client || client.id != clientId){
              dispatch(getSingleClient(clientId))
            } else{
              //And if that client is already in reducer then set that values from client reducer to local state with useState hook 
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
            //setValue method helps for updating form to validate form fields all at once 
            setValue('nazivKlijenta', client.nazivBanke)
            setValue('kontaktMail', client.kontaktMail)
            setValue('pib', client.pib)
            setValue('nazivBanke', client.nazivBanke)
            setValue('racunBanka', client.racunBanka)
            }  
        }
        

    },[dispatch, client ,clientId])


    //Handling input values in local state targeting name property and setting with currently value of input field
    const handleInput = (e) => {
        
        setKlijent({...klijent, [e.target.name] : e.target.value})
      }

    //Handling checkbox value in local state targeting name property and setting with checked(there is no property value in check box field )
    const handleCheck = (e) => {
      setCheck({...check, [e.target.name]: e.target.checked ? 1 : 0})
    }

    const submitKlijent = async (data, e) => {
      e.preventDefault()
      //If id exists then noviKlijent() will gonna update single client and if does not exists then noviKlijent() is gonna create new single client
        if(clientId){
            dispatch(noviKlijent({...klijent, ...check}, clientId))
        } else {
            dispatch(noviKlijent({...klijent, ...check}))
        }
        
        //Pushing to All clients component when one method execute
        history.push({pathname: `/clients`})
        //Clearing redux state of single client after pushing to all clients component
        dispatch({type: GET_SINGLE_CLIENT_RESET})

    }

    return (
        <>
        <FormContainer>
          {/* Submiting form with handleSubmit method from useForm */}
        <Form onSubmit={handleSubmit(submitKlijent)} >
  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Naziv klijenta</Form.Label>
      {/* errors and register properties are from useForm hook and isInvalid property is form validation from react bootstrap*/}
      <Form.Control isInvalid={errors.nazivKlijenta?.message ? true : false} type="text" name='nazivKlijenta' value={klijent.nazivKlijenta} {...register('nazivKlijenta')} onChange={handleInput} />
      <Form.Control.Feedback type='invalid'>{errors.nazivKlijenta?.message}</Form.Control.Feedback> 
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Adresa klijenta</Form.Label>
      <Form.Control type="text" name='adresaKlijenta' value={klijent.adresaKlijenta} onChange={handleInput} />
    </Form.Group>
  </Row>
  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridEmail1">
      <Form.Label>Poštanski broj</Form.Label>
      <Form.Control type="text" name='postanskiBroj' value={klijent.postanskiBroj} onChange={handleInput} />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword2">
      <Form.Label>Opština</Form.Label>
      <Form.Control type="text" name='opstina' value={klijent.opstina} onChange={handleInput} />
    </Form.Group>
  </Row>

    <Row className="mb-3">
  <Form.Group controlId="formGridAddress1">
    <Form.Label>Kontakt mail</Form.Label>
    <Form.Control isInvalid={errors.kontaktMail?.message ? true : false} type='email' name='kontaktMail' value={klijent.kontaktMail} {...register('kontaktMail')} onChange={handleInput}/>
    <Form.Control.Feedback type='invalid'>{errors.kontaktMail?.message}</Form.Control.Feedback>
  </Form.Group>

  <Form.Group  controlId="formGridAddress2">
    <Form.Label>Kontakt telefon</Form.Label>
    <Form.Control type='text' name='kontaktTelefon' value={klijent.kontaktTelefon} onChange={handleInput} />
  </Form.Group>
    </Row>
  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>PIB</Form.Label>
      <Form.Control isInvalid={errors.pib?.message ? true : false} type='text' name='pib' value={klijent.pib} {...register('pib')} onChange={handleInput} />
      <Form.Control.Feedback type='invalid'>{errors.pib?.message}</Form.Control.Feedback>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>Glavni PIB ugovora</Form.Label>
      <Form.Control type='text' name='glavniPibUgovora' value={klijent.glavniPibUgovora} onChange={handleInput} />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>Matični broj</Form.Label>
      <Form.Control type='text' name='maticniBroj' value={klijent.maticniBroj} onChange={handleInput} />
    </Form.Group>
  </Row>
  <Row className="mb-3">
  <Form.Group controlId="formGridAddress1">
    <Form.Label>Naziv banke</Form.Label>
    <Form.Control isInvalid={errors.nazivBanke?.message ? true : false} type='text' name='nazivBanke' value={klijent.nazivBanke} {...register('nazivBanke')} onChange={handleInput} />
    <Form.Control.Feedback type='invalid'>{errors.nazivBanke?.message}</Form.Control.Feedback>
  </Form.Group>
      </Row>
      <Row className='mb-3'>
  <Form.Group as={Col} controlId="formGridAddress2">
    <Form.Label>Račun</Form.Label>
    <Form.Control isInvalid={errors.racunBanka?.message ? true : false} type='text' name='racunBanka' value={klijent.racunBanka} {...register('racunBanka')} onChange={handleInput} />
    <Form.Control.Feedback type='invalid'>{errors.racunBanka?.message}</Form.Control.Feedback>
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
    <Form.Check type="checkbox" label="Zbirni račun" name='zbirniRacun' checked={check.zbirniRacun} onChange={handleCheck}  />
  </Form.Group> 
  
    </Row>
    <Row className='mb-3'>
 <Form.Group id="formGridCheckbox" >
    <Form.Check type="checkbox" label="Pod ugovorom" name='podUgovorom' checked={check.podUgovorom} onChange={handleCheck}  />
  </Form.Group> 
  
    </Row>
    <Row className='mb-3'>
    <Form.Group controlId="formGridState">
      <Form.Label>Tip potrosača</Form.Label>
      <Form.Control as='select' name='tipPotrosaca' value={klijent.tipPotrosaca} onChange={handleInput}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </Form.Control>
    </Form.Group>
    </Row> 

    <Row>
                <Col xs={3}></Col>
                <Col xs={3}>
                    <Button type='submit' variant='primary'>
                    Sačuvaj
                    </Button>
                </Col>
                <Col xs={3}>
                    <Button type='submit' variant='primary' onClick={()=> {
                      history.push({pathname: `/clients`})
                      dispatch({type: GET_SINGLE_CLIENT_RESET})
                    }}>
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

export default NewClientScreen
