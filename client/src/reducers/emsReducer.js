import {GET_ALL_PODACI_ZA_EMS_REQUEST,
         GET_ALL_PODACI_ZA_EMS_SUCCESS, 
         GET_ALL_PODACI_ZA_EMS_RESET, 
         GET_ALL_PODACI_ZA_EMS_FAIL, 
         SAVE_PODACI_ZA_EMS_REQUEST, 
         SAVE_PODACI_ZA_EMS_SUCCESS, 
         SAVE_PODACI_ZA_EMS_FAIL,
        GET_SINGLE_EMS_REQUEST,
        GET_SINGLE_EMS_SUCCESS,
        GET_SINGLE_EMS_FAIL, 
        GET_SINGLE_EMS_RESET,
        UPDATE_PODACI_ZA_EMS_SUCCESS} from '../constants/emsConstants';


export const allEmsReducer = (state = { sviPodaci: [] }, action) => {
    switch (action.type) {
        case GET_ALL_PODACI_ZA_EMS_REQUEST: 
            return {
                loading: true,
                sviPodaci: []
            }
        case GET_ALL_PODACI_ZA_EMS_SUCCESS:
            return {
                loading: false,
                sviPodaci: action.payload
            }
        case GET_ALL_PODACI_ZA_EMS_RESET:
            return {
                loading: true,
                sviPodaci: []
            }
        case GET_ALL_PODACI_ZA_EMS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const emsReducer = (state = { ems: null } , action) => {
    switch (action.type) {
        case GET_SINGLE_EMS_REQUEST:
            return {
                loading: true,
                ems: null
            }
        case GET_SINGLE_EMS_SUCCESS:
            return {
                loading: false,
                ems: action.payload
            }
        case GET_SINGLE_EMS_RESET:
            return {
                loading: true,
                ems: null
            }
        case GET_SINGLE_EMS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const emsSaveReducer = (state = { podaci: [] }, action) => {
    switch (action.type) {
        case SAVE_PODACI_ZA_EMS_REQUEST:
            return {
                loading: true,
                podaci: []
            }
        case SAVE_PODACI_ZA_EMS_SUCCESS:
            return {
                loading: false,
                podaci: action.payload
            }
        case UPDATE_PODACI_ZA_EMS_SUCCESS:
            return {
                loading: false,
                podaci: action.payload
            }
        case SAVE_PODACI_ZA_EMS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}
