import { 
    GET_ALL_CONTRACTS_REQUEST, GET_ALL_CONTRACTS_SUCCESS, GET_ALL_CONTRACTS_RESET, GET_ALL_CONTRACTS_FAIL, ALL_CONTRACTS_UPDATE,
    GET_SINGLE_CONTRACT_REQUEST, GET_SINGLE_CONTRACT_SUCCESS, GET_SINGLE_CONTRACT_RESET, GET_SINGLE_CONTRACT_FAIL, GET_SINGLE_CONTRACT_BY_CLIENT_ID_REQUEST, GET_SINGLE_CONTRACT_BY_CLIENT_ID_SUCCESS, GET_SINGLE_CONTRACT_BY_CLIENT_ID_FAIL, CONTRACT_SAVE_REQUEST, CONTRACT_SAVE_SUCCESS, CONTRACT_SAVE_FAIL } from '../constants/contractConstants';


    //Reducer for storaging all contracts values
    export const allContractsReducer = (state = { contracts: []}, action) => {
        switch (action.type) {
          case GET_ALL_CONTRACTS_REQUEST:
            return {
              loading: true,
              contracts: []
            }
          case GET_ALL_CONTRACTS_SUCCESS:
            return {
              loading: false,
              contracts: action.payload
            }
          case GET_ALL_CONTRACTS_RESET:
            return {
              loading: true,
              contracts: []
            }
          case ALL_CONTRACTS_UPDATE:
            return {
               loading: false,
               contracts: state.contracts.filter((item)=>(item.id !== action.payload)) 
            }
          case GET_ALL_CONTRACTS_FAIL:
            return {
              loading: false,
              error: action.payload
            }
          default:
            return state;
        }
      }


      //Reducer for storaging single contract values
      export const singleContractReducer = (state = { contract: null}, action) => {
        switch (action.type) {
          case GET_SINGLE_CONTRACT_REQUEST:
            return {
              loading: true,
              contract: null
            }
            case GET_SINGLE_CONTRACT_RESET:
            return {
              loading: true,
              contract: null
            }
          case GET_SINGLE_CONTRACT_SUCCESS:
            return {
              loading: false,
              contract: action.payload
            }
          case GET_SINGLE_CONTRACT_FAIL:
            return {
              loading: false,
              error: action.payload
            }
          default:
            return state;
        }
      }

      //Reducer for storaging contract values by clientid 
    export const singleContractByClientReducer = (state = { singleContractByClient: null }, action) => {
      switch (action.type) {
        case GET_SINGLE_CONTRACT_BY_CLIENT_ID_REQUEST:
          return {
            loading: true,
            singleContractByClient: null
          }
        case GET_SINGLE_CONTRACT_BY_CLIENT_ID_SUCCESS:
          return {
            loading: false,
            singleContractByClient: action.payload
          }
        case GET_SINGLE_CONTRACT_BY_CLIENT_ID_FAIL:
          return {
            loading: false,
            error: action.payload
          }
        default:
          return state;
      }
    }

    //Reducer for saving and storaging new contract values or updating existing one 
    export const saveContractReducer = (state = { contract: null, error: null }, action) => {
      switch (action.type) {
        case CONTRACT_SAVE_REQUEST:
          return {
            loading: true,
            contract: null,
            error: null
          }
        case CONTRACT_SAVE_SUCCESS:
          return {
            loading: false,
            contract: action.payload,
            error: null
          }
        case CONTRACT_SAVE_FAIL:
          return {
            loading: false,
            error: action.payload
          }
        default:
          return state
      }
    }