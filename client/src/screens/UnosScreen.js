import React, { useState } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { unosiRacuna } from '../actions/userActions';

const UnosRacunaScreen = () => {

  const dispatch = useDispatch()

  const [maxSnaga, setMaxSnaga] = useState('');
  const [odSnaga, setOdSnaga] = useState('');
  const [prekSnaga, setPrekSnaga] = useState('');
  const [akEnergijaV, setAkEnergijaV] = useState('');
  const [akEnergijaN, setAkEnergijaN] = useState('');
  const [reaktEnergija, setReaktEnergija] = useState('');
  const [prekReaktEnergija, setPrekReaktEnergija] = useState('');
  const [datumpStanja, setDatumpStanja] = useState('');
  const [datumkStanja, setDatumkStanja] = useState('');


  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(unosiRacuna(maxSnaga, odSnaga, prekSnaga, akEnergijaV, akEnergijaN, reaktEnergija, prekReaktEnergija, datumpStanja, datumkStanja))
  }

  return (
    <FormContainer>
    <h1>Unos računa</h1>
    <Form onSubmit={submitHandler}>
    <Form.Group controlId='max snaga'>
        <Form.Label>Mesečna max snaga (kW)</Form.Label>
        <Form.Control type='name' placeholder='Max snaga' value={maxSnaga}
        onChange={(e) => setMaxSnaga(e.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group controlId='od snaga'>
        <Form.Label>Odobrena snaga</Form.Label>
        <Form.Control type='name' placeholder='Odobrena snaga' value={odSnaga}
        onChange={(e) => setOdSnaga(e.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group controlId='prek snaga'>
        <Form.Label>Prekomerna snaga</Form.Label>
        <Form.Control type='name' placeholder='Prekomerna snaga' value={prekSnaga}
        onChange={(e) => setPrekSnaga(e.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group controlId='akt energija vt'>
        <Form.Label>Aktivna energija VT (kWh)</Form.Label>
        <Form.Control type='name' placeholder='Visoka tarifa' value={akEnergijaV}
        onChange={(e) => setAkEnergijaV(e.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group controlId='akt energija nt'>
        <Form.Label>Aktivna energija NT (KWh)</Form.Label>
        <Form.Control type='name' placeholder='Niska tarifa' value={akEnergijaN}
        onChange={(e) => setAkEnergijaN(e.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group controlId='reakt energija'>
        <Form.Label>Reaktivna energija(kVArh)</Form.Label>
        <Form.Control type='name' placeholder='Reaktivna energija' value={reaktEnergija}
        onChange={(e) => setReaktEnergija(e.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group controlId='prek reak energija'>
        <Form.Label>Prekomerna reaktivna energija (kVArh)</Form.Label>
        <Form.Control type='name' placeholder='Prekomerna reakt. energija' value={prekReaktEnergija}
        onChange={(e) => setPrekReaktEnergija(e.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group controlId='Datum poč stanja'>
        <Form.Label>Datum početnog stanja</Form.Label>
        <Form.Control type='date' placeholder='Datum početnog stanja' value={datumpStanja}
        onChange={(e) => setDatumpStanja(e.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group controlId='Datum kraj stanja'>
        <Form.Label>Datum krajnjeg stanja</Form.Label>
        <Form.Control type='date' placeholder='Datum krajnjeg stanja' value={datumkStanja}
        onChange={(e) => setDatumkStanja(e.target.value)}></Form.Control>
      </Form.Group>
      <Button type='submit' variant='primary'>
        Sačuvaj
      </Button>
      </Form>
    </FormContainer>
  )
}

export default UnosRacunaScreen;
