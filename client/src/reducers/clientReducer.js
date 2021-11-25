import { CLIENT_SAVE_REQUEST, CLIENT_SAVE_SUCCESS, CLIENT_SAVE_FAIL, 
    GET_ALL_CLIENTS_REQUEST, GET_ALL_CLIENTS_SUCCESS, GET_ALL_CLIENTS_RESET, GET_ALL_CLIENTS_FAIL, ALL_CLIENTS_UPDATE,
    GET_SINGLE_CLIENT_REQUEST, GET_SINGLE_CLIENT_RESET, GET_SINGLE_CLIENT_SUCCESS, GET_SINGLE_CLIENT_FAIL } from '../constants/clientConstants';



export const clientReducer = (state = {}, action) => {
    switch (action.type) {
      case CLIENT_SAVE_REQUEST:
        return {
          loading: true,
          info: ''
        }
      case CLIENT_SAVE_SUCCESS:
        return {
          loading: false,
          info: action.payload
        }
      case CLIENT_SAVE_FAIL:
        return {
          loading: false,
          error: action.payload
        }
      default:
        return state;
    }
  }

  export const allClientsReducer = (state = { clients: []}, action) => {
    switch (action.type) {
      case GET_ALL_CLIENTS_REQUEST:
        return {
          loading: true,
          clients: []
        }
      case GET_ALL_CLIENTS_SUCCESS:
        return {
          loading: false,
          clients: action.payload
        }
      case GET_ALL_CLIENTS_RESET:
        return {
          loading: true,
          clients: []
        }
      case ALL_CLIENTS_UPDATE:
        return {
           loading: false,
           clients: state.clients.filter((item)=>(item.id !== action.payload)) 
        }
      case GET_ALL_CLIENTS_FAIL:
        return {
          loading: false,
          error: action.payload
        }
      default:
        return state;
    }
  }

  export const singleClientReducer = (state = { client: null}, action) => {
    switch (action.type) {
      case GET_SINGLE_CLIENT_REQUEST:
        return {
          loading: true,
          client: null
        }
        case GET_SINGLE_CLIENT_RESET:
        return {
          loading: true,
          client: null
        }
      case GET_SINGLE_CLIENT_SUCCESS:
        return {
          loading: false,
          client: action.payload
        }
      case GET_SINGLE_CLIENT_FAIL:
        return {
          loading: false,
          error: action.payload
        }
      default:
        return state;
    }
  }