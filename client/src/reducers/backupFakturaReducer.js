import { BACK_UP_FAKTURA_FAIL, BACK_UP_FAKTURA_REQUEST, BACK_UP_FAKTURA_SUCCESS, GET_BACK_UP_FAKTURE_FAIL, GET_BACK_UP_FAKTURE_REQUEST, GET_BACK_UP_FAKTURE_SUCCESS } from "../constants/backupFakturaConstants";

export const backupFakturaReducer = (state = { bFaktura : null }, action) => {
    switch (action.type) {
        case BACK_UP_FAKTURA_REQUEST:
            return {
                loading: true,
                bFaktura: null 
            }
        case BACK_UP_FAKTURA_SUCCESS:
            return {
                loading: false,
                bFaktura: action.payload
            }
        case BACK_UP_FAKTURA_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const getBackUpFaktureReducer = (state = { rFakture: null }, action) => {
    switch (action.type) {
        case GET_BACK_UP_FAKTURE_REQUEST:
            return {
                loading: true,
                rFakture: null
            }
        case GET_BACK_UP_FAKTURE_SUCCESS:
            return {
                loading: false,
                rFakture: action.payload
            }
        case GET_BACK_UP_FAKTURE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}