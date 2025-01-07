// src/pages/login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { validationSchema } from '../validationSchema';

import api from '../api';

import { GoogleLogin } from '@react-oauth/google';

import '../styles/global.css';
import '../styles/Login.css';

import Button from '../components/Button';
import Card from '../components/Card';
import Title from '../components/Title';
import Descript from '../components/Descript';
import InputField from '../components/InputField';

function Login() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const formik = useFormik({
        initialValues: {
            email: '',
            pw: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log('Login Info: ', values);

            // connect BE
            try {
                const response = await api.post('/signin', {
                    email: values.email,
                    password: values.pw,
                });

                console.log('Success Login:', response.data);
                
                if (response.data.status === 200) {
                    setMessage(response.data.message);
                    localStorage.setItem('token', response.data.data.accessToken);
                    navigate('/employee');
                }
                else {
                    setMessage('Login failed. Please try again.');
                }
            } catch (error) {
                console.error('Error Login:', error.message);
                setMessage(error.response?.data?.message || 'An error occurred during login.');
            }
        },
    });

    const handleGoogleLogin = async (response) => {
        try {
            const googleToken = response.credential;

            const res = await api.post('/oauth2/authorization/google', { token: googleToken });
            if (res.data.status === 200) {
                // localStorage.setItem('memberId', res.data.data.memberId);
                navigate('/employee');
            } else {
                setMessage('Google login failed');
            }
        } catch (error) {
            console.error('Error with Google login:', error);
            setMessage('An error occurred during Google login.');
        }
    };

    return (
        <>
            <main>
                <div>
                    <Card
                        header={
                            <Title desc={<Descript left="Don’t have an account? " link="Sign Up" />}>
                                Login
                            </Title>}
                    >
                        <div className="login">
                            <div>
                                <Button type="button" img={true} onClick={handleGoogleLogin}>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png" alt="goolge logo" />
                                    <span>Log in with Google</span>
                                </Button>
                            </div>
                        </div>
                        <div className="or">
                            <hr />
                            <span>or</span>
                            <hr />
                        </div>
                        <div className="login-itself">
                            <form onSubmit={formik.handleSubmit}>
                                <InputField 
                                    label="Email address" 
                                    type="email" 
                                    name="email" 
                                    formik={formik} 
                                />
                                <InputField
                                    label="Password" 
                                    type="password" 
                                    name="pw" 
                                    formik={formik} 
                                />
                                <div className="right">
                                    <Button type="submit" variant={`${formik.isValid && formik.dirty? 'enabled' : 'disabled'}`} disabled={!formik.isValid && formik.dirty}>
                                        Login
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Card>
                    <Descript link="Forgot password?" align="right" />
                </div>
            </main>
        </>
    );
}

export default Login;