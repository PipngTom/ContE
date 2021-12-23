import { CLIENT_SAVE_REQUEST, CLIENT_SAVE_SUCCESS, CLIENT_SAVE_FAIL, 
    GET_ALL_CLIENTS_REQUEST, GET_ALL_CLIENTS_SUCCESS, GET_ALL_CLIENTS_FAIL, ALL_CLIENTS_UPDATE,
    GET_SINGLE_CLIENT_REQUEST, GET_SINGLE_CLIENT_SUCCESS, GET_SINGLE_CLIENT_FAIL, CLIENT_DELETE_REQUEST } from '../constants/clientConstants';
import axios from 'axios';

//Creating new or updating existing client action
export const noviKlijent = (klijent, id = 0) => async (dispatch, getState) => {
    try {
        /*Ternary operator for questioning whether there is id or not, if id exists, update client action will gonna be called,
         if id does not exists create new client will gonna be called */
        let client
        client = id ? {...klijent, id} : {...klijent}

      dispatch({
        type: CLIENT_SAVE_REQUEST
      })

      //Taking token from initial state from store.js  
      const {
        userLogin: { userInfo }
      } = getState()
  
      //Setting token to request body and sending token to backend middleware action
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json',
          
        }
      }
  
      //Targeting path and route on backend and sending values from frontend
      const { data } = await axios.post('/api/clients/new', client, config) 
  
      dispatch({
        type: CLIENT_SAVE_SUCCESS,
        payload: data
      })
  
    } catch (error) {
      dispatch({
        type: CLIENT_SAVE_FAIL,
        payload: error
      })
    }
  }

  //Getting all clients action
  export const getAllClients= () => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_ALL_CLIENTS_REQUEST
      })

      //Taking token from initial state from store.js 
      const {
        userLogin: { userInfo },
      } = getState()
  
       //Setting token to request body and sending token to backend middleware action
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        }
      }

      //Targeting path and route on backend and recieving all clients (stored in data const) from db
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

  //Getting single client with unique id from fontend action
  export const getSingleClient= (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_SINGLE_CLIENT_REQUEST
      })

      //Taking token from initial state from store.js 
      const {
        userLogin: { userInfo },
      } = getState()
  
      //Setting token to request body and sending token to backend middleware action
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        }
      }

      //Targeting path with unique id in params and route on backend and recieving single client (stored in data const) from db
      const { data } = await axios.get(`/api/clients/${id}`, config) 
  
      dispatch({
        type: GET_SINGLE_CLIENT_SUCCESS,
        payload: data[0]
      })
  
    } catch (error) {
      dispatch({
        type: GET_SINGLE_CLIENT_FAIL,
        payload: error
      })
    }
}

//Getting single client by unique meter id action 
export const getSingleClientByMeterId = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_SINGLE_CLIENT_REQUEST
    })

    //Taking token from initial state from store.js 
    const {
      userLogin: { userInfo },
    } = getState()

    //Setting token to request body and sending token to backend middleware action
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      }
    }

    //Targeting path with unique meter id in params and route on backend and recieving single client (stored in data const) from db
    const { data } = await axios.get(`/api/clients/meterid/${id}`, config) 

    dispatch({
      type: GET_SINGLE_CLIENT_SUCCESS,
      payload: data[0]
    })

  } catch (error) {
    dispatch({
      type: GET_SINGLE_CLIENT_FAIL,
      payload: error
    })
  }
}

//Deleting single client with unique id from params action
    export const deleteSingleClient = (id) => async (dispatch, getState) => {
     
        try {
            dispatch({
                type: CLIENT_DELETE_REQUEST
              })
              
              //Taking token from initial state from store.js 
          const { userLogin: { userInfo } } = getState()

          //Setting token to request body and sending token to backend middleware action
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`
            }
          }

          //Targeting path with unique id and route on backend and deleting single client from db
        const { data } = await axios.delete(`/api/clients/${id}`, config) 
      
        //Updating all clients without deleted client
        if(data.message === ''){
            dispatch({
                type: ALL_CLIENTS_UPDATE,
                payload: id
              })
        }         
      
        } catch (error) {
          dispatch({
            type: GET_SINGLE_CLIENT_FAIL,
            payload: error
          })
        }

  }