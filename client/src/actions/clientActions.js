import { CLIENT_SAVE_REQUEST, CLIENT_SAVE_SUCCESS, CLIENT_SAVE_FAIL, 
    GET_ALL_CLIENTS_REQUEST, GET_ALL_CLIENTS_SUCCESS, GET_ALL_CLIENTS_FAIL, ALL_CLIENTS_UPDATE,
    GET_SINGLE_CLIENT_REQUEST, GET_SINGLE_CLIENT_SUCCESS, GET_SINGLE_CLIENT_FAIL, CLIENT_DELETE_REQUEST } from '../constants/clientConstants';
import axios from 'axios';

export const noviKlijent = (klijent, id = 0) => async (dispatch, getState) => {
    try {
        let client
        client = id ? {...klijent, id} : {...klijent}

      dispatch({
        type: CLIENT_SAVE_REQUEST
      })

      const {
        userLogin: { userInfo }
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json',
          
        }
      }
  
      const { data } = await axios.post('/api/clients/new', client, config) 
  
      dispatch({
        type: CLIENT_SAVE_SUCCESS,
        payload: data
      })
  
    } catch (error) {
      dispatch({
        type: CLIENT_SAVE_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      })
    }
  }

  export const getAllClients= () => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_ALL_CLIENTS_REQUEST
      })

      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        }
      }

      const { data } = await axios.get('/api/clients', config) 
  
      dispatch({
        type: GET_ALL_CLIENTS_SUCCESS,
        payload: data
      })
  
    } catch (error) {
      dispatch({
        type: GET_ALL_CLIENTS_FAIL,
        payload: error
      })
    }
  }

  export const getSingleClient= (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_SINGLE_CLIENT_REQUEST
      })

      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        }
      }

      const { data } = await axios.get(`/api/clients/${id}`, config) 
  
      dispatch({
        type: GET_SINGLE_CLIENT_SUCCESS,
        payload: data[0]
      })
  
    } catch (error) {
      dispatch({
        type: GET_SINGLE_CLIENT_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      })
    }
}

export const getSingleClientByMeterId = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_SINGLE_CLIENT_REQUEST
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      }
    }

    const { data } = await axios.get(`/api/clients/meterid/${id}`, config) 

    dispatch({
      type: GET_SINGLE_CLIENT_SUCCESS,
      payload: data[0]
    })

  } catch (error) {
    dispatch({
      type: GET_SINGLE_CLIENT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

    export const deleteSingleClient = (id) => async (dispatch) => {
        try {
            dispatch({
                type: CLIENT_DELETE_REQUEST
              })
              
        const { data } = await axios.delete(`/api/clients/${id}`) 
      
        if(data.message === ''){
            dispatch({
                type: ALL_CLIENTS_UPDATE,
                payload: id
              })
        }         
      
        } catch (error) {
          dispatch({
            type: GET_SINGLE_CLIENT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
          })
        }

  }