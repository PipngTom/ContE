import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userRegisterReducer, userLoginReducer, allUsersReducer, singleUserReducer } from './reducers/userReducer';
import { clientReducer, allClientsReducer, singleClientReducer } from './reducers/clientReducer';
import { allMetersReducer, singleMeterReducer, allMetersByClientIdReducer } from './reducers/meterReducer';
import { allContractsReducer, singleContractReducer, singleContractByClientReducer, saveContractReducer } from './reducers/contractReducer';
import { meteringReducer, allMeteringByMeterIdReducer, allMeteringByMeterIdsReducer, fakturaMeteringReducer } from './reducers/meteringReducer';
import { mrezarinaReducer, allMrezarineReducer, newMrezarinaReducer } from './reducers/mrezarinaReducer';
import { backupFakturaReducer, getBackUpFaktureReducer } from './reducers/backupFakturaReducer';
import { allEmsReducer, emsReducer, emsSaveReducer } from './reducers/emsReducer';
import { allNametiReducer, nametiReducer, newNametiReducer } from './reducers/nametiReducer';
import { kursEuraReducer, allEuroReducer } from './reducers/kursEuraReducer';

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
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
  fakture: getBackUpFaktureReducer,
  allEms: allEmsReducer,
  emsSave: emsSaveReducer,
  singleEms: emsReducer,
  allNameti: allNametiReducer,
  jNamet: nametiReducer,
  newNameti: newNametiReducer,
  allEuro: allEuroReducer,
  kursE: kursEuraReducer,
  allUsers: allUsersReducer,
  singleUser: singleUserReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;