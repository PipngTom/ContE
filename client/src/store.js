import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userRegisterReducer, userLoginReducer, unosReducer } from './reducers/userReducer';
import { clientReducer, allClientsReducer, singleClientReducer } from './reducers/clientReducer';
import { allMetersReducer, singleMeterReducer, allMetersByClientIdReducer } from './reducers/meterReducer';
import { allContractsReducer, singleContractReducer, singleContractByClientReducer, saveContractReducer } from './reducers/contractReducer';
import { meteringReducer, allMeteringByMeterIdReducer, allMeteringByMeterIdsReducer, fakturaMeteringReducer } from './reducers/meteringReducer';
import { mrezarinaReducer, allMrezarineReducer, newMrezarinaReducer } from './reducers/mrezarinaReducer';
import { backupFakturaReducer, getBackUpFaktureReducer } from './reducers/backupFakturaReducer';

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
  savedContract: saveContractReducer,
  singleContractByClient: singleContractByClientReducer,
  metering: meteringReducer,
  allMeteringByMeterId: allMeteringByMeterIdReducer,
  allMeteringByMeterIds: allMeteringByMeterIdsReducer,
  fakturaMetering: fakturaMeteringReducer,
  allMrezarine: allMrezarineReducer,
  mrezarina: mrezarinaReducer,
  novaMrezarina: newMrezarinaReducer,
  bFaktura: backupFakturaReducer,
  fakture: getBackUpFaktureReducer

})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;