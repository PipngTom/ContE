import { GET_KURS_EURA_REQUEST, GET_KURS_EURA_SUCCESS, GET_KURS_EURA_FAIL } from '../constants/kursEuraConstants';
import axios from 'axios';

export const kursEura = (datum) => async (dispatch) => {
    try {
        dispatch({
            type: GET_KURS_EURA_REQUEST
        })

        const { data } = await axios.get('/api/kurs', {params: {datum: datum}})

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