import React from 'react';
import { Provider } from 'react-redux';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
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
import BalansnaOdgovornostScreen from './screens/BalansnaOdgovrnost/BalansnaOdgovornostScreen';
import IstorijaFakturaScreen from './screens/IstorijatFaktura/IstorijaFakturaScreen';
import Footer from './components/Footer';
import store from './store';
import LandingScreen from './screens/LandingScreen';
import FakturaZaKlijentaScreen from './screens/FakturaKlijent/FakturaZaKlijentaScreen';
import RacuniKlijentaScreen from './screens/FakturaKlijent/RacuniKlijentaScreen';
import BackUpFaktureScreen from './screens/IstorijatFaktura/BackUpFaktureScreen';
import NewMrezarinaScreen from './screens/NewMrezarinaScreen';
import EMSScreen from './screens/BalansnaOdgovrnost/EMSScreen';
import AllEMSScreen from './screens/BalansnaOdgovrnost/AllEMSScreen';
import EditEMSScreen from './screens/BalansnaOdgovrnost/EditEMSScreen';
import NewNametiScreen from './screens/Nameti/NewNametiScreen';
import NametiScreen from './screens/Nameti/NametiScreen';
import AllNametiScreen from './screens/Nameti/AllNametiScreen';
import KursEvraScreen from './screens/KursEvra/KursEvraScreen';
import AllEuroScreen from './screens/KursEvra/AllEuroScreen';
import KorisniciScreen from './screens/KorisniciScreen';
import EditKorisniciScreen from './screens/EditKorisniciScreen';
import PreuzimanjeMerenjaScreen from './screens/PreuzimanjeMerenjaScreen';

const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <Header />
          <main className='py-3'>
            <Container>
                <Route path='/' component={LandingScreen}/>
                <Route path='/register' component={RegisterScreen} />
                <Route path='/login' component={LoginScreen} />
                <ProtectedRoute exact path='/korisnici' component={KorisniciScreen} />
                <ProtectedRoute exact path='/korisnici/:id' component={EditKorisniciScreen} />
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
                <ProtectedRoute exact path='/preuzimanjemerenja' component={PreuzimanjeMerenjaScreen} />
                <ProtectedRoute exact path='/allmetering/:id' component={AllMeteringScreen} />
                <ProtectedRoute exact path='/mrezarina' component={AllMrezarinaScreen} />
                <ProtectedRoute exact path='/mrezarina/:id/:idpret' component={MrezarinaScreen} />
                <ProtectedRoute exact path='/mrezarine/new/:id' component={NewMrezarinaScreen} />
                <ProtectedRoute exact path='/balansna' component={BalansnaOdgovornostScreen} />
                <ProtectedRoute exact path='/fakturaklijent' component={FakturaZaKlijentaScreen} />
                <ProtectedRoute exact path='/fakturaklijent/racuni/:id' component={RacuniKlijentaScreen} />
                <ProtectedRoute exact path='/istorijafaktura' component={IstorijaFakturaScreen} />
                <ProtectedRoute exact path='/istorijafaktura/:id' component={BackUpFaktureScreen} />
                <ProtectedRoute exact path='/ems/new' component={EMSScreen} />
                <ProtectedRoute exact path='/ems/detalji/:id' component={EditEMSScreen} />
                <ProtectedRoute exact path='/ems' component={AllEMSScreen} />
                <ProtectedRoute exact path='/nameti' component={AllNametiScreen} />
                <ProtectedRoute exact path='/nameti/:id/:idpret' component={NametiScreen} />
                <ProtectedRoute exact path='/namet/new/:id' component={NewNametiScreen} />
                <ProtectedRoute exact path='/kursevra' component={AllEuroScreen} />
                <ProtectedRoute exact path='/kursevra/new' component={KursEvraScreen} />
                <ProtectedRoute exact path='/kursevra/edit/:id' component={KursEvraScreen} />
            </Container>
          </main>
        <Footer />
    </Router>
    </Provider>
    
  );
}

export default App;
