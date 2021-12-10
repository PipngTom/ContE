import { SAVE_NAMETI_REQUEST, SAVE_NAMETI_SUCCESS, SAVE_NAMETI_FAIL, 
        GET_ALL_NAMETI_REQUEST, 
        GET_ALL_NAMETI_SUCCESS, 
        GET_ALL_NAMETI_RESET,
        GET_ALL_NAMETI_FAIL, 
        GET_NAMETI_REQUEST,
        GET_NAMETI_SUCCESS,
        GET_NAMETI_RESET,
        GET_NAMETI_FAIL} from '../constants/nametiConstants';

export const allNametiReducer = (state = { nameti: [] }, action) => {
    switch (action.type) {
        case GET_ALL_NAMETI_REQUEST:
            return {
                loading: true,
                nameti: []
            }
        case GET_ALL_NAMETI_SUCCESS:
            return {
                loading: false,
                nameti: action.payload
            }
        case GET_ALL_NAMETI_RESET:
            return {
                loading: true,
                nameti: []
            }
        case GET_ALL_NAMETI_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default: 
            return state
    }
}

export const nametiReducer = (state = { namet: null }, action) => {
    switch (action.type) {
        case GET_NAMETI_REQUEST:
            return {
                loading: true,
                namet: null
            }
        case GET_NAMETI_SUCCESS:
            return {
                loading: false,
                namet: action.payload
            }
        case GET_NAMETI_RESET:
            return {
                loading: true,
                namet: null
            }
        case GET_NAMETI_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const newNametiReducer = (state = { nameti: null }, action) => {
    switch (action.type) {
        case SAVE_NAMETI_REQUEST:
            return {
                loading: true,
                nameti: null
            }
        case SAVE_NAMETI_SUCCESS:
            return {
                loading: false,
                nameti: action.payload
            }
        case SAVE_NAMETI_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}