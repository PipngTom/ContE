import React from 'react';
import { Provider } from 'react-redux';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import UnosScreen from './screens/UnosScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import NewClientScreen from './screens/Clients/NewClientScreen';
import ClientsScreen from './screens/Clients/ClientsScreen';
import MetersScreen from './screens/Meters/MetersScreen';
import NewMeterScreen from './screens/Meters/NewMeterScreen';
import ContractsScreen from './screens/Contracts/ContractsScreen';
import NewContractScreen from './screens/Contracts/NewContractScreen';
import MeteringScreen from './screens/Metering/MeteringScreen';
import NewMeteringScreen from './screens/Metering/NewMeteringScreen';
import AllMeteringScreen from './screens/Metering/AllMeteringScreen';
import MrezarinaScreen from './screens/MrezarinaScreen';
import AllMrezarinaScreen from './screens/AllMrezarinaScreen';
import FaktureScreen from './screens/Fakture/FaktureScreen';
import NewFakturaScreen from './screens/Fakture/NewFakturaScreen';
import BalansnaOdgovornostScreen from './screens/BalansnaOdgovrnost/BalansnaOdgovornostScreen';
import IstorijaFakturaScreen from './screens/IstorijatFaktura/IstorijaFakturaScreen';
import Footer from './components/Footer';
import store from './store';
import LandingScreen from './screens/LandingScreen';
import FakturaZaKlijentaScreen from './screens/FakturaKlijent/FakturaZaKlijentaScreen';
import RacuniKlijentaScreen from './screens/FakturaKlijent/RacuniKlijentaScreen';
import BackUpFaktureScreen from './screens/IstorijatFaktura/BackUpFaktureScreen';
import NewMrezarinaScreen from './screens/NewMrezarinaScreen';

const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <Header />
          <main className='py-3'>
            <Container>
                <ProtectedRoute path='/unos' component={UnosScreen} /> 
                <Route path='/' component={LandingScreen}/>
                <Route path='/register' component={RegisterScreen} />
                <Route path='/login' component={LoginScreen} />
                <ProtectedRoute exact path='/clients/new' component={NewClientScreen} />
                <ProtectedRoute exact path='/clients/edit/:id' component={NewClientScreen} />
                <ProtectedRoute exact path='/clients' component={ClientsScreen} />
                <ProtectedRoute exact path='/meters' component={MetersScreen} />
                <ProtectedRoute exact path='/meters/new' component={NewMeterScreen} />
                <ProtectedRoute exact path='/meters/edit/:id' component={NewMeterScreen} />
                <ProtectedRoute exact path='/contracts' component={ContractsScreen} />
                <ProtectedRoute exact path='/contracts/new' component={NewContractScreen} />
                <ProtectedRoute exact path='/contracts/edit/:id' component={NewContractScreen} />
                <ProtectedRoute exact path='/unosi' component={MeteringScreen} />
                <ProtectedRoute exact path='/unosi/edit/:id' component={NewMeteringScreen} />
                <ProtectedRoute exact path='/unosi/new' component={NewMeteringScreen} />
                <ProtectedRoute exact path='/allmetering/:id' component={AllMeteringScreen} />
                <ProtectedRoute exact path='/mrezarina' component={AllMrezarinaScreen} />
                <ProtectedRoute exact path='/mrezarina/:id' component={MrezarinaScreen} />
                <ProtectedRoute exact path='/mrezarine/new/:id' component={NewMrezarinaScreen} />
                <ProtectedRoute exact path='/fakture' component={FaktureScreen} />
                <ProtectedRoute exact path='/fakture/new/:id' component={NewFakturaScreen} />
                <ProtectedRoute exact path='/balansna' component={BalansnaOdgovornostScreen} />
                <ProtectedRoute exact path='/fakturaklijent' component={FakturaZaKlijentaScreen} />
                <ProtectedRoute exact path='/fakturaklijent/racuni/:id' component={RacuniKlijentaScreen} />
                <ProtectedRoute exact path='/istorijafaktura' component={IstorijaFakturaScreen} />
                <ProtectedRoute exact path='/istorijafaktura/:id' component={BackUpFaktureScreen} />
            </Container>
          </main>
        <Footer />
    </Router>
    </Provider>
    
  );
}

export default App;
