import { GET_KURS_EURA_REQUEST, 
        GET_KURS_EURA_SUCCESS, 
        GET_KURS_EURA_RESET,
        GET_KURS_EURA_FAIL, 
        SAVE_EURO_REQUEST, 
        SAVE_EURO_SUCCESS, 
        SAVE_EURO_FAIL, 
        GET_ALL_KURS_EURA_REQUEST, 
        GET_ALL_KURS_EURA_SUCCESS, 
        GET_ALL_KURS_EURA_FAIL,
        } from '../constants/kursEuraConstants';
import axios from 'axios';

export const getAllEuro = () => async (dispatch, getState) => {
    try {
        dispatch({type: GET_ALL_KURS_EURA_REQUEST})

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get('/api/kursevra', config)

        dispatch({
            type: GET_ALL_KURS_EURA_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: GET_ALL_KURS_EURA_FAIL,
            payload: err
        })
    }
}

export const getKursEura = (id) => async (dispatch, getState) => {
        try {
        dispatch({
            type: GET_KURS_EURA_REQUEST
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/kursevra/${id}`, config)

        dispatch({
            type: GET_KURS_EURA_SUCCESS,
            payload: data[0]
        })

    } catch (err) {
        dispatch({
            type: GET_KURS_EURA_FAIL,
            payload: err
        })
    }
}

export const snimiEuro = (datum, euro, id = 0) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SAVE_EURO_REQUEST
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

        const { data } = await axios.post('/api/kursevra/new', {datum, euro, id}, config)

        dispatch({
            type: SAVE_EURO_SUCCESS,
            payload: data[0]
        })
    } catch (err) {
        dispatch({
            type: SAVE_EURO_FAIL,
            payload: err
        })
    }
}

export const kursEura = (datum) => async (dispatch) => {
    try {
        dispatch({
            type: GET_KURS_EURA_REQUEST
        })

        const { data } = await axios.get('/api/kursevra/nbs/kurs', {params: {datum: datum}})

        dispatch({
            type: GET_KURS_EURA_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: GET_KURS_EURA_FAIL,
            payload: err
        })
    }
}