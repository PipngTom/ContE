import { 
    GET_ALL_CONTRACTS_REQUEST, GET_ALL_CONTRACTS_SUCCESS, GET_ALL_CONTRACTS_FAIL, ALL_CONTRACTS_UPDATE,
    CONTRACT_SAVE_REQUEST, CONTRACT_SAVE_SUCCESS, CONTRACT_SAVE_FAIL,
    GET_SINGLE_CONTRACT_REQUEST, GET_SINGLE_CONTRACT_SUCCESS, GET_SINGLE_CONTRACT_FAIL, CONTRACT_DELETE_REQUEST, CONTRACT_DELETE_FAIL} from '../constants/contractConstants';
import axios from 'axios';

export const getAllContracts= () => async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_CONTRACTS_REQUEST
      })

      const { data } = await axios.get('/api/contracts') 
  
      dispatch({
        type: GET_ALL_CONTRACTS_SUCCESS,
        payload: data
      })
  
    } catch (error) {
      dispatch({
        type: GET_ALL_CONTRACTS_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      })
    }
  }

  export const noviUgovor = (ugovor, id = 0) => async (dispatch) => {
    console.log(ugovor)
    try {
        let contract
        contract = id ? {...ugovor, id} : {...ugovor}

      dispatch({
        type: CONTRACT_SAVE_REQUEST
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
  
      const { data } = await axios.post('/api/contracts/new', contract, config) 
  
      dispatch({
        type: CONTRACT_SAVE_SUCCESS,
        payload: data
      })
  
    } catch (error) {
      dispatch({
        type: CONTRACT_SAVE_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      })
    }
  }

  export const getSingleContract= (id) => async (dispatch) => {
    try {
      dispatch({
        type: GET_SINGLE_CONTRACT_REQUEST
      })

      const { data } = await axios.get(`/api/contracts/${id}`) 
  
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

export const getSingleContractByMeterId= (meterId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SINGLE_CONTRACT_REQUEST
    })

    const { data } = await axios.get((`/api/fakture/${meterId}`)) 

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

export const deleteSingleContract = (id) => async (dispatch) => {
  try {
      dispatch({
          type: CONTRACT_DELETE_REQUEST
        })
        
  const { data } = await axios.delete(`/api/contracts/${id}`) 
  console.log(data)
  if(data.message===''){
      dispatch({
          type: ALL_CONTRACTS_UPDATE,
          payload: id
        })
  }         

  } catch (error) {
    dispatch({
      type: CONTRACT_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }

}