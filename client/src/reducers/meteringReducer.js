import { 
    METERING_SAVE_REQUEST, METERING_SAVE_SUCCESS, METERING_SAVE_FAIL,
    GET_ALL_METERING_BY_METERID_REQUEST, GET_ALL_METERING_BY_METERID_SUCCESS, GET_ALL_METERING_BY_METERID_FAIL, GET_ALL_METERING_BY_METERID_UPDATE,
    GET_METERING_BY_METER_IDS_REQUEST, 
    GET_METERING_BY_METER_IDS_SUCCESS, GET_METERING_BY_METER_IDS_FAIL } from '../constants/meteringConstants';

export const meteringReducer = (state = {}, action) => {
    switch (action.type) {
      case METERING_SAVE_REQUEST:
        return {
          loading: true,
          info: ''
        }
      case METERING_SAVE_SUCCESS:
        return {
          loading: false,
          info: action.payload
        }
      case METERING_SAVE_FAIL:
        return {
          loading: false,
          error: action.payload
        }
      default:
        return state;
    }
  }

  export const allMeteringByMeterIdReducer = (state = { metering: []}, action) => {
    switch (action.type) {
      case GET_ALL_METERING_BY_METERID_REQUEST:
        return {
          loading: true,
          metering: []
        }
      case GET_ALL_METERING_BY_METERID_SUCCESS:
        return {
          loading: false,
          metering: action.payload
        }
      case GET_ALL_METERING_BY_METERID_UPDATE:
        return {
           loading: false,
           metering: state.metering.filter((item)=>(item.id !== action.payload)) 
        }
      case GET_ALL_METERING_BY_METERID_FAIL:
        return {
          loading: false,
          error: action.payload
        }
      default:
        return state;
    }
  }

  export const allMeteringByMeterIdsReducer = (state = { metering: []}, action) => {
    switch (action.type) {
      case GET_METERING_BY_METER_IDS_REQUEST:
        return {
          loading: true,
          metering: []
        }
      case GET_METERING_BY_METER_IDS_SUCCESS:
        return {
          loading: false,
          metering: action.payload
        }
      case GET_METERING_BY_METER_IDS_FAIL:
        return {
          loading: false,
          error: action.payload
        }
      default:
        return state;
    }
  }