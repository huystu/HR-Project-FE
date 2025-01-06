// src/pages/login.jsx
// import { useState } from 'react';
import { useFormik } from 'formik';
import { validationSchema } from '../validationSchema';
import '../styles/global.css';
import '../styles/login.css';

import Button from '../components/Button';
import Card from '../components/Card';
import Title from '../components/Title';
import Descript from '../components/Descript';
import InputField from '../components/InputField';

function Login() {

    const formik = useFormik({
        initialValues: {
            email: '',
            pw: '',
        },
        validationSchema, // 유효성 검사 추가
        onSubmit: async (values) => {
            console.log('Login Info: ', values);

            // connect BE
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (!response.ok) {
                throw new Error('fail login');
                }

                const data = await response.json();
                console.log('success login: ', data);
            } catch (error) {
                console.error('error login: ', error.message);
            }
        },
    });

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
                                <Button type="button" img={true}>
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