import React from 'react';
 import { Nav, NavDropdown, Container, Navbar } from 'react-bootstrap';
 import { LinkContainer } from 'react-router-bootstrap'
 import { logout } from '../actions/userActions';
 import { useDispatch, useSelector } from 'react-redux';

const Header = () => {

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

   const logoutHandler = () => {
      dispatch(logout())
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
            {!userInfo && <LinkContainer to="/register">
                <Nav.Link>
                  <i className="fas fa-user-plus"></i> Register
                </Nav.Link>
              </LinkContainer>}
                {userInfo && <NavDropdown title='LogOut' id='username'>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>}
               {!userInfo && <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i> Sign In
                </Nav.Link>
              </LinkContainer>}
              {userInfo && <LinkContainer to="/clients">
                <Nav.Link>
                  <i className="fas fa-user-plus"></i> Klijenti
                </Nav.Link>
              </LinkContainer>}
              {userInfo && <LinkContainer to="/meters">
                <Nav.Link>
                  <i className="fas fa-user-plus"></i> Brojila
                </Nav.Link>
              </LinkContainer>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
    </div>
  )
}

export default Header;
