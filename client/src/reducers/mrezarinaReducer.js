import { GET_MREZARINA_REQUEST, GET_MREZARINA_SUCCESS, GET_MREZARINA_FAIL, GET_MREZARINA_RESET } from '../constants/mrezarinaConstants';

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