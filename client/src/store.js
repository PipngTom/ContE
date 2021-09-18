import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userRegisterReducer, userLoginReducer, unosReducer } from './reducers/userReducer';
import { clientReducer, allClientsReducer, singleClientReducer } from './reducers/clientReducer';
import { allMetersReducer, singleMeterReducer } from './reducers/meterReducer';
import { allContractsReducer, singleContractReducer } from './reducers/contractReducer';
import { meteringReducer, allMeteringByMeterIdReducer } from './reducers/meteringReducer';

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  unosRacun: unosReducer,
  client: clientReducer,
  allClients: allClientsReducer,
  singleClient: singleClientReducer,
  allMeters: allMetersReducer,
  singleMeter: singleMeterReducer,
  allContracts: allContractsReducer,
  singleContract: singleContractReducer,
  metering: meteringReducer,
  allMeteringByMeterId: allMeteringByMeterIdReducer

})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;