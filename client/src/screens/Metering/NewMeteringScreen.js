import React, {useState, useEffect} from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import FormContainer from '../../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { newMetering } from '../../actions/meteringActions';
import { nadjiTabeluPoKategoriji, nadjiStavkePoSifri } from '../../constants/brojila';
import { nadjiPocetakObracuna, nadjiKrajObracuna, transformDatum, nadjiNazivMeseca } from '../../constants/datum';
import { meteringSchema1, meteringSchema2, meteringSchema3 } from '../../validations/meteringValidations';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";




const NewMeteringScreen = ({match, history}) => {

    

    const dispatch = useDispatch()

    const [fields, setFields] = useState({mesec: new Date().getMonth(), godina: new Date().getFullYear()})


    const meteringId = match.params.id;
    
    const singleMeter = useSelector(state => state.singleMeter)

    const meteringInfo = useSelector(state => state.metering)

    const {error: meteringError, info } = meteringInfo

    const {loading, error, meter} = singleMeter

    const {kategorija: sifraKategorijeBrojila, mestoMerenja, nazivKlijenta, id: idBrojila} = meter

    let schema;
    if (sifraKategorijeBrojila == 6 || sifraKategorijeBrojila == 3) {
       schema = meteringSchema2
    } 
    if (sifraKategorijeBrojila == 1 || sifraKategorijeBrojila == 2)
    {
        schema = meteringSchema1
    }
    if (sifraKategorijeBrojila == 4)
    {
        schema = meteringSchema3
    }
    const { register, handleSubmit, formState: { errors }, setValue } = useForm(
        {
       resolver: yupResolver(schema)
    } 
   )
    

    const allMeteringByMeterId = useSelector(state => state.allMeteringByMeterId)
    const {metering} = allMeteringByMeterId


    useEffect(() => {
        

        if(meteringId){
            const temp = metering.find((item)=> item.id == meteringId)
            
             setFields(temp)
             if (sifraKategorijeBrojila == 1 || sifraKategorijeBrojila == 2) {
                setValue('vt', temp.vt)
                 setValue('nt', temp.nt)
                 setValue('reak', temp.reak)
                 setValue('prereak', temp.prereak)
                 setValue('odosnaga', temp.odosnaga)
                 setValue('prekosnaga', temp.prekosnaga)
                 setValue('maxsnaga', temp.maxsnaga)
                 
             }
             if (sifraKategorijeBrojila == 4) {
                setValue('jt', temp.jt)
                setValue('odosnaga', temp.odosnaga)
             }
             if (sifraKategorijeBrojila == 6 || sifraKategorijeBrojila == 3) {
                 setValue('vt', temp.vt)
                 setValue('nt', temp.nt)
                 setValue('odosnaga', temp.odosnaga)
             }
        } else {
                       

        }
        if(info){
            history.push({pathname: `/allmetering/${idBrojila}`}) 
        }
            
        

    },[dispatch, meteringError, info])

    const handleInput = (e) => {
        const copy = {...fields}
        if(e.target.name == 'mesec'){
            let godina = Number(fields['godina'])
            if (e.target.value == 11) {
                godina = godina + 1
            }
            copy['datumpoc'] = nadjiPocetakObracuna(e.target.value) + fields['godina']
            copy['datumkr'] = nadjiKrajObracuna(e.target.value) + godina
        }

        if(e.target.name == 'godina'){
            let godina = Number(e.target.value)
           if (fields['mesec'] == 11) {
                godina = godina + 1
           }
            copy['datumpoc'] = nadjiPocetakObracuna(fields['mesec']) + e.target.value
            copy['datumkr'] = nadjiKrajObracuna(fields['mesec']) + godina

        }
        copy[e.target.name] = e.target.value
        setFields(copy)
    }

    const submitUnos = async (data, e) => {

        e.preventDefault()
        const polja = {...fields, datumpoc: transformDatum(fields['datumpoc']), datumkr: transformDatum(fields['datumkr']) }
    
        const tabela = nadjiTabeluPoKategoriji(sifraKategorijeBrojila)
          if(meteringId){
            dispatch(newMetering(polja, idBrojila, tabela,  meteringId))
        } else {
            dispatch(newMetering(polja, idBrojila, tabela))
        }
        
        

    }

    
    return (
        <div>
            <h2>ED broj: {mestoMerenja}</h2>
            <h2>{meteringError && 'Uneli ste vec merenje za ovu godinu i mesec'}</h2>
            <FormContainer>
            <Form onSubmit={handleSubmit(submitUnos)}>
            <h6>Period obračuna:{'  '}{fields['datumpoc']}{'  -  '}{fields['datumkr']}</h6>
            <Row>
                <Col xs={6}>
                    <h5>Mesec</h5>
                    <Form.Group controlId='pocetakObracuna'>
                        <Form.Control as='select' name='mesec' value={fields['mesec']} onChange={handleInput} >
                            <option value={0}>Januar</option>
                            <option value={1}>Februar</option>
                            <option value={2}>Mart</option>
                            <option value={3}>April</option>
                            <option value={4}>Maj</option>
                            <option value={5}>Jun</option>
                            <option value={6}>Jul</option>
                            <option value={7}>Avgust</option>
                            <option value={8}>Septembar</option>
                            <option value={9}>Oktobar</option>
                            <option value={10}>Novembar</option>
                            <option value={11}>Decembar</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col xs={6}>
                    <h5>Godina</h5>
                    <Form.Group controlId='krajObracuna'>
                        <Form.Control as='select' name='godina' value={fields['godina']} onChange={handleInput} >
                            <option value={2021}>2021</option>
                            <option value={2020}>2020</option>
                            <option value={2019}>2019</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <br/>
            {sifraKategorijeBrojila && nadjiStavkePoSifri(sifraKategorijeBrojila).map((stavka, index) => (
                <Form.Group key={index} controlId='nazivKlijenta'>
                    <Form.Label>{stavka.naziv}</Form.Label>
                    <Form.Control isInvalid={errors[stavka.kolona]?.message ? true : false} type='name' name={stavka.kolona} placeholder={stavka.naziv} value={fields[stavka.kolona]} {...register(stavka.kolona)}
                    onChange={handleInput}></Form.Control>
                    <Form.Control.Feedback type='invalid'>{errors[stavka.kolona]?.message}</Form.Control.Feedback>
                </Form.Group>
            ))}
             <br/>
            <br/>
            <Row>
                <Col xs={3}></Col>
                <Col xs={3}>
                    <Button type='submit' variant='primary' size='lg'>
                    Sačuvaj
                    </Button>
                </Col>
                <Col xs={3}>
                    <Button type='submit' variant='primary' size='lg' onClick={()=>history.push({pathname: `/allmetering/${idBrojila}`})}>
                    Nazad
                    </Button>
                </Col>
                <Col xs={3}></Col>
            </Row>
            </Form>
            </FormContainer>
            

        </div>
    )
}

export default NewMeteringScreen
