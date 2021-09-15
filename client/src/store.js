import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userRegisterReducer, userLoginReducer, unosReducer } from './reducers/userReducer';
import { clientReducer, allClientsReducer, singleClientReducer } from './reducers/clientReducer';
import { allMetersReducer, singleMeterReducer } from './reducers/meterReducer';

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  unosRacun: unosReducer,
  client: clientReducer,
  allClients: allClientsReducer,
  singleClient: singleClientReducer,
  allMeters: allMetersReducer,
  singleMeter: singleMeterReducer

})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;