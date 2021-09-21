import React from 'react';
import { Provider } from 'react-redux';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
import FaktureScreen from './screens/Fakture/FaktureScreen';
import NewFakturaScreen from './screens/Fakture/NewFakturaScreen';
import Footer from './components/Footer';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <Header />
          <main className='py-3'>
            <Container>
                <Route path='/unos' component={UnosScreen} /> 
                <Route path='/register' component={RegisterScreen} />
                <Route path='/login' component={LoginScreen} />
                <Route exact path='/clients/new' component={NewClientScreen} />
                <Route exact path='/clients/edit/:id' component={NewClientScreen} />
                <Route exact path='/clients' component={ClientsScreen} />
                <Route exact path='/meters' component={MetersScreen} />
                <Route exact path='/meters/new' component={NewMeterScreen} />
                <Route exact path='/meters/edit/:id' component={NewMeterScreen} />
                <Route exact path='/contracts' component={ContractsScreen} />
                <Route exact path='/contracts/new' component={NewContractScreen} />
                <Route exact path='/contracts/edit/:id' component={NewContractScreen} />
                <Route exact path='/unosi' component={MeteringScreen} />
                <Route exact path='/unosi/edit/:id' component={NewMeteringScreen} />
                <Route exact path='/unosi/new' component={NewMeteringScreen} />
                <Route exact path='/allmetering/:id' component={AllMeteringScreen} />
                <Route exact path='/mrezarina' component={MrezarinaScreen} />
                <Route exact path='/fakture' component={FaktureScreen} />
                <Route exact path='/fakture/new/:id' component={NewFakturaScreen} />
            </Container>
          </main>
        <Footer />
    </Router>
    </Provider>
    
  );
}

export default App;
