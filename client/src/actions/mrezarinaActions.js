import { GET_MREZARINA_REQUEST, GET_MREZARINA_SUCCESS, GET_MREZARINA_FAIL, GET_MREZARINA_RESET, MREZARINA_UPDATE_REQUEST, MREZARINA_UPDATE_SUCCESS, MREZARINA_UPDATE_FAIL, GET_ALL_MREZARINA_REQUEST, GET_ALL_MREZARINA_FAIL, GET_ALL_MREZARINA_SUCCESS, NEW_MREZARINA_REQUEST, NEW_MREZARINA_FAIL, NEW_MREZARINA_SUCCESS } from '../constants/mrezarinaConstants';
import axios from 'axios';

export const getAllMrezarina = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_MREZARINA_REQUEST
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      }
    }

    const {data} = await axios.get('/api/mrezarina', config)
 
    dispatch({
      type: GET_ALL_MREZARINA_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: GET_ALL_MREZARINA_FAIL,
      payload: error
    })
  }
}

export const getMrezarina= (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_MREZARINA_REQUEST
      })

      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        }
      }

      const { data } = await axios.get(`/api/mrezarina/${id}`, config) 
  
      dispatch({
        type: GET_MREZARINA_SUCCESS,
        payload: data[0]
      })
  
    } catch (error) {
      dispatch({
        type: GET_MREZARINA_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      })
    }
}

export const getMrezarinaPoDatumu = (datum) => async (dispatch, getState) => {
  try {
    dispatch({type: GET_MREZARINA_REQUEST})

    const {
      userLogin: { userInfo },
    } = getState()

    
    const {data} = await axios.get('/api/mrezarina/faktura/podatumu', {params : {datum: datum}, headers: {Authorization: `Bearer ${userInfo.token}`}})
    
    dispatch({
      type: GET_MREZARINA_SUCCESS,
      payload: data[0]
    })
  } catch (err) {
    dispatch({
      type: GET_MREZARINA_FAIL,
      payload: err
    })
  }
}

export const updateMrezarina = (mrezarina, id) => async (dispatch) => {
    try {
      

      dispatch({
        type: MREZARINA_UPDATE_REQUEST
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
  
      const { data } = await axios.post('/api/mrezarina/update', {mrezarina: mrezarina, idpret: id}, config) 
      
      if(data.affectedRows==1){
        dispatch({
            type: GET_MREZARINA_RESET
          })
    } 
  
      dispatch({
        type: MREZARINA_UPDATE_SUCCESS,
        payload: data
      })
  
    } catch (error) {
      dispatch({
        type: MREZARINA_UPDATE_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      })
    }
  }

  export const saveNewMrezarina = (mrezarina, idZadnje) => async (dispatch) => {

      const pack = {...mrezarina, idZadnje}
      dispatch({
        type: NEW_MREZARINA_REQUEST
      })

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const { data } = await axios.post('/api/mrezarina/new', pack, config)
      

      if (data.affectedRows != 0) {
        dispatch({
          type: NEW_MREZARINA_SUCCESS,
          payload: data[0]
        })
      } else {
        dispatch({
          type: NEW_MREZARINA_FAIL,
          payload: 'Mrezarina vec postoji za taj datum'
        })
      }
    
  }