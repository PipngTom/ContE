import React from 'react';
import { useHistory } from 'react-router-dom';
 import { Nav, NavDropdown, Container, Navbar } from 'react-bootstrap';
 import { LinkContainer } from 'react-router-bootstrap'
 import { logout } from '../actions/userActions';
 import { useDispatch, useSelector } from 'react-redux';
import { USER_REGISTER_RESET } from '../constants/userConstants';

const Header = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

   const logoutHandler = () => {
      dispatch(logout())
      history.push( '/register')
      dispatch({type: USER_REGISTER_RESET})
      
   }

  return (
    <div>
      <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ContE</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
            {!userInfo && <LinkContainer to="/register"  >
                <Nav.Link>
                  <i className="fas fa-user-plus"></i> Register
                </Nav.Link>
              </LinkContainer>}
               {!userInfo && <LinkContainer to="/login" >
                <Nav.Link>
                  <i className="fas fa-user"></i> Sign In
                </Nav.Link>
              </LinkContainer>}
              {userInfo && <NavDropdown title='Ugovori' id='ugovori'>
                  <NavDropdown.Item>
                  <LinkContainer to="/clients">
                    <Nav.Link>
                      Klijenti
                    </Nav.Link>
                 </LinkContainer>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                  <LinkContainer to="/contracts">
                    <Nav.Link>
                      Ugovori
                    </Nav.Link>
                 </LinkContainer>
                  </NavDropdown.Item>
                </NavDropdown>}
              {userInfo && <NavDropdown title='Brojila' id='brojila'>
                  <NavDropdown.Item>
                  <LinkContainer to="/meters">
                    <Nav.Link>
                      Brojila
                    </Nav.Link>
                 </LinkContainer>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                  <LinkContainer to="/unosi">
                    <Nav.Link>
                      Unos Merenja
                    </Nav.Link>
                 </LinkContainer>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                  <LinkContainer to="/preuzimanjemerenja">
                    <Nav.Link>
                      Preuzimanje merenja
                    </Nav.Link>
                 </LinkContainer>
                  </NavDropdown.Item>
                </NavDropdown>}
              {userInfo && userInfo.uloga !== 'korisnik' && <NavDropdown title='Mrežarina' id='mrežarina'>
                  <NavDropdown.Item>
                  <LinkContainer to="/mrezarina">
                    <Nav.Link>
                      Mrežarina
                    </Nav.Link>
                 </LinkContainer>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                  <LinkContainer to="/nameti">
                    <Nav.Link>
                      Nameti
                    </Nav.Link>
                 </LinkContainer>
                  </NavDropdown.Item>
                </NavDropdown>}
              {userInfo && <LinkContainer to="/balansna">
                <Nav.Link>
                  <i className="fas fa-user-plus"></i> Balansna odgovornost
                </Nav.Link>
              </LinkContainer>}
              {userInfo && <LinkContainer to="/ems">
                <Nav.Link>
                  <i className="fas fa-user-plus"></i> EMS
                </Nav.Link>
              </LinkContainer>}
              {userInfo && <NavDropdown title='Fakture' id='fakture'>
                  <NavDropdown.Item>
                  <LinkContainer to="/fakturaklijent">
                    <Nav.Link>
                      Faktura za Klijenta
                    </Nav.Link>
                 </LinkContainer>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                  <LinkContainer to="/istorijafaktura">
                    <Nav.Link>
                      Istorija Faktura
                    </Nav.Link>
                 </LinkContainer>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                  <LinkContainer to="/kursevra">
                    <Nav.Link>
                      Kurs Evra
                    </Nav.Link>
                 </LinkContainer>
                  </NavDropdown.Item>
                </NavDropdown>}
              {userInfo && <NavDropdown title={userInfo.name} id='username'>
              {userInfo.uloga === 'super_admin' && <NavDropdown.Item>
               <LinkContainer to="/korisnici">
                    <Nav.Link>
                    Korisnici
                    </Nav.Link>
                 </LinkContainer>
                  </NavDropdown.Item>}
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
    </div>
  )
}

export default Header;
