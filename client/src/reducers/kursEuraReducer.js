import { GET_KURS_EURA_REQUEST, GET_KURS_EURA_SUCCESS, GET_KURS_EURA_FAIL, GET_ALL_KURS_EURA_REQUEST, GET_ALL_KURS_EURA_SUCCESS, GET_ALL_KURS_EURA_RESET, GET_ALL_KURS_EURA_FAIL, GET_KURS_EURA_RESET } from '../constants/kursEuraConstants';

export const allEuroReducer = (state = { euros: [] }, action) => {
    switch (action.type) {
        case GET_ALL_KURS_EURA_REQUEST:
            return {
                loading: true,
                euros: []
            }
        case GET_ALL_KURS_EURA_SUCCESS:
            return {
                loading: false,
                euros: action.payload
            }
        case GET_ALL_KURS_EURA_RESET:
            return {
                loading: true,
                euros: []
            }
        case GET_ALL_KURS_EURA_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

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
        case GET_KURS_EURA_RESET:
            return {
                loading: true,
                euro: null
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