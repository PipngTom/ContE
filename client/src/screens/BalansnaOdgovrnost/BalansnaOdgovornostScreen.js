import React, {useState, useEffect}  from 'react';
import {Form, Button, Row, Col, Table} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import debounce from 'lodash.debounce';
import { getMeteringByMeterId, getMeteringByMeterIds } from '../../actions/meteringActions';
import {getAllMeters} from '../../actions/meterActions';
import { nadjiTabeluPoKategoriji, nadjiCitavuTabelu, nadjiNazivPoKategoriji, nadjiNazivVrsteSnabdevanja } from '../../constants/brojila';
import {
    generisiProfilPotrosnje,
    izracunajTipMernogMesta,
    getPeriod
} from '../../lib/profilPotrosnje';


const BalansnaOdogovrnostScreen = () => {

    const [searchString, setsearchString] = useState('')
    const [searchStringEdBroj, setsearchStringEdBroj] = useState('')
    const [selectedMeters, setSelectedMeters] = useState([])
    const [newRender, setNewRender] = useState(false)
    const [godina, setGodina] = useState(new Date().getFullYear())
    const [mesec, setMesec] = useState(new Date().getMonth())
    const [selectedAllMeters, setSelectedAllMeters] = useState(false)

    const [profil, setProfil] = useState(null)

    const allMeteringByMeterIds = useSelector(state => state.allMeteringByMeterIds)
    
    const {metering: meteringByAllIds} = allMeteringByMeterIds

    const allMeters = useSelector(state => state.allMeters)
    

    const {loading, error, meters} = allMeters

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllMeters())
        
    }, [dispatch, newRender])

    const handleTypeNazivKlijenta=(e)=>{
        
        setsearchString(e.target.value)  
        setSelectedAllMeters(false) 
      }

      const handleTypeEdBroj=(e)=>{
      //  setSelectedAllMeters(false)
        setsearchStringEdBroj(e.target.value)   
      }

      const checkAllHandler = (e) => {
        if (e.target.checked) {
            setSelectedAllMeters(true)
            let objects = [];
            meters.filter((el)=>(searchString==='' || el.nazivKlijenta.toUpperCase().includes(searchString.toUpperCase()))
            && (searchStringEdBroj==='' || el.mestoMerenja.toUpperCase().includes(searchStringEdBroj.toUpperCase())))
            .map((item)=>{
                const tabela = nadjiTabeluPoKategoriji(item.kategorija)
                objects.push(
                    {
                        id: item.id,
                        tabela: tabela
                    }
                )
                setSelectedMeters([...selectedMeters, ...objects])

            })


        } else {
            setSelectedAllMeters(false)
            setSelectedMeters([])
        }
      }

      const checkHandler = (e, id) => {
          if(e.target.checked){
              const meter  = meters.find((item)=>item.id==id)
              const tabela = nadjiTabeluPoKategoriji(meter.kategorija)
              setSelectedMeters([...selectedMeters, {tabela, id}])
          }else{
            setSelectedMeters([...selectedMeters.filter(item => item.id !== id)])
          }
      }

    // const handleChange = (e) => {
    //     dispatch(getMeteringByMeterIds(selectedMeters))        
    // }

    const generateProfilHandler = () => {
        let arr;
        
            meteringByAllIds.forEach((met, index) => {
                if(met.length!==0){
                    const kat = nadjiCitavuTabelu(met[0].kategorija)
                    console.log(met[0].kategorija)
                    console.log(kat)
                
                 const merenje = {
                    Wnt: met[0].nt,
                    Wvt: met[0].vt,
                    Wm: met[0].jt ? met[0].jt : met[0].nt + met[0].vt,
                    Pmax: met[0].maxsnaga,
                    Kp: kat.kategorija,
                    Kb: kat.obracun,
                    startDate: met[0].datumpoc,
                    endDate: met[0].datumkr,
                } 
                console.log(merenje)
                if(index==0){
                    arr = [...Array(generisiProfilPotrosnje(merenje).length)].map(x=>Array(24).fill(0)) 
                }
                generisiProfilPotrosnje(merenje).forEach((day, d)=>{
                        day.forEach((hour, h)=>{
                            arr[d][h]=(arr[d][h] + hour)
                           
                        })
                })
                }
                
            });
    
            setProfil(arr)
        
       
    }
   

    return (
        <div>
            <h1>Balansna odgovornost</h1>
            <Button type='submit' variant='primary' onClick={generateProfilHandler}>
                    Generisi profil
            </Button>
            <Form>
            <Form.Group controlId='selectedMetering'>
            <Row>
                <Col xs={3}></Col>
                <Col xs={3}>
                <Form.Label>Godina</Form.Label>
                <Form.Control as='select'value={godina}  
                onChange={(e)=>{
                    setGodina(e.target.value)
                    const datum = new Date(e.target.value, mesec, 16).toISOString().slice(0, 10)
                    dispatch(getMeteringByMeterIds(selectedMeters, datum))  
                }}>
                    <option value={2021}>2021</option>
                    <option value={2020}>2020</option>
                </Form.Control>
                </Col>
                <Col xs={3}>
                <Form.Label>Godina</Form.Label>
                <Form.Control as='select' value={mesec} 
                onChange={(e)=>{
                    setMesec(e.target.value)
                    const datum = new Date(godina, e.target.value, 16).toISOString().slice(0, 10)
                    dispatch(getMeteringByMeterIds(selectedMeters, datum))  
                    }}>
                    <option value={0}>JANUAR</option>
                    <option value={1}>FEBRUAR</option>
                    <option value={2}>MART</option>
                    <option value={3}>APRIL</option>
                    <option value={4}>MAJ</option>
                    <option value={5}>JUN</option>
                    <option value={6}>JUL</option>
                    <option value={7}>AVGUST</option>
                    <option value={8}>SEPTEMBAR</option>
                    <option value={9}>OKTOBAR</option>
                    <option value={10}>NOVEMBAR</option>
                    <option value={11}>DECEMBAR</option>
                </Form.Control>
                </Col>
                <Col xs={3}></Col>
            </Row>
                
            </Form.Group>
            </Form>
            
            
            {loading ? (
                <Loader/>
            ) : (<>
                <Table striped bordered hover variante='dark' style={{fontSize:"12px", marginTop: '20px'}}>
                    <thead>
                        <tr>
                            <th>Naziv klijenta</th>
                            <th>Sifra mernog mesta</th>
                            <th>Adresa mernog mesta</th>
                            <th>Kategorija</th>
                            <th>Vrsta snabdevanja</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                            <td>
                            <Form.Control type="text" placeholder="Pretrazi klijenta" onChange={debounce(handleTypeNazivKlijenta, 300)} />
                            </td>
                            <td>
                            <Form.Control type="text" placeholder="Pretrazi ED broj" onChange={debounce(handleTypeEdBroj, 300)} />
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Cekiraj sve" checked={selectedAllMeters}  onChange={checkAllHandler}/>
                                </Form.Group>
                            </td>
                        </tr>
                        {meters.filter((el)=>(searchString==='' || el.nazivKlijenta.toUpperCase().includes(searchString.toUpperCase()))
                        && (searchStringEdBroj==='' || el.mestoMerenja.toUpperCase().includes(searchStringEdBroj.toUpperCase())))
                        .map(item => {
                            return <tr key={item.id}>
                                <td>{item.nazivKlijenta}</td>
                                <td>{item.mestoMerenja}</td>
                                <td>{item.adresaMerenja}</td>
                                <td>{nadjiNazivPoKategoriji(item.kategorija)}</td>
                                <td>{nadjiNazivVrsteSnabdevanja(item.vrstaSnabdevanja)}</td>
                                <td>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" checked={selectedMeters && selectedMeters.find((elem)=>elem.id ==item.id)} label="Cekiraj" onChange={(e)=>checkHandler(e, item.id)}/>
                                </Form.Group>
                                </td>
                            </tr>  
                    })}
                    </tbody>
                </Table>
                </>
            )}
            {profil && <Table striped bordered hover variante='dark' style={{fontSize:"12px", marginTop: '20px'}}>
                    <thead>
                        <tr>
                        <th>#</th>
                        
                            {new Array(24).fill(undefined).map((item,index)=>(
                                <th>{index+1}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {profil.map((dnevniProfil,index)=>(
                            <tr>
                                <td>{index+1}</td>
                                {dnevniProfil.map((satniProfil)=>(
                                <td>{satniProfil.toFixed(3)}</td>
                            ))}
                            </tr>
                        ))}
                                
                    </tbody>
                </Table>}
        </div>
    )
}

export default BalansnaOdogovrnostScreen
