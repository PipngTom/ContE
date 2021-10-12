import { 
    GET_ALL_CONTRACTS_REQUEST, GET_ALL_CONTRACTS_SUCCESS, GET_ALL_CONTRACTS_FAIL, ALL_CONTRACTS_UPDATE,
    GET_SINGLE_CONTRACT_REQUEST, GET_SINGLE_CONTRACT_SUCCESS, GET_SINGLE_CONTRACT_RESET, GET_SINGLE_CONTRACT_FAIL } from '../constants/contractConstants';

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