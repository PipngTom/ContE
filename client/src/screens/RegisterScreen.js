import React, { useState } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../actions/userActions';

const RegisterScreen = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(register(name, email, password))
    history.push('/home')
  }

  return (
    <FormContainer>
    <h1>Sign Up</h1>
    <Form onSubmit={submitHandler}>
    <Form.Group controlId='name'>
        <Form.Label>Name</Form.Label>
        <Form.Control type='name' placeholder='Enter name' value={name}
        onChange={(e) => setName(e.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group controlId='email'>
        <Form.Label>Email Address</Form.Label>
        <Form.Control type='email' placeholder='Enter email' value={email}
        onChange={(e) => setEmail(e.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group controlId='password'>
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' placeholder='Enter password' value={password}
        onChange={(e) => setPassword(e.target.value)}></Form.Control>
      </Form.Group>
      <Button type='submit' variant='primary'>
        Register
      </Button>
    </Form>
    {/* <Row className='py-3'>
      <Col>
      Have account?{' '}
      <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
        Login
      </Link>
      </Col>
    </Row> */}
  </FormContainer>
  )
}

export default RegisterScreen
