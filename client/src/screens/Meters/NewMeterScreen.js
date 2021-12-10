import React, {useState, useEffect} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { novoBrojilo, getSingleMeter } from '../../actions/meterActions';
import { celaKategorija, celaVrstaSnabdevanja } from '../../constants/brojila';



const NewMeterScreen = ({match, history}) => {

    const dispatch = useDispatch()

    const meterId = match.params.id;

    const singleMeter = useSelector(state => state.singleMeter)
    const allClients = useSelector(state => state.allClients)
    const {loading: loadingClients, error: errorClients, clients} = allClients

    const {loading, error, meter} = singleMeter

    const [brojilo, setBrojilo] = useState({
        idKlijent: '',
        mestoMerenja: '',
        adresaMerenja: '',
        kategorija: '',
        vrstaSnabdevanja: ''
    })

    const [taksa, setTaksa] = useState(false)


    useEffect(() => {
        if(meterId)//EDIT MODE
        {
            if(!meter || meter.id != meterId){
                dispatch(getSingleMeter(meterId))
            } else{
                setBrojilo({...brojilo,
                idKlijent: meter.idKlijent,
                mestoMerenja: meter.mestoMerenja,
                adresaMerenja: meter.adresaMerenja,
                kategorija: meter.kategorija,
                vrstaSnabdevanja: meter.vrstaSnabdevanja
            })
            setTaksa(meter.taksa)
            }  
        }
        
        

    },[dispatch, meter, meterId])

    const handleInput = (e) => {
        
        setBrojilo({...brojilo, [e.target.name] : e.target.value})
      }

    const handleCheck = (e) => {
        setTaksa(e.target.checked)
    }

    const submitBrojilo = () => {
        if(meterId){
            dispatch(novoBrojilo({brojilo, taksa}, meterId))
        } else {
            dispatch(novoBrojilo({brojilo, taksa}))
        }
        
        history.push({pathname: `/meters`})

    }

    return (
        <>
        <div>   
            <h2>Brojilo</h2>
        </div>
        <FormContainer>
            <Form>
            <Form.Group controlId='nazivKlijenta'>
                <Form.Label>Naziv klijenta</Form.Label>
                <Form.Control as='select' name='idKlijent' value={brojilo.idKlijent}
                onChange={handleInput}>
                    <option value={0}>Izaberi klijenta</option>
                    {clients && clients.map((item)=>(
                        <option value={item.id}>{item.nazivKlijenta}</option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='mestoMerenja'>
                <Form.Label>Šifra mernog mesta</Form.Label>
                <Form.Control type='name' name='mestoMerenja' placeholder='Sifra mernog mesta' value={brojilo.mestoMerenja}
                onChange={handleInput}></Form.Control>
            </Form.Group>
            <Form.Group controlId='adresaMerenja'>
                <Form.Label>Adresa mernog mesta</Form.Label>
                <Form.Control type='name' name='adresaMerenja' placeholder='Adresa mernog mesta' value={brojilo.adresaMerenja}
                onChange={handleInput}></Form.Control>
            </Form.Group>
            <Form.Group controlId='kategorija'>
                <Form.Label>Kategorija</Form.Label>
                <Form.Control as='select' name='kategorija' value={brojilo.kategorija}
                onChange={handleInput}>
                    <option value={0}>Izaberi kategoriju</option>
                    {celaKategorija().map((item) => (
                         <option value={item.sifra}>{item.naziv}</option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='vrstaSnabdevanja'>
                <Form.Label>Vrsta snabdevanja</Form.Label>
                <Form.Control as='select' name='vrstaSnabdevanja' value={brojilo.vrstaSnabdevanja}
                onChange={handleInput}>
                    <option value={0}>Izaberi vrstu snabdevanja</option>
                    {celaVrstaSnabdevanja().map(item => (
                        <option value={item.sifra}>{item.naziv}</option>
                    ))}
                </Form.Control>
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Check type='checkbox' label='Taksa za javni medijski servis' checked={taksa} onChange={handleCheck} ></Form.Check>
            </Form.Group>
            <br/>
            
            
            </Form>
            </FormContainer>
            <Row>
                <Col xs={3}></Col>
                <Col xs={3}>
                    <Button type='submit' variant='primary' onClick={submitBrojilo}>
                    Sačuvaj
                    </Button>
                </Col>
                <Col xs={3}>
                    <Button type='submit' variant='primary' onClick={()=>history.push({pathname: `/meters`})}>
                    Nazad
                    </Button>
                </Col>
                <Col xs={3}></Col>
            </Row>
        </>
        
    )
}

export default NewMeterScreen
