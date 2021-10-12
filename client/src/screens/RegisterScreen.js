import React, { useState } from 'react';
import FormContainer from '../components/FormContainer';
import { registerSchema } from '../validations/userValidation';
import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { register } from '../actions/userActions';

const RegisterScreen = () => {

  const dispatch = useDispatch()

  const registerUser = useSelector(state => state.userRegister)
  const { userInfo } = registerUser

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()
    const fData = {name, email, password}
    const isValid = await registerSchema.isValid(fData)
    setValid(isValid)
    dispatch(register(name, email, password))
    
  }

  return (
    <>
    {userInfo && userInfo.affectedRows === 1 ? <h1>Uspesno ste se registrovali</h1> :
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
        {userInfo ? <p style={{ color: 'red' }}>{userInfo}</p> : ''}
      </Form.Group>
      <Form.Group controlId='password'>
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' placeholder='Enter password' value={password}
        onChange={(e) => setPassword(e.target.value)}></Form.Control>
      </Form.Group>
      <Button type='submit' variant='primary' disabled={!true}>
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
    }
  </>
  )
}

export default RegisterScreen
