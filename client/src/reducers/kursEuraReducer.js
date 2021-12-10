import { GET_KURS_EURA_REQUEST, GET_KURS_EURA_SUCCESS, GET_KURS_EURA_FAIL } from '../constants/kursEuraConstants';

export const kursEuraReducer = (state = { euro: null }, action) => {
    switch (action.type) {
        case GET_KURS_EURA_REQUEST:
            return {
                loading: true,
                euro: null
            }
        case GET_KURS_EURA_SUCCESS:
            return {
                loading: false,
                euro: action.payload
            }
        case GET_KURS_EURA_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}