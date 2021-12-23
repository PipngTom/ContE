import { BACK_UP_FAKTURA_REQUEST, BACK_UP_FAKTURA_SUCCESS, BACK_UP_FAKTURA_FAIL, GET_BACK_UP_FAKTURE_REQUEST, GET_BACK_UP_FAKTURE_SUCCESS, GET_BACK_UP_FAKTURE_FAIL } from "../constants/backupFakturaConstants";
import axios from 'axios';


export const backupFaktura = ( faktura ) => async ( dispatch, getState)  => {
    try {
        dispatch({
            type: BACK_UP_FAKTURA_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
                'Content-Type': 'application/json'
            }
        }

        const data = await axios.post('/api/fakture/bfaktura', faktura, config)
        dispatch({
            type: BACK_UP_FAKTURA_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: BACK_UP_FAKTURA_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
          })
    }
}

export const getBackupFakture = (idKlijenta, mesec, godina) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_BACK_UP_FAKTURE_REQUEST
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const rez = await axios.get('/api/fakture/bfaktura', {params: { idKlijenta: idKlijenta, mesec: mesec, godina: godina }, 
        headers: { Authorization: `Bearer ${userInfo.token}` }})
        dispatch({
            type: GET_BACK_UP_FAKTURE_SUCCESS,
            payload: rez.data
        })
    } catch (error) {
        dispatch({
            type: GET_BACK_UP_FAKTURE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
          })
    }

}