import { GET_MREZARINA_REQUEST, GET_MREZARINA_SUCCESS, GET_MREZARINA_FAIL, GET_MREZARINA_RESET, MREZARINA_UPDATE_REQUEST, MREZARINA_UPDATE_SUCCESS, MREZARINA_UPDATE_FAIL } from '../constants/mrezarinaConstants';
import axios from 'axios';

export const getMrezarina= () => async (dispatch, getState) => {
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

      const { data } = await axios.get(`/api/mrezarina`, config) 
  
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

export const updateMrezarina = (mrezarina) => async (dispatch) => {
    try {
      

      dispatch({
        type: MREZARINA_UPDATE_REQUEST
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
  
      const { data } = await axios.post('/api/mrezarina', mrezarina, config) 
      console.log(data)
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