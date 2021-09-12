import React from 'react';
import { Provider } from 'react-redux';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UnosScreen from './screens/UnosScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import NewClientScreen from './screens/NewClientScreen';
import ClientsScreen from './screens/ClientsScreen';
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
            </Container>
          </main>
        <Footer />
    </Router>
    </Provider>
    
  );
}

export default App;
