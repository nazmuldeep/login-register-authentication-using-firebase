import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';
const auth = getAuth(app);

const RegisterReactBootstrap = () => {
    const [passwordError, setPasswordError] = useState('')

    const [success, setSuccess] = useState(false)

    const handleRegister = event => {
        event.preventDefault();
        setSuccess(false)


        const form = event.target
        const email = form.email.value;
        const password = form.password.value;
        console.log((!(/(?=.*[A-Z].*[A-Z])/.test(password))));
        if (!(/(?=.*[A-Z].*[A-Z])/.test(password))) {
            setPasswordError('please provide at least two uppercase')
            return;
        }
        else if (password.length < 6) {
            setPasswordError('please should be at leaste 6 characters')
            return;
        }
        else if (!(/(?=.*[!#@$%&'*+-~])/.test(password))) {
            setPasswordError('please add at least one special character')
            return;
        }
        else {

            createUserWithEmailAndPassword(auth, email, password)
                .then(result => {
                    const user = result.user;
                    console.log(user);
                    setSuccess(true)
                    setPasswordError('');
                    form.reset()
                    verifyEmail();

                })
                .catch(error => {
                    console.error('error', error)
                    setPasswordError(error.message)
                })
        }
        const verifyEmail = () => {
            sendEmailVerification(auth.currentUser)
                .then(() => {
                    alert('please check your email and verify')
                })
        }

    }



    return (

        <div className='w-50 mx-auto'>
            <h2 className='text-primary'>Please Register !!!!</h2>
            <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" required />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" required />
                </Form.Group>
                <p className='text-danger'>{passwordError}</p>
                {success && <p className='text-success'>User Create Succesfully</p>}
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            <p> <small>Already have an account? please <Link to='/login'>Log in</Link> </small></p>

        </div>
    );
};

export default RegisterReactBootstrap;