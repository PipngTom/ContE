import { 
    GET_ALL_METERS_REQUEST, GET_ALL_METERS_SUCCESS, GET_ALL_METERS_FAIL, ALL_METERS_UPDATE, GET_ALL_METERS_BY_CLIENT_ID_REQUEST, GET_ALL_METERS_BY_CLIENT_ID_SUCCESS, GET_ALL_METERS_BY_CLIENT_ID_FAIL,
    METER_SAVE_REQUEST, METER_SAVE_SUCCESS, METER_SAVE_FAIL,
    GET_SINGLE_METER_REQUEST, GET_SINGLE_METER_SUCCESS, GET_SINGLE_METER_FAIL, METER_DELETE_REQUEST, METER_DELETE_FAIL} from '../constants/meterConstants';
import axios from 'axios';

export const getAllMeters= () => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_ALL_METERS_REQUEST
      })

      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        }
      }

      const { data } = await axios.get('/api/meters', config) 
  
      dispatch({
        type: GET_ALL_METERS_SUCCESS,
        payload: data
      })
  
    } catch (error) {
      dispatch({
        type: GET_ALL_METERS_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      })
    }
  }

  export const getAllMetersByClientId = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_ALL_METERS_BY_CLIENT_ID_REQUEST
      })

      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        }
      }

      const { data } = await axios.get(`/api/meters/racuni/${id}`, config)
     
      dispatch({
        type: GET_ALL_METERS_BY_CLIENT_ID_SUCCESS,
        payload: data
      })

    } catch (error) {
      console.log('greska koju smo uhvatili', error)
      dispatch({
        type: GET_ALL_METERS_BY_CLIENT_ID_FAIL,
        payload: error
      })
    }
  }

  export const novoBrojilo = (brojilo, id = 0) => async (dispatch) => {
    try {
        let meter
        meter = id ? {...brojilo, id} : {...brojilo}

      dispatch({
        type: METER_SAVE_REQUEST
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
  
      const { data } = await axios.post('/api/meters/new', meter, config) 
  
      dispatch({
        type: METER_SAVE_SUCCESS,
        payload: data
      })
  
    } catch (error) {
      dispatch({
        type: METER_SAVE_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      })
    }
  }

  export const getSingleMeter= (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_SINGLE_METER_REQUEST
      })

      const {
        userLogin: { userInfo }
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        }
      }

      const { data } = await axios.get(`/api/meters/${id}`, config) 
  
      dispatch({
        type: GET_SINGLE_METER_SUCCESS,
        payload: data[0]
      })
  
    } catch (error) {
      dispatch({
        type: GET_SINGLE_METER_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      })
    }
}

export const deleteSingleMeter = (id) => async (dispatch) => {
  try {
      dispatch({
          type: METER_DELETE_REQUEST
        })
        
  const { data } = await axios.delete(`/api/meters/${id}`) 
  console.log(data)
  if(data.message===''){
      dispatch({
          type: ALL_METERS_UPDATE,
          payload: id
        })
  }         

  } catch (error) {
    dispatch({
      type: METER_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }

}