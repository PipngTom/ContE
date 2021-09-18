import React, {useState, useEffect} from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import FormContainer from '../../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { newMetering } from '../../actions/meteringActions';
import { getSingleMeter } from '../../actions/meterActions';
import {kategorija, vrsteSnabdevanja} from '../../constants/brojila'

const NewMeteringScreen = ({match, history}) => {

    const dispatch = useDispatch()

    const [fields, setFields] = useState({datumpoc:'', datumkr: ''})

    const meteringId = match.params.id;
    
    const singleMeter = useSelector(state => state.singleMeter)
    const {loading, error, meter} = singleMeter
    const {kategorija: sifraKategorijeBrojila, mestoMerenja, nazivKlijenta, id: idBrojila} = meter

    const allMeteringByMeterId = useSelector(state => state.allMeteringByMeterId)
    const {metering} = allMeteringByMeterId

    //meters.find((item)=> item.id == meterId)

    useEffect(() => {

        if(meteringId){
            const temp = metering.find((item)=>item.id == meteringId)
            if(temp) {
                temp.datumpoc = temp.datumpoc.slice(0,10)
                temp.datumkr = temp.datumkr.slice(0,10)
            }
            setFields(temp)
        } else {

        }
        //dispatch(getSingleMeter(meterId))
   /*      if(meterId)//EDIT MODE
        {
            if(!meter || meter.id != meterId){
                dispatch(getSingleMeter(meterId))
                console.log('EDIT MODE need to dispatch getSingleClient')
            } else{
                
            }  
        }
        console.log('initial render for NEW MODE') */
        

    },[dispatch])

    const handleInput = (e) => {
        const copy = {...fields}
        copy[e.target.name] = e.target.value
        setFields(copy)
    }

    const submitUnos = () => {
        const tabela = kategorija.find((el)=>el.sifra == sifraKategorijeBrojila).tabela
          if(meteringId){
            dispatch(newMetering(fields, idBrojila, tabela,  meteringId))
        } else {
            dispatch(newMetering(fields, idBrojila, tabela))
        }  
        history.push({pathname: `/allmetering/${idBrojila}`})

    }

    
    return (
        <div>
            <h2>ED broj: {mestoMerenja}</h2>
            <FormContainer>
            <Form>
            <Form.Group controlId='Datum poč stanja'>
                <Form.Label>Datum početnog stanja</Form.Label>
                <Form.Control type='date'  name='datumpoc' placeholder='Datum početnog stanja' value={fields['datumpoc']}
                onChange={handleInput}></Form.Control>
            </Form.Group>
            temp<Form.Group controlId='Datum kraj stanja'>
                <Form.Label>Datum krajnjeg stanja</Form.Label>
                <Form.Control type='date' name='datumkr' placeholder='Datum krajnjeg stanja' value={fields['datumkr']}
                onChange={handleInput}></Form.Control>
            </Form.Group>
            
            {sifraKategorijeBrojila && kategorija.find((item)=>item.sifra==sifraKategorijeBrojila).stavke.map((stavka, index)=>(
                <Form.Group key={index} controlId='nazivKlijenta'>
                    <Form.Label>{stavka.naziv}</Form.Label>
                    <Form.Control type='name' name={stavka.kolona} placeholder={stavka.naziv} value={fields[stavka.kolona]}
                    onChange={handleInput}></Form.Control>
                </Form.Group>
            ))}
            </Form>
            </FormContainer>
            <Row>
                <Col xs={3}></Col>
                <Col xs={3}>
                    <Button type='submit' variant='primary' onClick={submitUnos}>
                    Sačuvaj
                    </Button>
                </Col>
                <Col xs={3}>
                    <Button type='submit' variant='primary' onClick={()=>history.push({pathname: `/allmetering/${idBrojila}`})}>
                    Nazad
                    </Button>
                </Col>
                <Col xs={3}></Col>
            </Row>

        </div>
    )
}

export default NewMeteringScreen
