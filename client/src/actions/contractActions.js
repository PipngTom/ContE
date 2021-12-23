import { 
    GET_ALL_CONTRACTS_REQUEST, GET_ALL_CONTRACTS_SUCCESS, GET_ALL_CONTRACTS_FAIL, ALL_CONTRACTS_UPDATE,
    CONTRACT_SAVE_REQUEST, CONTRACT_SAVE_SUCCESS, CONTRACT_SAVE_FAIL,
    GET_SINGLE_CONTRACT_REQUEST, GET_SINGLE_CONTRACT_SUCCESS, GET_SINGLE_CONTRACT_FAIL, GET_SINGLE_CONTRACT_BY_CLIENT_ID_REQUEST, GET_SINGLE_CONTRACT_BY_CLIENT_ID_SUCCESS, GET_SINGLE_CONTRACT_BY_CLIENT_ID_FAIL, CONTRACT_DELETE_REQUEST, CONTRACT_DELETE_FAIL} from '../constants/contractConstants';
import axios from 'axios';

//Getting all contracts action
export const getAllContracts= () => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_ALL_CONTRACTS_REQUEST
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

      //Targeting path and route on backend and recieving all contracts (stored in data const) from db
      const { data } = await axios.get('/api/contracts', config) 
  
      dispatch({
        type: GET_ALL_CONTRACTS_SUCCESS,
        payload: data
      })
  
    } catch (error) {
      dispatch({
        type: GET_ALL_CONTRACTS_FAIL,
        payload: error
      })
    }
  }

  //Creating new or updating existing contract action
  export const noviUgovor = (ugovor, id = 0) => async (dispatch, getState) => {
    
    /*Ternary operator for questioning whether there is id or not, if id exists, update contract action will gonna be called,
         if id does not exists create new contract will gonna be called */
        let contract
        contract = id ? {...ugovor, id} : {...ugovor}

        
      dispatch({
        type: CONTRACT_SAVE_REQUEST
      })

      //Taking token from initial state from store.js
      const {
        userLogin: { userInfo },
      } = getState()
  
      //Setting token to request body and sending token to backend middleware action
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json'
        }
      }
  
      //Targeting path and route on backend and sending values from frontend
      const { data } = await axios.post('/api/contracts/new', contract, config) 

      //Contract must be agree on different dates, it can not be two contracts for same date 
      if (data.affectedRows !== 0) {
        dispatch({
          type: CONTRACT_SAVE_SUCCESS,
          payload: data
        })
      } else {
        dispatch({
          type: CONTRACT_SAVE_FAIL,
          payload: 'Ugovor za taj datum je vec skopljen...'
        })
      }
  
  }

  //Getting single contract action with unique id
  export const getSingleContract= (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_SINGLE_CONTRACT_REQUEST
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

      //Targeting path and route on backend and recieving single contract (stored in data const) from db
      const { data } = await axios.get(`/api/contracts/${id}`, config) 
  
      dispatch({
        type: GET_SINGLE_CONTRACT_SUCCESS,
        payload: data[0]
      })
  
    } catch (error) {
      dispatch({
        type: GET_SINGLE_CONTRACT_FAIL,
        payload: error
      })
    }
}

export const getSingleContractByMeterId= (meterId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SINGLE_CONTRACT_REQUEST
    })


    const { data } = await axios.get(`/api/fakture/${meterId}`) 

    dispatch({
      type: GET_SINGLE_CONTRACT_SUCCESS,
      payload: data[0]
    })

  } catch (error) {
    dispatch({
      type: GET_SINGLE_CONTRACT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

//Getting single contract by single client
export const getSingleContractByClientId = (clientId, datum) => async (dispatch, getState) => {
    try {
    dispatch({
      type: GET_SINGLE_CONTRACT_BY_CLIENT_ID_REQUEST
    })

    //Taking token from initial state from store.js
    const {
      userLogin: { userInfo }
    } = getState()

    //Setting token to request body and sending token to backend middleware action
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json'
      }
    }

    //Targeting path and route on backend and sending values from frontend for faktura
    const {data}  = await axios.post(`/api/contracts/ugovorklijent`, {clientId, datum}, config)
    
    dispatch({
      type: GET_SINGLE_CONTRACT_BY_CLIENT_ID_SUCCESS,
      payload: data[0]
    })
  } catch (error) {
    dispatch({
      type: GET_SINGLE_CONTRACT_BY_CLIENT_ID_FAIL,
      payload: error
    })
  }
}

//Deleting single client with unique id from params action
export const deleteSingleContract = (id) => async (dispatch, getState) => {
  try {
      dispatch({
          type: CONTRACT_DELETE_REQUEST
        })

        //Taking token from initial state from store.js
        const {
          userLogin: { userInfo }
        } = getState()
    
        //Setting token to request body and sending token to backend middleware action
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            'Content-Type': 'application/json'
          }
        }
        
        //Targeting path with unique id and route on backend and deleting single client from db
  const { data } = await axios.delete(`/api/contracts/${id}`, config) 
  
  //Updating all clients without deleted client
  if(data.message===''){
      dispatch({
          type: ALL_CONTRACTS_UPDATE,
          payload: id
        })
  }         

  } catch (error) {
    dispatch({
      type: CONTRACT_DELETE_FAIL,
      payload: error
    })
  }

}