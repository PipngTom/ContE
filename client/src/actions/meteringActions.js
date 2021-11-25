import { 
    METERING_SAVE_REQUEST, METERING_SAVE_SUCCESS, METERING_SAVE_FAIL,
    GET_ALL_METERING_BY_METERID_REQUEST, GET_ALL_METERING_BY_METERID_SUCCESS, GET_ALL_METERING_BY_METERID_FAIL, GET_ALL_METERING_BY_METERID_UPDATE,
    METERING_DELETE_REQUEST, METERING_DELETE_FAIL, GET_METERING_BY_METER_IDS_REQUEST, 
    GET_METERING_BY_METER_IDS_SUCCESS, GET_METERING_BY_METER_IDS_FAIL, FAKTURA_METERING_REQUEST, FAKTURA_METERING_SUCCESS, FAKTURA_METERING_FAIL } from '../constants/meteringConstants';

import axios from 'axios';


export const newMetering = (fields, meterId, tabela, id = 0) => async (dispatch) => {
    try {
        let metering
        metering = id ? { tabela, colone:{...fields}, meterId, id} : {tabela, colone:{...fields}, meterId}

      dispatch({
        type: METERING_SAVE_REQUEST
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
  
      const { data } = await axios.post('/api/metering/new', metering, config) 
      
      if (data.err) {
        dispatch({
          type: METERING_SAVE_FAIL,
          payload: data.err
        })
      } else {
        dispatch({
          type: METERING_SAVE_SUCCESS,
          payload: data
        })
      }
      
  
    } catch (error) {
      console.log(error)
      
    }
  }

  
  export const getMeteringByMeterId = (id, tabela) => async (dispatch) => {
      const dataToSend = {id, tabela}
    try {
      dispatch({
        type: GET_ALL_METERING_BY_METERID_REQUEST
      })

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const { data } = await axios.post(`/api/metering`, dataToSend, config) 
  
      dispatch({
        type: GET_ALL_METERING_BY_METERID_SUCCESS,
        payload: data
      })
  
    } catch (error) {
      dispatch({
        type: GET_ALL_METERING_BY_METERID_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      })
    }
  }

  export const getMeteringByMeterIds = (selectedMeters, datum) => async (dispatch) => {
    const dataToSend = {selectedMeters, datum}
    
  try {
    dispatch({
      type: GET_METERING_BY_METER_IDS_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.post(`/api/metering/all`,dataToSend, config) 

    dispatch({
      type: GET_METERING_BY_METER_IDS_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: GET_METERING_BY_METER_IDS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const getFakturaMetering = (rezultatN, mesec, godina) => async (dispatch) => {
  try {
    dispatch({
      type: FAKTURA_METERING_REQUEST
    })

   const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.post('/api/metering/fakturametering', {rezultatN, mesec, godina}, config)

    dispatch({
      type: FAKTURA_METERING_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: METERING_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

  export const deleteSingleMetering = (id, tabela) => async (dispatch) => {

    const dataToSend = {id, tabela}
    try {
        dispatch({
            type: METERING_DELETE_REQUEST
          })
          const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          }
          
    const { data } = await axios.post(`/api/metering/delete`, dataToSend, config) 
    console.log(data)
    if(data.message===''){
        dispatch({
            type: GET_ALL_METERING_BY_METERID_UPDATE,
            payload: id
          })
    }         
  
    } catch (error) {
      dispatch({
        type: METERING_DELETE_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      })
    }
  
  }