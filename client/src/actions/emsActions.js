import { SAVE_PODACI_ZA_EMS_REQUEST, 
        SAVE_PODACI_ZA_EMS_SUCCESS, 
        SAVE_PODACI_ZA_EMS_FAIL, 
        GET_ALL_PODACI_ZA_EMS_REQUEST, 
        GET_ALL_PODACI_ZA_EMS_SUCCESS, 
        GET_ALL_PODACI_ZA_EMS_FAIL, 
        GET_SINGLE_EMS_REQUEST, 
        GET_SINGLE_EMS_SUCCESS, 
        GET_SINGLE_EMS_FAIL,
        UPDATE_PODACI_ZA_EMS_SUCCESS } from '../constants/emsConstants';
import axios from 'axios';

export const getAllPodatkeZaEms = () => async (dispatch, getState) => {
    try {

        dispatch({type: GET_ALL_PODACI_ZA_EMS_REQUEST})

        const {
            userLogin: { userInfo },
          } = getState()
      
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            }
          }

        const { data } = await axios.get('/api/ems', config)

        dispatch({
            type: GET_ALL_PODACI_ZA_EMS_SUCCESS,
            payload: data
        })

    } catch (err) {
        dispatch({
            type: GET_ALL_PODACI_ZA_EMS_FAIL,
            payload: err
        })
    }
}

export const getSinglePodatakEms = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: GET_SINGLE_EMS_REQUEST})

        const {
            userLogin: { userInfo },
          } = getState()
      
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            }
          }

        const { data } = await axios.get(`/api/ems/single/${id}`, config)
        
        dispatch({
            type: GET_SINGLE_EMS_SUCCESS,
            payload: data[0]
        })
    } catch (err) {
        dispatch({
            type: GET_SINGLE_EMS_FAIL,
            payload: err
        })
    }
}

export const snimiPodatkeZaEms = (podaci, dan, mesec, godina, id = 0) => async (dispatch) => {
    try {
        const pack = {...podaci, dan, mesec, godina, id}
        
        dispatch({
            type: SAVE_PODACI_ZA_EMS_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',

            }
        }

        const { data } = await axios.post('/api/ems/new', pack, config)

        if(data[0].affectedRows == 1) {
            if (id == 0) {
                dispatch({
                    type: SAVE_PODACI_ZA_EMS_SUCCESS,
                    payload: 'Uspesno ste kreirali nov EMS'
                })

            } else {
                dispatch({
                    type: UPDATE_PODACI_ZA_EMS_SUCCESS,
                    payload: 'Uspesno ste azurirali podatke za EMS'
                })
            }
        } else {
            dispatch({
                type: SAVE_PODACI_ZA_EMS_FAIL,
                payload: 'Doslo je do greske na serveru'
            })
        }
        

    } catch (error) {
        dispatch({
            type: SAVE_PODACI_ZA_EMS_FAIL,
            payload: error
        })
    }
}