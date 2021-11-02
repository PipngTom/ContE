import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userRegisterReducer, userLoginReducer, unosReducer } from './reducers/userReducer';
import { clientReducer, allClientsReducer, singleClientReducer } from './reducers/clientReducer';
import { allMetersReducer, singleMeterReducer, allMetersByClientIdReducer } from './reducers/meterReducer';
import { allContractsReducer, singleContractReducer, singleContractByClientReducer } from './reducers/contractReducer';
import { meteringReducer, allMeteringByMeterIdReducer, allMeteringByMeterIdsReducer, fakturaMeteringReducer } from './reducers/meteringReducer';
import { mrezarinaReducer } from './reducers/mrezarinaReducer';

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  unosRacun: unosReducer,
  client: clientReducer,
  allClients: allClientsReducer,
  singleClient: singleClientReducer,
  allMeters: allMetersReducer,
  singleMeter: singleMeterReducer,
  allMetersByClientId: allMetersByClientIdReducer,
  allContracts: allContractsReducer,
  singleContract: singleContractReducer,
  singleContractByClient: singleContractByClientReducer,
  metering: meteringReducer,
  allMeteringByMeterId: allMeteringByMeterIdReducer,
  allMeteringByMeterIds: allMeteringByMeterIdsReducer,
  fakturaMetering: fakturaMeteringReducer,
  mrezarina: mrezarinaReducer

})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;