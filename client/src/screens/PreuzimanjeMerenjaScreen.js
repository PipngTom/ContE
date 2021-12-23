import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { savePreuzimanjeMerenja } from '../actions/meteringActions';

const PreuzimanjeMerenjaScreen = () => {

    const dispatch = useDispatch()

    const [merenje, setMerenje] = useState('')

    const changeHandler = (e) => {
        setMerenje(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePreuzimanjeMerenja(merenje))
    }

    return (
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="merenje">
                <h3>Ubaci merenje</h3>
                <Form.Control as="textarea" value={merenje} rows={20} onChange={changeHandler} />
            </Form.Group>
            <br/>
            <br/>
            <Button type='submit' variant='primary' size='lg'>Sačuvaj</Button>
        </Form>
    )
}

export default PreuzimanjeMerenjaScreen
