import { GET_ALL_MREZARINA_REQUEST, 
        GET_ALL_MREZARINA_SUCCESS, 
        GET_ALL_MREZARINA_RESET, 
        GET_ALL_MREZARINA_FAIL, 
        GET_MREZARINA_REQUEST, 
        GET_MREZARINA_SUCCESS, 
        GET_MREZARINA_FAIL, 
        GET_MREZARINA_RESET,
        NEW_MREZARINA_REQUEST,
         NEW_MREZARINA_SUCCESS,
        NEW_MREZARINA_FAIL} from '../constants/mrezarinaConstants';

export const allMrezarineReducer = (state = { mrezarine: [] }, action) => {
    switch (action.type) {
      case GET_ALL_MREZARINA_REQUEST:
        return {
          loading: true,
          mrezarine: []
        }
      case GET_ALL_MREZARINA_SUCCESS:
        return {
          loading: false,
          mrezarine: action.payload
        }
      case GET_ALL_MREZARINA_RESET:
        return {
          loading: true,
          mrezarine: []
        }
      case GET_ALL_MREZARINA_FAIL:
        return {
          loading: false,
          error: action.payload
        }
      default:
        return state
    }
}

export const mrezarinaReducer = (state = { mrezarina: null}, action) => {
    switch (action.type) {
      case GET_MREZARINA_REQUEST:
        return {
          loading: true,
          mrezarina: null
        }
      case GET_MREZARINA_SUCCESS:
        return {
          loading: false,
          mrezarina: action.payload
        }
      case GET_MREZARINA_RESET:
        return {
            loading: true,
            mrezarina: null
          }
      case GET_MREZARINA_FAIL:
        return {
          loading: false,
          error: action.payload
        }
      default:
        return state;
    }
  }

  export const newMrezarinaReducer = (state = { novaMrezarina: null }, action) => {
      switch (action.type) {
        case NEW_MREZARINA_REQUEST:
          return {
            loading: true,
            novaMrezarina: null
          }
        case NEW_MREZARINA_SUCCESS:
          return {
            loading: false,
            novaMrezarina: action.payload
          }
        case NEW_MREZARINA_FAIL:
          return {
            loading: false,
            error: action.payload
          }
        default:
          return state
      }
  }