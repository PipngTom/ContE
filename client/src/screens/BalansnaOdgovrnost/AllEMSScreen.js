import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table, Button, Nav } from 'react-bootstrap';
import { getAllPodatkeZaEms } from '../../actions/emsActions';
import Loader from '../../components/Loader';
import { GET_ALL_PODACI_ZA_EMS_RESET, GET_SINGLE_EMS_RESET } from '../../constants/emsConstants';

const AllEMSScreen = ({ history }) => {

    const dispatch = useDispatch()

    const allEms = useSelector(state => state.allEms)
    const { loading, sviPodaci } = allEms

    useEffect(() => {
        dispatch(getAllPodatkeZaEms())
        return () => {
            dispatch({type: GET_ALL_PODACI_ZA_EMS_RESET})
            //dispatch({type: GET_SINGLE_EMS_RESET})
        }
    }, [dispatch])

    const newHandler = () => {
        history.push('/ems/new')
    }

    const editHandler = (id) => {
        history.push(`/ems/detalji/${id}`)
    }

    const deleteHandler = (id) => {
        console.log(id)
    }

    return (
        <>
            {loading ? <Loader/> : (<>
                  <h3>Pregled podataka poslatih EMS</h3>
                  <br/>
                  <Button type='button' variant='primary' size='lg' onClick={newHandler} >Dnevni unos podataka za EMS</Button>
                  <br/>
                  <br/>
                  <Table striped bordered hover variante='dark' >
                      <thead>
                          <tr>
                              <th>Redni br.</th>
                              <th>Dan</th>
                              <th>Mesec</th>
                              <th>Godina</th>
                              <th>Izmeni</th>
                              <th>Izbriši</th>
                          </tr>
                      </thead>
                      <tbody>
                          {sviPodaci && sviPodaci.sort((a, b) => {
                              if ((b.godina - a.godina) > 0) {
                                  return 1
                              } else if ((b.godina - a.godina) < 0) {
                                return -1
                              } else {
                                  if ((b.mesec - a.mesec) > 0 ) {
                                      return 1
                                  } else if ((b.mesec - a.mesec) < 0) {
                                      return -1
                                  } else {
                                      if ((b.dan - a.dan) > 0) {
                                          return 1
                                      } else {
                                          return -1
                                      }
                                  }
                                  }
                              }).map(item => (
                              <tr key={item.id}>
                                  <td>{item.id}</td>
                                  <td>{item.dan}</td>
                                  <td>{item.mesec}</td>
                                  <td>{item.godina}</td>
                                  <td>
                                      <Nav.Link onClick={() => editHandler(item.id)} >Detalji</Nav.Link>
                                  </td>
                                  <td>
                                      <Nav.Link onClick={() => deleteHandler(item.id)}>Izbriši</Nav.Link>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </Table>
                  </>
            )}
        </>
    )
}

export default AllEMSScreen
