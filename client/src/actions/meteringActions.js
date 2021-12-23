import { 
    METERING_SAVE_REQUEST, METERING_SAVE_SUCCESS, METERING_SAVE_FAIL,
    GET_ALL_METERING_BY_METERID_REQUEST, GET_ALL_METERING_BY_METERID_SUCCESS, GET_ALL_METERING_BY_METERID_FAIL, GET_ALL_METERING_BY_METERID_UPDATE,
    METERING_DELETE_REQUEST, METERING_DELETE_FAIL, GET_METERING_BY_METER_IDS_REQUEST, 
    GET_METERING_BY_METER_IDS_SUCCESS, GET_METERING_BY_METER_IDS_FAIL, FAKTURA_METERING_REQUEST, FAKTURA_METERING_SUCCESS, FAKTURA_METERING_FAIL,
     PREUZIMANJE_MERENJA_REQUEST, PREUZIMANJE_MERENJA_SUCCESS, PREUZIMANJE_MERENJA_FAIL} from '../constants/meteringConstants';

import axios from 'axios';


export const newMetering = (fields, meterId, tabela, id = 0) => async (dispatch, getState) => {
    try {
        let metering
        metering = id ? { tabela, colone:{...fields}, meterId, id} : {tabela, colone:{...fields}, meterId}

      dispatch({
        type: METERING_SAVE_REQUEST
      })

      const { 
        userLogin: { userInfo }
       } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
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

  
  export const getMeteringByMeterId = (id, tabela) => async (dispatch, getState) => {
      const dataToSend = {id, tabela}
    try {
      dispatch({
        type: GET_ALL_METERING_BY_METERID_REQUEST
      })


      const {
        userLogin: { userInfo }
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
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
        payload: error
      })
    }
  }

  export const getMeteringByMeterIds = (selectedMeters, datum) => async (dispatch, getState) => {
    const dataToSend = {selectedMeters, datum}
    
  try {
    dispatch({
      type: GET_METERING_BY_METER_IDS_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
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

export const getFakturaMetering = (rezultatN, mesec, godina) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FAKTURA_METERING_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

   const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
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

export const savePreuzimanjeMerenja = (merenje) => async (dispatch) => {

  console.log(merenje)
  const obj = {merenje: merenje}
  try {
      dispatch({
        type: PREUZIMANJE_MERENJA_REQUEST
      })

    //   const {
    //     userLogin: { userInfo }
    //   } = getState()
  
     const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const { data } = await axios.post('/api/metering/preuzimanje', obj, config)

      dispatch({
        type: PREUZIMANJE_MERENJA_SUCCESS,
        payload: data
      })

  } catch (error) {
    dispatch({
      type: PREUZIMANJE_MERENJA_FAIL,
      payload: error
    })
  }
}

  export const deleteSingleMetering = (id, tabela) => async (dispatch, getState) => {

    const dataToSend = {id, tabela}
    try {
        dispatch({
            type: METERING_DELETE_REQUEST
          })

          const {
            userLogin: { userInfo }
          } = getState()

          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
              'Content-Type': 'application/json'
            }
          }
          
    const { data } = await axios.post(`/api/metering/delete`, dataToSend, config) 
    
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