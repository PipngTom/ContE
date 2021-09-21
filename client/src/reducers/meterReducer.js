import { 
    GET_ALL_METERS_REQUEST, GET_ALL_METERS_SUCCESS, GET_ALL_METERS_FAIL, ALL_METERS_UPDATE,
    GET_SINGLE_METER_REQUEST, GET_SINGLE_METER_SUCCESS, GET_SINGLE_METER_FAIL, GET_SINGLE_METER_RESET } from '../constants/meterConstants';

    export const allMetersReducer = (state = { meters: []}, action) => {
        switch (action.type) {
          case GET_ALL_METERS_REQUEST:
            return {
              loading: true,
              meters: []
            }
          case GET_ALL_METERS_SUCCESS:
            return {
              loading: false,
              meters: action.payload
            }
          case ALL_METERS_UPDATE:
            return {
               loading: false,
               meters: state.meters.filter((item)=>(item.id !== action.payload)) 
            }
          case GET_ALL_METERS_FAIL:
            return {
              loading: false,
              error: action.payload
            }
          default:
            return state;
        }
      }

      export const singleMeterReducer = (state = { meter: null}, action) => {
        switch (action.type) {
          case GET_SINGLE_METER_REQUEST:
            return {
              loading: true,
              meter: null
            }
          case GET_SINGLE_METER_SUCCESS:
            return {
              loading: false,
              meter: action.payload
            }
          case GET_SINGLE_METER_RESET:
            return {
              loading: true,
              meter: null
            }
          case GET_SINGLE_METER_FAIL:
            return {
              loading: false,
              error: action.payload
            }
          default:
            return state;
        }
      }