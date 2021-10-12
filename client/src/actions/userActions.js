import {USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT, UNOS_REQUEST, UNOS_SUCCESS, UNOS_FAIL } from '../constants/userConstants';
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    })
    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    }

    const {data} = await axios.post('/api/users/login', {email, password}, config)

    const userInfo = {
      name: data.data[0].name,
      id: data.data[0].id,
      token: data.token
    }

    localStorage.setItem('userInfo', JSON.stringify(userInfo))

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: userInfo
    })
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const { data } = await axios.post('/api/users', {name, email, password}, config)
    console.log(data)
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    })
  } catch (error) {
     dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message

    }) 
  }
}

export const unosiRacuna = (maxSnaga, odSnaga, prekSnaga, akEnergijaV, akEnergijaN, reaktEnergija, prekReaktEnergija, datumpStanja, datumkStanja) => async (dispatch) => {
  try {
    dispatch({
      type: UNOS_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.post('/api/users/unosi', {maxSnaga, odSnaga, prekSnaga, akEnergijaV, akEnergijaN, reaktEnergija, prekReaktEnergija, datumpStanja, datumkStanja}, config) 

    dispatch({
      type: UNOS_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: UNOS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({
    type: USER_LOGOUT
  })
}